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
        name: 'SET_READY',
        progression: {
          trigger: 'PLAYER_INPUT',
          type: 'PLAYER_INPUT',
          triggerNext: 'AUTO',
        },
        next: null,
        dataDefaults: {},
      },
    },
    deck: [],
    log: { lastEvent: null },
    system: { globalStatus: 'HEALTHY' },
    decisions: {
      available: [],
      chosen: null,
      target: null,
      selectedAmount: 0,
      applied: [],
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
        LOCAL: 2,
        STRUCTURAL: 4,
        REQUEST: 6,
        LOCAL_TESTED: 1,
        STRUCTURAL_TESTED: 2,
        REQUEST_TESTED: 3,
        TESTS: 6,
        MAX_POINTS: 2,
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
