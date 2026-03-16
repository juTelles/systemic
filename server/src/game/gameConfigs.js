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
});
