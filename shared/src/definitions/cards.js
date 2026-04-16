export const cards = Object.freeze({
  regular: {
    LOCAL: {
      drawId: null,
      type: 'LOCAL',
    effect: {
      id: 'APPLY_BUG',
      componentsAffected: null,
      amount: null,
    },
    },
    STRUCTURAL: {
      drawId: null,
      type: 'STRUCTURAL',
      effect: {
        id: 'APPLY_BUG',
        componentsAffected: null,
        amount: null,
      },
    },
    REQUESTS: {
      drawId: null,
      type: 'REQUESTS',
            effect: {
        id: 'APPLY_BUG',
        componentsAffected: null,
        amount: null,
      },
    },
    POINTS: {
      drawId: null,
      type: 'POINTS',
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
        type: 'EVENT',
        eventId: 'EVENT_HACKER_ATTACK',
        pressureLevel: 'CRITICAL',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 3,
        },
      },
      EVENT_REQUEST_OVERLOAD: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_REQUEST_OVERLOAD',
        pressureLevel: 'CRITICAL',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 3,
        },
      },
      EVENT_VULNERABLE_AUTH_LIBRARY: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_VULNERABLE_AUTH_LIBRARY',
        pressureLevel: 'CRITICAL',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 3,
        },
      },
      EVENT_COMMUNICATION_BREAKDOWN: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_COMMUNICATION_BREAKDOWN',
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests', 'dataRequests'],
          amount: 2,
        },
      },
      EVENT_RACE_CONDITIONS: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_RACE_CONDITIONS',
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['applicationRequests'],
          amount: 3,
        },
      },
      EVENT_API_CONGESTION: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_API_CONGESTION',
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['dataRequests'],
          amount: 3,
        },
      },
      EVENT_ARCHITECTURE_STRAIN: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_ARCHITECTURE_STRAIN',
        pressureLevel: 'WARNING',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['database', 'backend', 'frontend'],
          amount: 2,
        },
      },
      EVENT_BACKEND_CORE_REGRESSION: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_BACKEND_CORE_REGRESSION',
        pressureLevel: 'LOW',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['backend', 'logic', 'integrations'],
          amount: 2,
        },
      },
      EVENT_FORGOT_WHERE_CLAUSE: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_FORGOT_WHERE_CLAUSE',
        pressureLevel: 'LOW',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['database', 'data', 'structure'],
          amount: 2,
        },
      },
      EVENT_FRONTEND_INSTABILITY: {
        drawId: null,
        type: 'EVENT',
        eventId: 'EVENT_FRONTEND_INSTABILITY',
        pressureLevel: 'LOW',
        effect: {
          id: 'APPLY_BUGS_TO_COMPONENTS',
          componentsAffected: ['frontend', 'interaction', 'interface'],
          amount: 2,
        },
      },
      byPressureLevel: {
        CRITICAL: [
          'EVENT_HACKER_ATTACK',
          'EVENT_REQUEST_OVERLOAD',
          'EVENT_VULNERABLE_AUTH_LIBRARY',
        ],
        WARNING: [
          'EVENT_COMMUNICATION_BREAKDOWN',
          'EVENT_RACE_CONDITIONS',
          'EVENT_API_CONGESTION',
          'EVENT_ARCHITECTURE_STRAIN',
        ],
        LOW: [
          'EVENT_BACKEND_CORE_REGRESSION',
          'EVENT_FORGOT_WHERE_CLAUSE',
          'EVENT_FRONTEND_INSTABILITY',
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
