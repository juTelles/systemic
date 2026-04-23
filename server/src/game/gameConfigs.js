export const gameConfigs = Object.freeze({
  maxNicknameLength: 8,
  minNicknameLength: 1,

  regularMode: {
    maxPlayers: 4,
    minPlayers: 2,
    cardsPerTurn: 2,
    bugSaturationLimit: 3,
    taskPoints: {
      maxPlayerPoints: 6,
      maxDonationPerPlayer: 2,
      maxHoldPerPlayer: 2,
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
});
