import { ACTION_TYPES, ACTION_TRIGGER } from '../../../shared/src/constants/actionsTypes.js';
import { isGameReadyToStart } from './selectors.js';
import {
  PLAYER_STATUS,
  GAME_PHASE,
  GAME_RESULT,
} from '../../../shared/src/constants/gameEnums.js';

export const transitionResolvers = {
  WAITING_PLAYERS_READY: (state) => {
    const isGameReady = isGameReadyToStart(
      state,
      GAME_PHASE.LOBBY,
      PLAYER_STATUS.READY,
    );
    return isGameReady
      ? { actionType: ACTION_TYPES.START_GAME, trigger: ACTION_TRIGGER.AUTO }
      : null;
  },

  PROCESSING_DECISION: (state) => {
    return state.gameResult === GAME_RESULT.GAME_WIN
      ? { actionType: ACTION_TYPES.FINISH_GAME, trigger: ACTION_TRIGGER.AUTO }
      : state.decisionState.available.length > 0
        ? {
            actionType: ACTION_TYPES.ASK_FOR_DECISION,
            trigger: ACTION_TRIGGER.AUTO,
          }
        : {
            actionType: ACTION_TYPES.PROCEED_TO_CARD_DRAW,
            trigger: ACTION_TRIGGER.AUTO,
          };
  },

  PROCESSING_SYSTEM_HEALTH: (state) => {
    return (state.system.pendingCrisisRound && !state.system.isCrisisRound) ||
      state.cardState.cardsRemainingInTurn === 0
      ? { actionType: ACTION_TYPES.FINISH_TURN, trigger: ACTION_TRIGGER.AUTO }
      : {
          actionType: ACTION_TYPES.PROCEED_TO_CARD_DRAW,
          trigger: ACTION_TRIGGER.AUTO,
        };
  },

  END_TURN: (state) => {
    return (state.system.pendingCrisisRound && !state.system.isCrisisRound) ||
      state.flow.turn >= state.players.length
      ? { actionType: ACTION_TYPES.FINISH_ROUND, trigger: ACTION_TRIGGER.AUTO }
      : { actionType: ACTION_TYPES.START_TURN, trigger: ACTION_TRIGGER.AUTO };
  },

  END_ROUND: (state) => {
    return state.gameResult === GAME_RESULT.GAME_OVER
      ? { actionType: ACTION_TYPES.FINISH_GAME, trigger: ACTION_TRIGGER.AUTO }
      : state.system.pendingCrisisRound
        ? {
            actionType: ACTION_TYPES.START_CRISIS_ROUND,
            trigger: ACTION_TRIGGER.AUTO,
          }
        : {
            actionType: ACTION_TYPES.START_ROUND,
            trigger: ACTION_TRIGGER.AUTO,
          };
  },
};
