export function createInitialState({ roomId }) {
  const now = Date.now();

  return {
    meta: { roomId, rev: 0, updatedAt: now, createdAt: now },
    phase: 'LOBBY',
    gameResult: null,
    players: [],
    flow: {
      round: 0,
      turn: 0,
      currentPlayerId: null,
      blockedUntil: null,
      crisisRoundCounter: 0,
      step: {
        name: 'WAITING_PLAYERS_READY',
        stepInstructionKey: null,
        flowControl: {
          current: {
            accepts: 'PLAYER_INPUT',
          },
          nextTransition: {
            actionType: null,
            trigger: null,
          },
        },
      },
    },
    deck: {
      drawPile: [],
      discardPile: [],
    },
    log: { lastEvent: null },
    system: {
      healthState: 'HEALTHY',
      isCrisisRound: false,
      pendingCrisisRound: false,
    },
    decisionState: {
      available: [],
      appliedTotals: {
        DONATE_POINTS: 0,
        HOLD_POINTS: 0,
      },
      validationError: null,
    },
    cardState: {
      lastDrawId: 0,
      cardsRemainingInTurn: 0,
      current: null,
    },
    components: {},
    absorbedBugs: [],
    gameConfig: {
      maxPlayers: 4,
      minPlayers: 2,
      cardsPerTurn: 2,
      bugSaturationLimit: 3,
      taskPoints: {
        maxPlayerPoints: 8,
        maxDonationPerPlayer: 2,
        maxHoldPerPlayer: 2,
        playerPerRound: 3,
        playerPerCrisisRound: 1,
      },
      decisionCosts: {
        RESOLVE_LOCAL_BUG: 2,
        RESOLVE_STRUCTURAL_BUG: 4,
        RESOLVE_REQUESTS_BUG: 6,
        RESOLVE_LOCAL_BUG_TESTED: 1,
        RESOLVE_STRUCTURAL_BUG_TESTED: 2,
        RESOLVE_REQUESTS_BUG_TESTED: 3,
        DEVELOP_TESTS: 6,
        DONATE_POINTS: 2,
        HOLD_POINTS: 2,
      },
      deckComposition: {
        regularCards: [
          {
            cardType: 'LOCAL',
            componentType: 'LOCAL',
            quantity: 20,
          },
          {
            cardType: 'STRUCTURAL',
            componentType: 'STRUCTURAL',
            quantity: 15,
          },
          {
            cardType: 'REQUESTS',
            componentType: 'REQUESTS',
            quantity: 10,
          },
          {
            cardType: 'POINTS',
            quantity: 5,
          },
        ],
        specialCards: {
          cardType: 'EVENT',
          quantity: 10,
          quantityByPressureLevel: {
            LOW: 3,
            WARNING: 4,
            CRITICAL: 3,
          },
        },
      },
    },
  };
}
