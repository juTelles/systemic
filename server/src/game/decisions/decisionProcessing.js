import { getPlayerObject, getTotalPlayersPoints } from '../selectors.js';
import { decisionHandlers } from './applicationHandlers.js';
import { runDecisionsApplicationValidators } from './applicationValidators.js';
import { ERRORS } from '../../../../shared/src/constants/errors.js';

export function applyDecision(action, state, decisionsDefinitions) {
  let next = structuredClone(state);

  const definition = decisionsDefinitions.options[action.payload.chosen];
  if (!definition) throw new Error(ERRORS.DECISION_DEFINITION_NOT_FOUND);

  const context = resolveApplyDecisionContext(
    action,
    next,
  );

  const validationResult = runDecisionsApplicationValidators(
    definition.applicationValidators,
    context,
  );
  if (!validationResult.ok) return validationResult;

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
  const targetPlayer = getPlayerObject(target, state.players) ?? null;
  const amount = decisionAction.payload.selectedAmount ?? null;
  const usedPointsDonation =
    state.decisionState.appliedTotals.DONATE_POINTS ?? null;
  const usedPointsHold = state.decisionState.appliedTotals.HOLD_POINTS ?? null;
  const totalPointsLimit = state.gameConfig.taskPoints.maxPlayerPoints ?? null;
  const donationTurnLimit =
    state.gameConfig.decisionCosts.DONATE_POINTS ?? null;
  const holdTurnLimit = state.gameConfig.decisionCosts.HOLD_POINTS ?? null;
  const operationCost =
    state.gameConfig.decisionCosts[decisionAction.payload.chosen] ?? null;
  const currentPlayer = getPlayerObject(currentPlayerId, state.players) ?? null;

  const component = state?.components?.nodes[target]
    ? { ...state.components.nodes[target] }
    : null;

  return {
    currentPlayer,
    targetPlayer,
    component,
    amount,
    usedPointsDonation,
    usedPointsHold,
    donationTurnLimit,
    holdTurnLimit,
    totalPointsLimit,
    operationCost,
  };
}
