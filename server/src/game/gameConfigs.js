export const gameConfigs = Object.freeze({
  maxNicknameLength: 8,
  minNicknameLength: 1,

  regularMode: {
    maxPlayers: 4,
    minPlayers: 2,
    taskPoints: {
      maxPlayerPoints: 6,
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
});
