import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes.js';
import { PLAYER_STATUS } from '../../../shared/src/constants/playerStatus.js';
import { SYSTEM_HEALTH_STATES } from '../../../shared/src/constants/systemHealthStates.js';
import { decisions as decisionsDefinitions } from '../../../shared/src/definitions/decisions.js';
import { steps, STEP_NAME } from '../../../shared/src/definitions/steps.js';
import { components } from '../../../shared/src/definitions/components.js';
import { getAvailableDecisions } from './decisions/decisionAvailability.js';
import { applyDecision } from './decisions/decisionProcessing.js';
import { composeDeck } from './cards/deckComposer.js';
import { buildCard } from './cards/cardBuilder.js';
import { applyCardEffect } from './cards/cardApplier.js';
import { processSystemHealth } from './systemHealthState/SystemHealthProcessor.js';
import { processEndRoundRequestPropagation } from './propagationProcessor.js';
import { transitionResolvers } from './transitionResolvers.js';
import { isGameReadyToStart } from './selectors.js';
import {
  verifyGameOverCondition,
  verifyGameWinCondition,
} from './gameResultVerifiers.js';
import {
  applyGameStartBugs,
  addStartRoundPointsToPlayers,
  cleanPlayerHandPoints,
} from './gameHelpers.js';
import {
  createDecisionState,
  createValidationErrorState,
  createStepState,
} from './roomStateFactories.js';

