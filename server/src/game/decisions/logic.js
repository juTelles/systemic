import { decisions } from '../../../../shared/src/definitions/decisons.js';
import { getPlayerObject } from '../selectors.js';
import { decisionHandlers } from './handlers.js';
import { runDecisionValidators } from './validators.js';

export function getAvailableDecisions(decisionsObject, playerPoints) {
  const decisionsAvailable = [];

  for (const [decisionType, cost] of Object.entries(decisionsObject)) {
    if (cost <= playerPoints) {
      decisionsAvailable.push(decisionType);
    }
  }
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

  const selectedComponent = componentId
    ? { ...state.components.nodes[componentId] }
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