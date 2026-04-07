import { getPlayerObject, getTotalPlayersPoints } from '../selectors.js';
import { runDecisionsAvailabilityRules } from './availabilityRules.js';
import { decisionHandlers } from './applicationHandlers.js';
import { runDecisionsApplicationValidators } from './applicationValidators.js';

export function getAvailableDecisions(state, decisionsDefinitions) {
  const player = getPlayerObject(state.flow.currentPlayerId, state.players);
  const playerPoints = getTotalPlayersPoints(player);

  let availableByCost = [];
  let decisionsAvailable = [];

  for (const [decisionsConfig, cost] of Object.entries(
    state.gameConfig.decisionCosts
  )) {
    if (cost <= playerPoints) availableByCost.push(decisionsConfig);
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

export function applyDecisionEffect(action, state, decisionsDefinitions) {
  let next = structuredClone(state);

  const definition = decisionsDefinitions.options[action.chosen];
  if (!definition) return next;

  const context = resolveApplyDecisionContext(action, next, decisionsDefinitions);

  const isValid = runDecisionsApplicationValidators(
    definition.applicationValidators,
    context
  );
  if (!isValid) return next;

  const handler = decisionHandlers[definition.effect];
  if (!handler) return next;

  return handler(next, context, definition);
}
function resolveApplyDecisionContext(decisionAction, state) {
  const currentPlayerId = state.flow.currentPlayerId;
  const target = decisionAction.payload.target;
  const amount = decisionAction.payload.selectedAmount;
  const usedPointsDonation = state.decisionState.appliedTotals.DONATE_POINTS;
  const usedPointsHold = state.decisionState.appliedTotals.HOLD_POINTS;
  const totalPointsLimit = state.gameConfig.taskPoints.maxPlayerPoints;

  const currentPlayer = getPlayerObject(currentPlayerId, state.players);

  const component = state?.components?.nodes[target]
    ? { ...state.components.nodes[target] }
    : null;

  return {
    currentPlayer,
    target,
    component,
    amount,
    usedPointsDonation,
    usedPointsHold,
    totalPointsLimit,
  };
}