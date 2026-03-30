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
    return state.decisions.available.length > 0
      ? { actionType: ACTION_TYPES.ASK_FOR_DECISION, trigger: 'AUTO' }
      : { actionType: ACTION_TYPES.DRAW_CARD, trigger: 'AUTO' };
  },
  PROCESSING_CARD: (state) => {
    // IF actionsRemaining > 0 -> 'CHOOSE_DECISION' ELSE 'DRAW_CARD'
    return state.actionsRemaining > 0 ? 'CHOOSE_DECISION' : 'DRAW_CARD';
  },
  END_TURN: (state) => {
    // IF END_GAME -> 'END_GAME' ELSE IF END_ROUND -> 'END_ROUND' ELSE 'TURN_START'
    if (state.endGame) return 'END_GAME';
    if (state.endRound) return 'END_ROUND';
    return 'TURN_START';
  },
  END_ROUND: (state) => {
    // IF END_GAME -> 'END_GAME' ELSE 'ROUND_START'
    return state.endGame ? 'END_GAME' : 'ROUND_START';
  },
};
