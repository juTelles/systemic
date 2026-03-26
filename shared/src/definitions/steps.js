import { instructions } from './instructions.js';

export const steps = Object.freeze({
  SET_READY: {
    name: 'SET_READY',
    description: instructions().SET_READY?.description?.pt,
    progression: {
      trigger: 'PLAYER_INPUT',
      type: 'PLAYER_INPUT',
    },
    effects: [
      'CONFIG_COMPONENTS',
      'CONFIG_PLAYER_POINTS',
      'COMPOSE_DECK',
      'TIME_OUT',
      'UPDATE_NEXT_VALID_STEP',
    ],
    next: null,
    // IF all players ready -> 'GAME_START' ELSE null
    dataDefaults: {},
  },
  GAME_START: {
    name: 'GAME_START',
    description: instructions().GAME_START?.description?.pt,
    progression: {
      trigger: 'AUTO', //WHEN all players ready
      type: 'TIMEOUT',
      delayMs: 1500,
    },
    effects: [
      'CONFIG_COMPONENTS',
      'CONFIG_PLAYER_POINTS',
      'COMPOSE_DECK',
      'TIME_OUT',
    ],
    next: 'ROUND_START',
    dataDefaults: {},
  },

  ROUND_START: {
    name: 'ROUND_START',
    description: instructions().ROUND_START?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'TIMEOUT',
      delayMs: 1500,
    },
    effects: ['DEAL_POINTS', 'DEFINE_IS_CRISIS_ROUND', 'TIME_OUT'],
    next: 'TURN_START',
    dataDefaults: {},
  },

  TURN_START: {
    name: 'TURN_START',
    description: instructions().TURN_START?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'AUTO',
      triggerNext: 'AUTO',
    },
    effects: ['CONFIG_CURRENT_PLAYER', 'TIME_OUT'],
    next: 'PLAYER_TURN',
    dataDefaults: {},
  },

  PLAYER_TURN: {
    name: 'PLAYER_TURN',
    description: instructions().PLAYER_TURN?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'TIMEOUT',
      delayMs: 1200,
      triggerNext: 'AUTO',
    },
    effects: ['SHOW_PLAYER_TURN', 'TIME_OUT'],
    next: 'CHOOSE_DECISION',
    dataDefaults: {},
  },

  CHOOSE_DECISION: {
    name: 'CHOOSE_DECISION',
    description: instructions().CHOOSE_DECISION?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'AUTO',
      triggerNext: 'PLAYER_INPUT',
    },
    effects: [
      'CHECK_VALID_DECISIONS',
      'SHOW_VALID_DECISIONS',
      'WAIT_FOR_DECISION',
    ],
    next: 'APPLY_DECISION',
    dataDefaults: {
      actionsRemaining: 0,
    },
  },

  APPLY_DECISION: {
    name: 'APPLY_DECISION',
    description: instructions().APPLY_DECISION?.description?.pt,
    progression: {
      trigger: 'PLAYER_INPUT',
      type: 'PLAYER_INPUT',
      triggerNext: 'AUTO',
    },
    effects: [
      'APPLY_DECISION',
      'CALCULATE_POINTS',
      'CHECK_VALID_DECISIONS',
      'UPDATE_NEXT_VALID_STEP',
    ],
    next: null,
    // IF actionsRemaining > 0 -> 'CHOOSE_DECISION' ELSE 'DRAW_CARD'
    dataDefaults: {
      actionsRemaining: 0,
    },
  },

  DRAW_CARD: {
    name: 'DRAW_CARD',
    description: instructions().DRAW_CARD?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'AUTO',
      triggerNext: 'PLAYER_INPUT',
    },
    effects: ['WAIT_FOR_DRAW'],
    next: 'RESOLVE_CARD',
    dataDefaults: {},
  },

  SHOW_CARD: {
    name: 'DRAW_CARD',
    description: instructions().DRAW_CARD?.description?.pt,
    progression: {
      trigger: 'PLAYER_INPUT',
      type: 'TIMEOUT',
      triggerNext: 'AUTO',
    },
    effects: ['SHOW_CARD', 'TIME_OUT'],
    next: 'RESOLVE_CARD',
    dataDefaults: {},
  },

  RESOLVE_CARD: {
    name: 'RESOLVE_CARD',
    description: instructions().RESOLVE_CARD?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'TIMEOUT',
      delayMs: 2500,
      triggerNext: 'AUTO',
    },
    effects: ['APPLY_CARD_EFFECT', 'TIME_OUT', 'UPDATE_NEXT_VALID_STEP'],
    next: null,
    // IF actionsRemaining > 0 -> 'DRAW_CARD' ELSE 'END_TURN'
    dataDefaults: {
      actionsRemaining: 0,
    },
  },

  END_TURN: {
    name: 'END_TURN',
    description: instructions().END_TURN?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'TIMEOUT',
      delayMs: 2500,
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
    next: null,
    // IF END_GAME -> 'END_GAME' ELSE IF END_ROUND -> 'END_ROUND' ELSE 'TURN_START'
    dataDefaults: {},
  },

  END_ROUND: {
    name: 'END_ROUND',
    description: instructions().END_ROUND?.description?.pt,
    progression: {
      trigger: 'AUTO',
      type: 'TIMEOUT',
      delayMs: 2500,
      triggerNext: 'AUTO',
    },
    effects: [
      'CHECK_GAME_STATE',
      'APPLY_END_ROUND_EFFECTS',
      'CHECK_END_GAME',
      'TIME_OUT',
      'UPDATE_NEXT_VALID_STEP'
    ],
    next: null,
    // IF END_GAME -> 'END_GAME' ELSE 'ROUND_START'
    dataDefaults: {},
  },

  END_GAME: {
    name: 'END_GAME',
    description: instructions().END_GAME?.description?.pt,
    progression: {
      triggerNext: 'AUTO',
      type: 'TIMEOUT',
      delayMs: 2500,
    },
    effects: ['SHOW_GAME_RESULT'],
    next: null,
    dataDefaults: {},
  },
});
