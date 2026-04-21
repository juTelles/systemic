import { PLAYER_STATUS } from '../../../shared/src/constants/playerStatus.js';
import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes.js';
import { isGameReadyToStart } from './selectors.js';

export const transitionResolvers = {
  WAITING_PLAYERS_READY: (state) => {
    const isGameReady = isGameReadyToStart(state, 'LOBBY', PLAYER_STATUS.READY);
    return isGameReady
      ? { actionType: ACTION_TYPES.START_GAME, trigger: 'AUTO' }
      : null;
  },
  PROCESSING_DECISION: (state) => {
    return state.decisionState.available.length > 0
      ? { actionType: ACTION_TYPES.ASK_FOR_DECISION, trigger: 'AUTO' }
      : { actionType: ACTION_TYPES.PROCEED_TO_CARD_DRAW, trigger: 'AUTO' };
  },
  PROCESSING_SYSTEM_HEALTH: (state) => {
    return state.system.pendingCrisisRound ||
      state.cardState.cardsRemainingInTurn === 0
      ? { actionType: ACTION_TYPES.FINISH_TURN, trigger: 'AUTO' }
      : { actionType: ACTION_TYPES.PROCEED_TO_CARD_DRAW, trigger: 'AUTO' };
  },
  END_TURN: (state) => {
    // IF END_GAME -> 'END_GAME' ELSE IF END_ROUND -> 'END_ROUND' ELSE 'TURN_START'
    return state.flow.turn >= state.players.length
      ? { actionType: ACTION_TYPES.FINISH_ROUND, trigger: 'AUTO' }
      : { actionType: ACTION_TYPES.START_TURN, trigger: 'AUTO' };
  },
  END_ROUND: (state) => {
    // IF END_GAME -> 'END_GAME' ELSE 'ROUND_START'
        return { actionType: ACTION_TYPES.START_ROUND, trigger: 'AUTO' };
  },
};
