import { ACTION_TYPES, ACTION_TRIGGER } from '../constants/actionsTypes.js';

export const STEP_NAME = Object.freeze({
  WAITING_PLAYERS_READY: 'WAITING_PLAYERS_READY',
  GAME_START: 'GAME_START',
  ROUND_START: 'ROUND_START',
  CRISIS_ROUND_START: 'CRISIS_ROUND_START',
  TURN_START: 'TURN_START',
  AWAIT_DECISION: 'AWAIT_DECISION',
  PROCESSING_DECISION: 'PROCESSING_DECISION',
  AWAIT_CARD_DRAW: 'AWAIT_CARD_DRAW',
  SHOWING_CARD: 'SHOWING_CARD',
  PROCESSING_CARD: 'PROCESSING_CARD',
  PROCESSING_SYSTEM_HEALTH: 'PROCESSING_SYSTEM_HEALTH',
  END_TURN: 'END_TURN',
  END_ROUND: 'END_ROUND',
  END_GAME: 'END_GAME',
});

export const steps = Object.freeze({
  [STEP_NAME.WAITING_PLAYERS_READY]: {
    name: STEP_NAME.WAITING_PLAYERS_READY,
    stepInstructionKey: null,
    flowControl: {
      current: {
        accepts: ACTION_TRIGGER.PLAYER_INPUT,
        allowedActions: [
          ACTION_TYPES.START_GAME,
          ACTION_TYPES.SET_READY,
          ACTION_TYPES.UNSET_READY,
          ACTION_TYPES.SET_CONFIG,
          ACTION_TYPES.LEAVE_ROOM,
        ],
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
  [STEP_NAME.GAME_START]: {
    name: STEP_NAME.GAME_START,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.START_ROUND],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 7000,
      },
      nextTransition: {
        actionType: ACTION_TYPES.START_ROUND,
        trigger: ACTION_TRIGGER.AUTO,
      },
    },
    effects: [
      'CONFIG_COMPONENTS',
      'CONFIG_PLAYER_POINTS',
      'COMPOSE_DECK',
      'TIME_OUT',
    ],
  },
  [STEP_NAME.ROUND_START]: {
    name: STEP_NAME.ROUND_START,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.START_TURN],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 3000,
      },
      nextTransition: {
        actionType: ACTION_TYPES.START_TURN,
        trigger: ACTION_TRIGGER.AUTO,
      },
    },
    effects: ['DEAL_POINTS', 'DEFINE_IS_CRISIS_ROUND', 'TIME_OUT'],
  },
  [STEP_NAME.CRISIS_ROUND_START]: {
    name: STEP_NAME.CRISIS_ROUND_START,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.START_TURN],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 7000,
      },
      nextTransition: {
        actionType: ACTION_TYPES.START_TURN,
        trigger: ACTION_TRIGGER.AUTO,
      },
    },
    effects: ['DEAL_POINTS', 'DEFINE_IS_CRISIS_ROUND', 'TIME_OUT'],
  },
  [STEP_NAME.TURN_START]: {
    name: STEP_NAME.TURN_START,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.ASK_FOR_DECISION],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 2000,
      },
      nextTransition: {
        actionType: ACTION_TYPES.ASK_FOR_DECISION,
        trigger: ACTION_TRIGGER.AUTO,
      },
    },
    effects: ['CONFIG_CURRENT_PLAYER', 'SHOW_PLAYER_TURN', 'TIME_OUT'],
  },
  [STEP_NAME.AWAIT_DECISION]: {
    name: STEP_NAME.AWAIT_DECISION,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [
          ACTION_TYPES.SUBMIT_DECISION,
          ACTION_TYPES.PROCEED_TO_CARD_DRAW,
        ],
        accepts: ACTION_TRIGGER.PLAYER_INPUT,
      },
      nextTransition: {
        actionType: ACTION_TYPES.SUBMIT_DECISION,
        trigger: ACTION_TRIGGER.PLAYER_INPUT,
      },
    },
    effects: [
      'CHECK_VALID_DECISIONS',
      'SHOW_VALID_DECISIONS',
      'WAIT_FOR_DECISION',
    ],
  },
  [STEP_NAME.PROCESSING_DECISION]: {
    name: STEP_NAME.PROCESSING_DECISION,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [
          ACTION_TYPES.ASK_FOR_DECISION,
          ACTION_TYPES.PROCEED_TO_CARD_DRAW,
        ],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 0,
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
    // IF allComponentsTested -> 'FINISH_GAME' with win ELSE decisionsAvailable.length > 0 -> 'ASK_FOR_DECISION' ELSE 'PROCEED_TO_CARD_DRAW'
  },
  [STEP_NAME.AWAIT_CARD_DRAW]: {
    name: STEP_NAME.AWAIT_CARD_DRAW,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.DRAW_CARD],
        accepts: ACTION_TRIGGER.PLAYER_INPUT,
      },
      nextTransition: {
        actionType: ACTION_TYPES.DRAW_CARD,
        trigger: ACTION_TRIGGER.PLAYER_INPUT,
      },
    },
    effects: ['WAIT_FOR_DRAW', 'SHOW_DRAWN_CARD'],
  },
  [STEP_NAME.SHOWING_CARD]: {
    name: STEP_NAME.SHOWING_CARD,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.APPLY_CARD_EFFECT],
        accepts: ACTION_TRIGGER.PLAYER_INPUT,
      },
      nextTransition: {
        actionType: ACTION_TYPES.APPLY_CARD_EFFECT,
        trigger: ACTION_TRIGGER.PLAYER_INPUT,
      },
    },
    effects: ['APPLY_CARD_EFFECT', 'PROCESSING_SYSTEM_HEALTH', 'TIME_OUT'],
  },

  [STEP_NAME.PROCESSING_CARD]: {
    name: STEP_NAME.PROCESSING_CARD,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.CHECK_SYSTEM_HEALTH],
        accepts: ACTION_TRIGGER.AUTO,
      },
      nextTransition: {
        actionType: ACTION_TYPES.CHECK_SYSTEM_HEALTH,
        trigger: ACTION_TRIGGER.AUTO,
      },
    },
    effects: ['APPLY_CARD_EFFECT', 'PROCESSING_SYSTEM_HEALTH', 'TIME_OUT'],
    // IF criticalState > 'FINISH_TURN' with startCriticalRoundFlag ELSE IF cardsToDrawRemaining > 0> 'PROCEED_TO_CARD_DRAW' ELSE 'FINISH_TURN'
  },

  [STEP_NAME.PROCESSING_SYSTEM_HEALTH]: {
    name: STEP_NAME.PROCESSING_SYSTEM_HEALTH,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [
          ACTION_TYPES.FINISH_TURN,
          ACTION_TYPES.PROCEED_TO_CARD_DRAW,
        ],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 7000,
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: [
      'CHECK_GAME_STATE',
      'APPLY_STATE_CHANGE_EFFECTS',
      'UPDATE_NEXT_VALID_STEP',
    ],
  },
  [STEP_NAME.END_TURN]: {
    name: STEP_NAME.END_TURN,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [ACTION_TYPES.START_TURN, ACTION_TYPES.FINISH_ROUND],
        accepts: ACTION_TRIGGER.AUTO,
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
  [STEP_NAME.END_ROUND]: {
    name: STEP_NAME.END_ROUND,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: [
          ACTION_TYPES.FINISH_GAME,
          ACTION_TYPES.START_ROUND,
          ACTION_TYPES.START_CRISIS_ROUND,
        ],
        accepts: ACTION_TRIGGER.AUTO,
        delayMs: 3000,
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
      'UPDATE_NEXT_VALID_STEP',
    ],
    // IF  isCriticalRound & isCriticalState -> 'FINISH_GAME' with lost ELSE startCriticalRoundFlag ->'START_ROUND' with isCriticalRound true ELSE -> 'START_ROUND'
  },
  [STEP_NAME.END_GAME]: {
    name: STEP_NAME.END_GAME,
    stepInstructionKey: null,
    flowControl: {
      current: {
        allowedActions: null,
        accepts: null,
      },
      nextTransition: {
        actionType: null,
        trigger: null,
      },
    },
    effects: ['SHOW_GAME_RESULT'],
  },
});
