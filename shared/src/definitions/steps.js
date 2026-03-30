import { ACTION_TYPES } from '../constants/actionsTypes.js';

export const steps = Object.freeze({
  WAITING_PLAYERS_READY: {
    name: 'WAITING_PLAYERS_READY',
    flowControl: {
      current: {
        accepts: 'PLAYER_INPUT',
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: [
      'CONFIG_COMPONENTS',
      'CONFIG_PLAYER_POINTS',
      'COMPOSE_DECK',
      'TIME_OUT',
      'UPDATE_NEXT_VALID_STEP',
    ],
    // IF all players ready -> 'GAME_START' ELSE null
  },
  GAME_START: {
    name: 'GAME_START',
    flowControl: {
      current: {
        accepts: 'AUTO',
        delayMs: 1500,
      },
      nextTransition: {
        actionType: ACTION_TYPES.START_ROUND,
        trigger: 'AUTO',
      },
    },
    effects: [
      'CONFIG_COMPONENTS',
      'CONFIG_PLAYER_POINTS',
      'COMPOSE_DECK',
      'TIME_OUT',
    ],
  },
  ROUND_START: {
    name: 'ROUND_START',
    flowControl: {
      current: {
        accepts: 'AUTO',
        delayMs: 1500,
      },
      nextTransition: {
        actionType: ACTION_TYPES.START_TURN,
        trigger: 'AUTO',
      },
    },
    effects: ['DEAL_POINTS', 'DEFINE_IS_CRISIS_ROUND', 'TIME_OUT'],
  },
  TURN_START: {
    name: 'TURN_START',
    flowControl: {
      current: {
        accepts: 'AUTO',
        delayMs: 1500,
      },
      nextTransition: {
        actionType: ACTION_TYPES.ASK_FOR_DECISION,
        trigger: 'AUTO',
      },
    },
    effects: ['CONFIG_CURRENT_PLAYER', 'SHOW_PLAYER_TURN','TIME_OUT'],
  },
  AWAIT_DECISION: {
    name: 'AWAIT_DECISION',
    flowControl: {
      current: {
        accepts: 'PLAYER_INPUT',
      },
      nextTransition: {
        actionType: ACTION_TYPES.APPLY_DECISION,
        trigger: 'PLAYER_INPUT',
      },
    },
    effects: [
      'CHECK_VALID_DECISIONS',
      'SHOW_VALID_DECISIONS',
      'WAIT_FOR_DECISION',
    ],
  },
  PROCESSING_DECISION: {
    name: 'PROCESSING_DECISION',
    flowControl: {
      current: {
        accepts: 'AUTO',
        delayMs: 1500,
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: [
      'APPLY_DECISION',
      'UPDATE_POINTS',
      'CHECK_VALID_DECISIONS',
      'UPDATE_NEXT_VALID_STEP',
    ],
    // IF allComponentsTested -> 'FINISH_GAME' with win ELSE actionsRemaining > 0 -> 'ASK_FOR_DECISION' ELSE 'DRAW_CARD'
  },
  AWAIT_CARD_DRAW: {
    name: 'AWAIT_CARD_DRAW',
    flowControl: {
      current: {
        accepts: 'PLAYER_INPUT',
      },
      nextTransition: {
        actionType: ACTION_TYPES.APPLY_CARD,
        trigger: 'PLAYER_INPUT',
      },
    },
    effects: ['WAIT_FOR_DRAW', 'SHOW_DRAWN_CARD'],
  },
  PROCESSING_CARD: {
    name: 'PROCESSING_CARD',
    flowControl: {
      current: {
        accepts: 'AUTO',
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: ['APPLY_CARD_EFFECT', 'PROCESSING_STATE_CHANGE', 'TIME_OUT'],
    // IF criticalState > 'FINISH_TURN' with startCriticalRoundFlag ELSE IF cardsToDrawRemaining > 0> 'DRAW_CARD' ELSE 'FINISH_TURN'
  },
  END_TURN: {
    name: 'END_TURN',
    flowControl: {
      current: {
        accepts: 'AUTO',
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: [
      'CHECK_GAME_STATE',
      'APPLY_END_TURN_EFFECTS',
      'CHECK_END_ROUND',
      'CHECK_END_GAME',
      'CHECK_CRISIS_ROUND',
      'TIME_OUT',
      'UPDATE_NEXT_VALID_STEP',
    ],
    // IF  criticalState -> 'FINISH_ROUND' with startCriticalRoundFlag ELSE islastRoundTurn -> 'FINISH_ROUND' ELSE 'START_TURN'
  },
  END_ROUND: {
    name: 'END_ROUND',
    flowControl: {
      current: {
        accepts: 'AUTO',
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: [
      'CHECK_GAME_STATE',
      'APPLY_END_ROUND_EFFECTS',
      'CHECK_END_GAME',
      'TIME_OUT',
      'UPDATE_NEXT_VALID_STEP'
    ],
    // IF  isCriticalRound & isCriticalState -> 'FINISH_GAME' with lost ELSE startCriticalRoundFlag ->'START_ROUND' with isCriticalRound true ELSE -> 'START_ROUND'
  },
  END_GAME: {
    name: 'END_GAME',
    flowControl: {
      current: {
        accepts: 'AUTO',
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: ['SHOW_GAME_RESULT'],
  },
});
