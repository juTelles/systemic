export const decisionsApplicationValidators = {
  REQUIRES_COMPONENT: (context) => !!context?.component,
  REQUIRES_TARGET: (context) => !!context?.target,
  REQUIRES_AMOUNT: (context) => context.amount != null,
  AMOUNT_MUST_BE_POSITIVE: (context) => context.amount > 0,

  COMPONENT_MUST_HAVE_BUG: (context) => context?.component?.bugAmount > 0,
  COMPONENT_MUST_NOT_HAVE_TESTS: (context) => !context?.component?.hasTests,
  COMPONENT_MUST_HAVE_TESTS: (context) => context?.component?.hasTests,
  HOLD_WITHIN_TURN_LIMIT: (context) => {
    return context?.usedPointsHold + context?.amount <= context.holdTurnLimit;
  },
  DONATION_WITHIN_TURN_LIMIT: (context) => {
    return (
      context?.usedPointsDonation + context?.amount <= context.donationTurnLimit
    );
  },
  TARGET_PLAYER_TOTAL_WITHIN_LIMIT: (context) => {
    const newTotalPoints =
      context?.target?.handPoints +
      context?.target?.bankPoints +
      context?.amount;
    return newTotalPoints <= context?.totalPointsLimit;
  },
  HAS_POINTS_FOR_DONATION: (context) => {
    const totalPoints =
      context?.currentPlayer?.handPoints + context?.currentPlayer?.bankPoints;
    return totalPoints >= context?.amount;
  },
  HAS_HAND_POINTS_FOR_HOLD: (context) => {
    return context?.currentPlayer?.handPoints >= context?.amount;
  },
  HAS_POINTS_FOR_OPERATION_COST: (context) => {
    const totalPoints =
      context?.currentPlayer?.handPoints + context?.currentPlayer?.bankPoints;
    return totalPoints >= context?.operationCost;
  }
};
// TODO: add validator for current player has points for decision