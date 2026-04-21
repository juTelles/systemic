import { SYSTEM_HEALTH_STATES } from '../../../../shared/src/constants/systemHealthStates.js';
import { getNodeIdsByType, getSaturatedNodesIdsByType } from '../selectors.js';
import { createError } from '../../utils/createErrors.js';
import { ERRORS } from '../../../../shared/src/constants/errors.js';

const HEALTH_RULES = [
  {
    when: ({ total, saturated }) => total > 0 && saturated >= total,
    state: SYSTEM_HEALTH_STATES.CRITICAL,
  },
  {
    when: ({ saturated }) => saturated > 0,
    state: SYSTEM_HEALTH_STATES.WARNING,
  },
  {
    when: ({ saturated }) => saturated === 0,
    state: SYSTEM_HEALTH_STATES.HEALTHY,
  },
];

export function verifySystemHealthChange(gameState) {
  const { components, currentHealthState } =
    validateGameStateForHealthCheck(gameState);
  const requestNodeIds = getNodeIdsByType(components, 'REQUESTS');
  const saturatedRequestsIds = getSaturatedNodesIdsByType(
    components,
    'REQUESTS',
  );
  const newHealthState = deriveHealthState(
    requestNodeIds.length,
    saturatedRequestsIds.length,
  );

  return {
    healthStateChanged: newHealthState !== currentHealthState,
    oldHealthState: currentHealthState,
    newHealthState,
  };
}

function validateGameStateForHealthCheck(gameState) {
  const { components, system } = gameState;
  const currentHealthState = system?.healthState;

  if (!currentHealthState) {
    throw createError(ERRORS.MISSING_CURRENT_HEALTH_STATE);
  }

  if (!components?.byType || !components?.nodes) {
    throw createError(ERRORS.MISSING_COMPONENTS_DATA);
  }

  return { components, currentHealthState };
}

function deriveHealthState(totalRequests, saturatedRequests) {
  const input = { total: totalRequests, saturated: saturatedRequests };
  return HEALTH_RULES.find((rule) => rule.when(input)).state;
}
