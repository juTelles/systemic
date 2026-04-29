import { getSaturatedNodesIdsByType, getNodesByIds } from './selectors.js';
import { applyBugs } from './gameHelpers.js';
import { createError } from '../utils/createErrors.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import { addGameLog } from './gameLog.js';

export function processEndRoundRequestPropagation(state) {
  if (!state.components) {
    throw createError(ERRORS.INTERNAL_ERROR);
  }

  const saturatedRequestsIds = getSaturatedNodesIdsByType(
    state.components,
    'REQUESTS',
  );

  if (saturatedRequestsIds.length === 0) {
    return { propagated: false };
  }

  const saturatedRequestNodes = getNodesByIds(
    state.components,
    saturatedRequestsIds,
  );


  const { nodes, log } = applyRequestPropagation(
    state.components,
    saturatedRequestNodes,
  );

  const gameLog = addGameLog(state, {
    type: '[BUGS_APPLIED]',
    reason: 'REQUESTS_PROPAGATION',
    appliedBugs: log.bugsApplied,
    amount: 1,
    propagated: log.componentsPropagated,
  });

  return {
    gameLog,
    nodes: nodes,
    propagated: true,
  };
}

function applyRequestPropagation(stateComponents, saturatedRequestsNodes) {
  const saturatedRequestChildren = saturatedRequestsNodes.flatMap(
    (node) => node.childrenIds,
  );

  const { nodes, log } = applyBugs(saturatedRequestChildren, stateComponents.nodes);

  return {
    log,
    nodes: nodes,
  };
}
