import { decisions } from '../../../../shared/src/definitions/decisons.js';
import { getPlayerObject } from '../selectors.js';
import { decisionHandlers } from './handlers.js';
import { runDecisionValidators } from './validators.js';

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
    const decisionAvailableDef = decisionsDefinitions.options[decisionAvailable];
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
// TODO: Missing checking specifically for tests and component types

export function applyDecisionEffect(action, state) {
  let next = structuredClone(state);

  const definition = decisions[action.chosen];
  if (!definition) return next;

  const context = resolveDecisionContext(action, next, definition);

  const isValid = runDecisionValidators(definition.validators, context);
  if (!isValid) return next;

  const handler = decisionHandlers[definition.effect];
  if (!handler) return next;

  return handler(next, context, definition);
}
//TODO: Investigate > applyDecisionEffect is currently looking up decision
// definitions as decisions[action.chosen], but decisions is structured
// as { options, allIds, forUI }. This means definition will always be undefined
// and no decision effect will ever apply. Lookup should be against decisions.options
// (and the action field used for the lookup should match the actual action shape).

function resolveDecisionContext(decisionAction, state) {
  const decisionDefinition = decisions[decisionAction.chosen];
  const currentPlayerId = state.flow.currentPlayerId;
  const target = decisionAction.target;
  const selectedAmount = decisionAction.selectedAmount;
  const selectedComponentId = decisionAction.component;

  const currentPlayer = getPlayerObject(currentPlayerId, state.players);

  const selectedComponent = selectedComponentId
    ? { ...state.components.nodes[selectedComponentId] }
    : null;

  return {
    decisionDefinition,
    currentPlayer,
    target,
    selectedComponentId,
    selectedComponent,
    selectedAmount
  };
}