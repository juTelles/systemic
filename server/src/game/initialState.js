export function createInitialState({ roomId }) {
  const now = Date.now();

  return {
    meta: { roomId, rev: 0, updatedAt: now, createdAt: now },
    phase: 'LOBBY',
    players: [],
    flow: {
      round: 0,
      turn: 0,
      currentPlayerId: null,
      isCrisisRound: false,
      blockedUntil: null,
      step: {
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
      },
    },
    deck: [],
    log: { lastEvent: null },
    system: { globalStatus: 'HEALTHY' },
    decisionState: {
      available: [],
      currentDecision: {
        decisionId: null,
        target: null,
        selectedAmount: 0,
      },
      appliedTotals: {
        DONATE_POINTS: 0,
        HOLD_POINTS: 0,
      },
    },
    components: {},
    gameConfig: {
      maxPlayers: 4,
      minPlayers: 2,
      taskPoints: {
        maxPlayerPoints: 8,
        maxDonationPerPlayer: 2,
        playerPerRound: 3,
        playerPerCrisisRound: 4,
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
      deck: {
        composition: [
          {
            cardType: 'BUG',
            componentType: 'LOCAL',
            quantity: 20,
          },
          {
            cardType: 'BUG',
            componentType: 'STRUCTURAL',
            quantity: 15,
          },
          {
            cardType: 'BUG',
            componentType: 'REQUEST',
            quantity: 10,
          },
          {
            cardType: 'POINTS',
            quantity: 5,
          },
          {
            cardType: 'EVENT',
            quantity: 5,
          },
        ],
      },
    },
  };
}
