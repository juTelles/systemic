export function resolveDecisionIdFromUISelection(
  decisionUI,
  targetStateObj,
  amount = null
) {
  console.log('Resolving decision ID from UI selection:', {
    decisionUI,
    targetStateObj,
    amount,
  });
  let chosen = decisionUI.regularDecisionId;
  if (!decisionUI || !targetStateObj) return null;

  if (decisionUI.type === 'RESOLVE_BUG') {
    chosen =
      targetStateObj.hasTests && decisionUI.testedDecisionId
        ? decisionUI.testedDecisionId
        : decisionUI.regularDecisionId;
  }
  return {
    chosen: chosen,
    target: targetStateObj.id,
    selectedAmount: amount,
  };
}

// export function resolveContextForDecisionValidation(decision, state, locaPlayerId) {
//     const currentPlayerId = state.flow.currentPlayerId;
//     const target = decision.target;
//     const amount = decision.selectedAmount;
//     const usedPointsDonation = state.decisionState.appliedTotals.DONATE_POINTS;
//     const usedPointsHold = state.decisionState.appliedTotals.HOLD_POINTS;
//     const totalPointsLimit = state.gameConfig.taskPoints.maxPlayerPoints;

//     const currentPlayer = state.players.find((player) => player.id === currentPlayerId);

//     const component = state?.components?.nodes[target]
//       ? { ...state.components.nodes[target] }
//       : null;

//     return {
//       currentPlayer,
//       target,
//       component,
//       amount,
//       usedPointsDonation,
//       usedPointsHold,
//       totalPointsLimit
//     };
//   };
