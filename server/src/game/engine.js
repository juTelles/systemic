import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes.js';
import { PLAYER_STATUS } from '../../../shared/src/constants/playerStatus.js';
import { steps } from '../../../shared/src/definitions/steps.js';
import { composeDeck } from './deckComposer.js';
import { gameConfigs } from './gameConfigs.js';
import { components } from '../../../shared/src/definitions/components.js';
import { applyGameStartBugs } from './gameHelpers.js';

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
      const localPlayerId = action.senderId ?? ctx.senderId;

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

      const allPlayersReady = next.players.every(
        (player) => player.status === PLAYER_STATUS.READY
      );
      if (allPlayersReady) {
        next.flow.step.next = 'GAME_START';
      }
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.SET_READY,
        by: localPlayerId,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.GAME_START: {
      const gameConfig = structuredClone(gameConfigs.regularMode);

      if (!isGameReadyToStart(gameConfig, next, 'LOBBY', PLAYER_STATUS.READY)) {
        //TODO: Fix this log, applyRoomAction returns only the new state, so we passing
        // would means nothing without refactoring the applyRoomAction to return both
        // the new state and the log of what happened, throwing an error or something
        // triggers the cleanUp function in the client, which is not what we want in this case,
        // since it's not an error from the user, but from the game state, so we should just log it and return the next state without applying the GAME_START action
        console.warn('[GAME_START] skipped: conditions not met');
        return next;
      }
      next.flow.blockedUntil = now + 1500;
      next.flow.step = steps['GAME_START'];
      next.gameConfig = gameConfig;
      next.components = structuredClone(components);
      next.components = applyGameStartBugs(next.components);
      const deck = composeDeck(gameConfigs.regularMode.deck.composition);
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
        type: ACTION_TYPES.GAME_START,
        by: action.senderId ?? null,
        at: now,
        data: { phase: action.phase },
      };
      return next;
    }

    case ACTION_TYPES.ROUND_START: {
      next.flow.step = steps['ROUND_START'];
      next.flow.blockedUntil = now + 1500;
      next.players.every(
        (player) =>
          (player.handPoints = next.gameConfig.taskPoints.playerPerRound)
      );
      next.flow.round += 1;
      next.flow.turn = 0;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.END_TURN,
        by: action.senderId ?? null,
        at: now,
      };
      return next;
    }

    case ACTION_TYPES.TURN_START: {
      next.flow.step = steps['TURN_START'];
      next.flow.turn += 1;
      next.flow.currentPlayerId = next.players[next.flow.turn].id;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = {
        type: ACTION_TYPES.END_TURN,
        by: action.senderId ?? null,
        at: now,
      };
      return next;
    }
      next.flow.turn += 1;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = { type: "END_TURN", by: ctx.playerId ?? null, at: now };
      return next;
    }

    case "SET_PHASE": {
      next.phase = action.phase;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = { type: "SET_PHASE", by: ctx.playerId ?? null, at: now, data: { phase: action.phase } };
      return next;
    }

    default:
      throw new Error("Unknown action type");
  }
}