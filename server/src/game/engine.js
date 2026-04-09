import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes.js';
import { PLAYER_STATUS } from '../../../shared/src/constants/playerStatus.js';
import { steps } from '../../../shared/src/definitions/steps.js';
import { composeDeck } from './deckComposer.js';
import { components } from '../../../shared/src/definitions/components.js';
import { applyGameStartBugs } from './gameHelpers.js';
import { transitionResolvers } from './transitionResolvers.js';
import { decisions as decisionsDefinitions } from '../../../shared/src/definitions/decisions.js';

import {
  getAvailableDecisions,
  applyDecisionEffect,
} from './decisions/logic.js';
import {
  getPlayerObject,
  isGameReadyToStart,
  getTotalPlayersPoints,
} from './selectors.js';

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
      next.flow.blockedUntil = now + 1500;
      next.flow.step = steps['GAME_START'];
      next.components = structuredClone(components);
      next.components = applyGameStartBugs(next.components);
      const deck = composeDeck(next.gameConfig.deck.composition);
      next.deck = deck;
      next.phase = 'IN_GAME';
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.players = next.players.map((player) => ({
        ...player,
        status: 'PLAYING',
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
      next.flow.step = steps['ROUND_START'];
      next.flow.blockedUntil = now + 1500;
      next.players.forEach((player) => {
        player.handPoints = next.gameConfig.taskPoints.playerPerRound;
      });
      next.flow.round += 1;
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
    // TODO:  feature lastEvent has to be dinamic: ROUND_START sets next.log.lastEvent.type to ACTION_TYPES.END_TURN,
    // which is misleading and will make client-side event handling/debugging
    // incorrect. This should log ACTION_TYPES.ROUND_START (and similarly TURN_START currently logs END_TURN).

    case ACTION_TYPES.START_TURN: {
      next.flow.step = steps['TURN_START'];
      next.flow.currentPlayerId = next.players[next.flow.turn].id;
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
      next.flow.step = steps['AWAIT_DECISION'];
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

    case ACTION_TYPES.APPLY_DECISION: {
      next.decisionState.validationError = null;
      let result = {};
      try {
        result = applyDecisionEffect(action, next, decisionsDefinitions);

        if (!result.ok) {
          next.decisionState.validationError = {
            type: result.type,
            failedValidation: result.failedValidation,
          };
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
      decisionNext.flow.step = steps['PROCESSING_DECISION'];

      let decisionsAvailableApply = [];
      decisionsAvailableApply = getAvailableDecisions(decisionNext, decisionsDefinitions);
      decisionNext.decisionState.available = decisionsAvailableApply;
      decisionNext.flow.step.flowControl.nextTransition =
        transitionResolvers['PROCESSING_DECISION'](decisionNext)
      decisionNext.decisionState.chosen = null;
      decisionNext.decisionState.target = null;
      decisionNext.decisionState.selectedAmount = 0;
      decisionNext.meta.rev += 1;
      decisionNext.meta.updatedAt = now;
      decisionNext.log.lastEvent = {
        type: ACTION_TYPES.APPLY_DECISION,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return decisionNext;
    }
    // In CHOOSE_DECISION, decisionsAvailable is initialized to [] and then
    // assigned to next.decisions.available even when next.decisions.available
    //  was already populated. This means any subsequent CHOOSE_DECISION action
    // will clear the available decisions array unintentionally. Only overwrite
    // next.decisions.available when you actually recompute it, or default
    // decisionsAvailable to the current list.

    case ACTION_TYPES.DRAW_CARD: {
      next.flow.blockedUntil = now + 1500;
      next.flow.turn += 1;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.DRAW_CARD,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.FINISH_TURN: {
      next.flow.blockedUntil = now + 1500;
      next.flow.turn += 1;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.FINISH_TURN,
        by: action.payload.senderId ?? null,
        at: now,
      };
      return next;
    }
    // TODO: Fix, remenber to zero the turn count
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
