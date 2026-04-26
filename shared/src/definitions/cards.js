export const CARD_TYPES = Object.freeze({
  LOCAL: 'LOCAL',
  STRUCTURAL: 'STRUCTURAL',
  REQUESTS: 'REQUESTS',
  POINTS: 'POINTS',
  EVENT: 'EVENT',
});

export const EVENT_CARDS_ID = Object.freeze({
  EVENT_HACKER_ATTACK: 'EVENT_HACKER_ATTACK',
  EVENT_REQUEST_OVERLOAD: 'EVENT_REQUEST_OVERLOAD',
  EVENT_VULNERABLE_AUTH_LIBRARY: 'EVENT_VULNERABLE_AUTH_LIBRARY',
  EVENT_COMMUNICATION_BREAKDOWN: 'EVENT_COMMUNICATION_BREAKDOWN',
  EVENT_RACE_CONDITIONS: 'EVENT_RACE_CONDITIONS',
  EVENT_API_CONGESTION: 'EVENT_API_CONGESTION',
  EVENT_ARCHITECTURE_STRAIN: 'EVENT_ARCHITECTURE_STRAIN',
  EVENT_BACKEND_CORE_REGRESSION: 'EVENT_BACKEND_CORE_REGRESSION',
  EVENT_FORGOT_WHERE_CLAUSE: 'EVENT_FORGOT_WHERE_CLAUSE',
  EVENT_FRONTEND_INSTABILITY: 'EVENT_FRONTEND_INSTABILITY',
});

export const cards = Object.freeze({
  regular: {
    LOCAL: {
      drawId: null,
      type: CARD_TYPES.LOCAL,
    effect: {
      id: 'APPLY_BUG',
      componentsAffected: null,
      amount: null,
    },
    },
    STRUCTURAL: {
      drawId: null,
      type: CARD_TYPES.STRUCTURAL,
      effect: {
        id: 'APPLY_BUG',
        componentsAffected: null,
        amount: null,
      },
    },
    REQUESTS: {
      drawId: null,
      type: CARD_TYPES.REQUESTS,
      effect: {
        id: 'APPLY_BUG',
        componentsAffected: null,
        amount: null,
      },
    },
    POINTS: {
      drawId: null,
      type: CARD_TYPES.POINTS,
      effect: {
        id: 'ADD_POINTS',
        componentsAffected: null,
        amount: null,
      },
    },
  },
  special: {
    eventCards: {
      EVENT_HACKER_ATTACK: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_HACKER_ATTACK,
        pressureLevel: 'CRITICAL',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 3,
        },
      },
      EVENT_REQUEST_OVERLOAD: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_REQUEST_OVERLOAD,
        pressureLevel: 'CRITICAL',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 3,
        },
      },
      EVENT_VULNERABLE_AUTH_LIBRARY: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_VULNERABLE_AUTH_LIBRARY,
        pressureLevel: 'CRITICAL',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 3,
        },
      },
      EVENT_COMMUNICATION_BREAKDOWN: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_COMMUNICATION_BREAKDOWN,
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 1,
        },
      },
      EVENT_RACE_CONDITIONS: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_RACE_CONDITIONS,
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests'],
          amount: 2,
        },
      },
      EVENT_API_CONGESTION: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_API_CONGESTION,
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['dataRequests'],
          amount: 2,
        },
      },
      EVENT_ARCHITECTURE_STRAIN: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_ARCHITECTURE_STRAIN,
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['database', 'backend', 'frontend'],
          amount: 2,
        },
      },
      EVENT_BACKEND_CORE_REGRESSION: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_BACKEND_CORE_REGRESSION,
        pressureLevel: 'LOW',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['backend', 'logic', 'integrations'],
          amount: 2,
        },
      },
      EVENT_FORGOT_WHERE_CLAUSE: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_FORGOT_WHERE_CLAUSE,
        pressureLevel: 'LOW',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['database', 'data', 'structure'],
          amount: 2,
        },
      },
      EVENT_FRONTEND_INSTABILITY: {
        drawId: null,
        type: CARD_TYPES.EVENT,
        eventId: EVENT_CARDS_ID.EVENT_FRONTEND_INSTABILITY,
        pressureLevel: 'LOW',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['frontend', 'interaction', 'interface'],
          amount: 2,
        },
      },
      byPressureLevel: {
        CRITICAL: [
          EVENT_CARDS_ID.EVENT_HACKER_ATTACK,
          EVENT_CARDS_ID.EVENT_REQUEST_OVERLOAD,
          EVENT_CARDS_ID.EVENT_VULNERABLE_AUTH_LIBRARY,
        ],
        WARNING: [
          EVENT_CARDS_ID.EVENT_COMMUNICATION_BREAKDOWN,
          EVENT_CARDS_ID.EVENT_RACE_CONDITIONS,
          EVENT_CARDS_ID.EVENT_API_CONGESTION,
          EVENT_CARDS_ID.EVENT_ARCHITECTURE_STRAIN,
        ],
        LOW: [
          EVENT_CARDS_ID.EVENT_BACKEND_CORE_REGRESSION,
          EVENT_CARDS_ID.EVENT_FORGOT_WHERE_CLAUSE,
          EVENT_CARDS_ID.EVENT_FRONTEND_INSTABILITY,
        ],
      },
    },
  },
});
// EVENT_REMOVE_TEST: {
// drawId: null,
// type: 'EVENT',
// eventId: 'EVENT_REMOVE_TEST',
// effect: 'REMOVE_TEST_COMPONENTS',
// titlePT: 'Refatoração Necessária',
// descriptionPT: 'O PM mandou refatorar todo o backend, testes no backend precisaram ser refeitos.',
// componentsAffected: ['backend']
