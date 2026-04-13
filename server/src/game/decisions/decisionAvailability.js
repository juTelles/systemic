import { getPlayerObject, getTotalPlayersPoints } from '../selectors.js';
import { runDecisionsAvailabilityRules } from './availabilityRules.js';

export function getAvailableDecisions(state, decisionsDefinitions) {
  const player = getPlayerObject(state.flow.currentPlayerId, state.players);
  const playerPoints = getTotalPlayersPoints(player);

  let availableByCost = [];
  let decisionsAvailable = [];
  for (const [decisionsConfigId, cost] of Object.entries(
    state.gameConfig.decisionCosts
  )) {
    if (decisionsConfigId === 'DONATE_POINTS') {
      if (playerPoints > 0) availableByCost.push(decisionsConfigId);
    } else if (decisionsConfigId === 'HOLD_POINTS') {
      if (player.handPoints > 0) availableByCost.push(decisionsConfigId);
    } else {
      if (cost <= playerPoints) availableByCost.push(decisionsConfigId);
    }
  }
  availableByCost.forEach((decisionAvailable) => {
    const decisionAvailableDef =
      decisionsDefinitions.options[decisionAvailable];
    if (!decisionAvailableDef) return;

    const context = resolveAvailableDecisionContext(
      state,
      decisionAvailableDef
    );
    const isValid = runDecisionsAvailabilityRules(
      decisionAvailableDef.availabilityRules,
      context
    );
    if (isValid) decisionsAvailable.push(decisionAvailable);
  });
  return decisionsAvailable;
}

function resolveAvailableDecisionContext(state, decisionDefinition) {
  const usedPointsDonation = state.decisionState.appliedTotals.DONATE_POINTS;
  const usedPointsHold = state.decisionState.appliedTotals.HOLD_POINTS;
  const donationTurnLimit = state.gameConfig.decisionCosts.DONATE_POINTS;
  const holdTurnLimit = state.gameConfig.decisionCosts.HOLD_POINTS;
  const components = state.components;
  const componentType = decisionDefinition.componentType ?? null;

  return {
    componentType,
    usedPointsDonation,
    usedPointsHold,
    donationTurnLimit,
    holdTurnLimit,
    components,
  };
}