export function applyAction(state, action, ctx = {}) {
  const now = Date.now();
  const next = structuredClone(state); // Node 18+ (Render geralmente usa)

  switch (action?.type) {
    case ACTION_TYPES.SET_READY: {
      const localPlayerId = action.payload?.senderId;

      if (!localPlayerId) {
        const err = new Error('Player ID is required for SET_READY action');
        err.status = 400;
        err.code = 'PLAYER_ID_REQUIRED';
        throw err;
      }

      const player = next.players.find((player) => player.id === localPlayerId);

      if (!player) {
        const err = new Error(`Player with ID ${localPlayerId} not found`);
        err.status = 404;
        err.code = 'PLAYER_NOT_FOUND';
        throw err;
      }
      player.status = PLAYER_STATUS.READY;

      next.flow.step.flowControl.nextTransition =
        transitionResolvers['WAITING_PLAYERS_READY'](next);
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.SET_READY,
        by: localPlayerId,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.START_GAME: {
      // const gameConfig = structuredClone(next.gameConfig);
      // TODO: add feat to change config possibilities

      if (!isGameReadyToStart(next, 'LOBBY', PLAYER_STATUS.READY)) {
        //TODO: Fix this log, applyRoomAction returns only the new state, so we passing
        // would means nothing without refactoring the applyRoomAction to return both
        // the new state and the log of what happened, throwing an error or something
        // triggers the cleanUp function in the client, which is not what we want in this case,
        // since it's not an error from the user, but from the game state, so we should just log
        //  it and return the next state without applying the GAME_START action
        console.warn('[GAME_START] skipped: conditions not met');
        return next;
      }
      next.flow.step = createStepState(STEP_NAME.GAME_START);
      next.flow.blockedUntil = now + next.flow.step.flowControl.current.delayMs;
      next.components = structuredClone(components);
      next.components = applyGameStartBugs(next.components);
      const deck = composeDeck(next.gameConfig.deckComposition);
      next.deck.drawPile = deck;
      next.phase = 'IN_GAME';
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.players = next.players.map((player) => ({
        ...player,
        status: PLAYER_STATUS.PLAYING,
        handPoints: 0,
        bankPoints: 0,
      }));
      next.log.lastEvent = {
        type: ACTION_TYPES.START_GAME,
        by: action.payload.senderId ?? null,
        at: now,
        data: { phase: next.phase },
      };
      return next;
    }

    case ACTION_TYPES.START_ROUND: {
      next.flow.step = createStepState(STEP_NAME.ROUND_START);
      next.flow.blockedUntil = now + next.flow.step.flowControl.current.delayMs;

      if (next.system.isCrisisRound) {
        next.system.isCrisisRound = false;
      }

      const handPointsToAdd = next.gameConfig.taskPoints.playerPerRound;
      next.players = addStartRoundPointsToPlayers(
        next.players,
        handPointsToAdd,
        next.gameConfig.taskPoints.maxPlayerPoints,
      );
      next.flow.crisisRoundCounter += 1;
      next.flow.turn = 0;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.START_ROUND,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.START_CRISIS_ROUND: {
      next.flow.step = createStepState(STEP_NAME.CRISIS_ROUND_START);
      next.flow.blockedUntil = now + next.flow.step.flowControl.current.delayMs;

      next.system.isCrisisRound = true;
      next.system.pendingCrisisRound = false;
      const handPointsToAddCrisis =
        next.gameConfig.taskPoints.playerPerRound +
        next.gameConfig.taskPoints.playerPerCrisisRound;

      next.players = addStartRoundPointsToPlayers(
        next.players,
        handPointsToAddCrisis,
        next.gameConfig.taskPoints.maxPlayerPoints,
      );

      next.flow.turn = 0;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.START_CRISIS_ROUND,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.START_TURN: {
      next.flow.step = createStepState(STEP_NAME.TURN_START);
      next.flow.blockedUntil = now + next.flow.step.flowControl.current.delayMs;
      next.flow.currentPlayerId = next.players[next.flow.turn].id;
      next.cardState.cardsRemainingInTurn = next.gameConfig.cardsPerTurn;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.START_TURN,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.ASK_FOR_DECISION: {
      next.flow.step = createStepState(STEP_NAME.AWAIT_DECISION);
      let decisionsAvailable = [];
      if (next.decisionState.available.length === 0) {
        decisionsAvailable = getAvailableDecisions(next, decisionsDefinitions);
        next.decisionState.available = decisionsAvailable;
      }
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.ASK_FOR_DECISION,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.SUBMIT_DECISION: {
      next.decisionState.validationError = null;
      let result = {};
      try {
        result = applyDecision(action, next, decisionsDefinitions);

        if (!result.ok) {
          const error = createValidationErrorState();
          error.type = result.type;
          error.failedValidation = result.failedValidation;

          next.decisionState.validationError = error;
          next.meta.rev += 1;
          next.meta.updatedAt = now;
          next.log.lastEvent = {
            type: 'DECISION_VALIDATION_FAILED',
            by: action.payload.senderId ?? null,
            at: now,
          };
          return next;
        }
      } catch (error) {
        console.error('[ENGINE]', error);
        throw error;
      }
      const decisionNext = result.next;
      decisionNext.flow.step = createStepState(STEP_NAME.PROCESSING_DECISION);

      if (
        action.payload.chosen === 'RESOLVE_REQUESTS_BUG_TESTED' ||
        action.payload.chosen === 'RESOLVE_REQUESTS_BUG'
      ) {
        const systemChange = processSystemHealth(decisionNext);
        if (systemChange.updated) {
          decisionNext.system = systemChange.system;
          decisionNext.flow.step.stepInstructionKey =
            systemChange.stepInstructionKey;
          decisionNext.flow.blockedUntil =
            now + next.flow.step.flowControl.current.delayMs;
        }
      }
      if (action.payload.chosen === 'DEVELOP_TESTS') {
        const isGameWin = verifyGameWinCondition(decisionNext.components);
        if (isGameWin) {
          decisionNext.gameResult = 'GAME_WIN';
          decisionNext.phase = 'END_GAME';
        }
      }
      let decisionsAvailableApply = [];
      decisionsAvailableApply = getAvailableDecisions(
        decisionNext,
        decisionsDefinitions,
      );
      decisionNext.decisionState.available = decisionsAvailableApply;
      decisionNext.flow.step.flowControl.nextTransition =
        transitionResolvers['PROCESSING_DECISION'](decisionNext);
      decisionNext.meta.rev += 1;
      decisionNext.meta.updatedAt = now;
      decisionNext.log.lastEvent = {
        type: ACTION_TYPES.SUBMIT_DECISION,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return decisionNext;
    }

    case ACTION_TYPES.PROCEED_TO_CARD_DRAW: {
      next.flow.step = createStepState(STEP_NAME.AWAIT_CARD_DRAW);
      next.decisionState = createDecisionState();

      next.players = cleanPlayerHandPoints(
        next.flow.currentPlayerId,
        next.players,
      );

      if (next.cardState.current !== null) {
        next.deck.discardPile.push(next.cardState.current);
        next.cardState.current = null;
      }

      const drawCardKey = next.deck.drawPile.shift();
      const drawnCardId = next.cardState.lastDrawId + 1;
      next.cardState.lastDrawId = drawnCardId;
      const drawCard = buildCard(drawCardKey, drawnCardId);
      next.cardState.current = drawCard;
      next.cardState.cardsRemainingInTurn -= 1;

      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.PROCEED_TO_CARD_DRAW,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.DRAW_CARD: {
      next.flow.step = createStepState(STEP_NAME.SHOWING_CARD);
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.DRAW_CARD,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.APPLY_CARD_EFFECT: {
      next.flow.step = createStepState(STEP_NAME.PROCESSING_CARD);
      let nextCard = next;
      try {
        nextCard = applyCardEffect(next, next.cardState.current);
      } catch (error) {
        console.error('[ENGINE]', error);
        throw error;
      }

      nextCard.meta.rev += 1;
      nextCard.meta.updatedAt = now;
      nextCard.log.lastEvent = {
        type: ACTION_TYPES.APPLY_CARD_EFFECT,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return nextCard;
    }
    case ACTION_TYPES.CHECK_SYSTEM_HEALTH: {
      next.flow.step = createStepState(STEP_NAME.PROCESSING_SYSTEM_HEALTH);

      const systemChange = processSystemHealth(next);
      if (systemChange.updated) {
        next.system = systemChange.system;
        next.flow.step.stepInstructionKey = systemChange.stepInstructionKey;
        next.flow.blockedUntil =
          now + next.flow.step.flowControl.current.delayMs;
      }

      next.flow.step.flowControl.nextTransition =
        transitionResolvers['PROCESSING_SYSTEM_HEALTH'](next);

      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.CHECK_SYSTEM_HEALTH,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.FINISH_TURN: {
      next.flow.step = createStepState(STEP_NAME.END_TURN);
      if (next.cardState.current !== null) {
        next.deck.discardPile.push(next.cardState.current);
        next.cardState.current = null;
      }
      next.flow.turn += 1;
      next.flow.step.flowControl.nextTransition =
        transitionResolvers['END_TURN'](next);
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.FINISH_TURN,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.FINISH_ROUND: {
      next.flow.step = createStepState(STEP_NAME.END_ROUND);
      next.flow.blockedUntil = now + next.flow.step.flowControl.current.delayMs;

      if (
        next.system.healthState === SYSTEM_HEALTH_STATES.WARNING ||
        next.system.healthState === SYSTEM_HEALTH_STATES.CRITICAL
      ) {
        next.components = processEndRoundRequestPropagation(next.components);
        const systemChange = processSystemHealth(next);
        if (systemChange.updated) {
          next.system = systemChange.system;
          next.flow.step.stepInstructionKey = systemChange.stepInstructionKey;
          next.flow.blockedUntil =
            now + next.flow.step.flowControl.current.delayMs + 5000;
        }
      }
      const isGameOver = verifyGameOverCondition(next.system);
      if (isGameOver) {
        next.gameResult = 'GAME_OVER';
        next.phase = 'END_GAME';
      }
      next.flow.step.flowControl.nextTransition =
        transitionResolvers['END_ROUND'](next);

      if (next.system.isCrisisRound) {
        next.flow.crisisRoundCounter += 1;
      }
      next.flow.turn = 0;
      next.flow.round += 1;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.FINISH_ROUND,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.FINISH_GAME: {
      next.flow.step = createStepState(STEP_NAME.END_GAME);
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.FINISH_GAME,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.CLEAN_ROOM_STATE: {
      next.flow.step = structuredClone(steps['CLEANING_ROOM_STATE']);
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.CLEAN_ROOM_STATE,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    default:
      const err = new Error('Unknown action type');
      err.code = 'UNKNOWN_ACTION_TYPE';
      err.status = 400;
      throw err;
  }
}
// TODO: Think if necessary to have saparated action for setting phase
// TODO: Send flag for showing start game dialog from last flag and turning it of after unbloking GAME_START action, to avoid checking the conditions for starting the game in every state update (currently it's only checked when a player sets ready, but it could be checked in other moments in the future, like when a player leaves the room, etc...)
// function shouldStartGame(state) {
//   return state.players.length >= MIN_PLAYERS &&
//     state.players.every((player) => player.status === 'READY')
//     ? true
//     : false;
// }
