import { getPlayerObject, getTotalPlayersPoints } from '../selectors.js';
import { runDecisionsAvailabilityRules } from './availabilityRules.js';
import { decisionHandlers } from './applicationHandlers.js';
import { runDecisionsApplicationValidators } from './applicationValidators.js';
import { ERRORS } from '../../../../shared/src/constants/errors.js';

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

export function applyDecisionEffect(action, state, decisionsDefinitions) {
  let next = structuredClone(state);

  const definition = decisionsDefinitions.options[action.payload.chosen];
  if (!definition) throw new Error(ERRORS.DECISION_DEFINITION_NOT_FOUND);

  const context = resolveApplyDecisionContext(
    action,
    next,
    decisionsDefinitions
  );

  const validationResult = runDecisionsApplicationValidators(
    definition.applicationValidators,
    context
  );
  if (!validationResult.ok)
    return validationResult;

  const handler = decisionHandlers[definition.effect];
  if (!handler) throw new Error(ERRORS.DECISION_HANDLER_NOT_FOUND);

  next = handler(next, context, definition);

  return {
    ok: true,
    next: next,
  };
}
function resolveApplyDecisionContext(decisionAction, state) {
  const currentPlayerId = state.flow.currentPlayerId;
  const target = decisionAction.payload.target;
  const amount = decisionAction.payload.selectedAmount;
  const usedPointsDonation = state.decisionState.appliedTotals.DONATE_POINTS;
  const usedPointsHold = state.decisionState.appliedTotals.HOLD_POINTS;
  const totalPointsLimit = state.gameConfig.taskPoints.maxPlayerPoints;
  const donationTurnLimit = state.gameConfig.decisionCosts.DONATE_POINTS;
  const holdTurnLimit = state.gameConfig.decisionCosts.HOLD_POINTS;

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
    donationTurnLimit,
    holdTurnLimit,
    totalPointsLimit,
  };
}