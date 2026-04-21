import { getSaturatedNodesIdsByType, getNodesByIds } from './selectors.js';
import { applyBug } from './gameHelpers.js';
import { createError } from '../utils/createErrors.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';

export function processEndRoundRequestPropagation(stateComponents) {
  if (!stateComponents) {
    throw createError(ERRORS.INTERNAL_ERROR);
  }

  const saturatedRequestsIds = getSaturatedNodesIdsByType(
    stateComponents,
    'REQUESTS',
  );
  const saturatedRequestNodes = getNodesByIds(
    stateComponents,
    saturatedRequestsIds,
  );

  if (saturatedRequestNodes.length === 0) {
    throw createError(ERRORS.INTERNAL_ERROR);
  }

  const updatedComponents = applyRequestPropagation(
    saturatedRequestNodes,
    stateComponents,
  );
  return updatedComponents;
}

function applyRequestPropagation(saturatedRequestsNodes, stateComponents) {
  const updatedNodes = { ...stateComponents.nodes };
  const componentsWithUpdatedNodes = {
    ...stateComponents,
    nodes: updatedNodes,
  };

  const saturatedRequestChildren = saturatedRequestsNodes.flatMap(
    (node) => node.childrenIds,
  );

  saturatedRequestChildren.forEach((componentId) => {
    updatedNodes[componentId] = applyBug(
      updatedNodes[componentId],
      componentsWithUpdatedNodes,
    );
  });

  return {
    ...stateComponents,
    nodes: updatedNodes,
  };
}
