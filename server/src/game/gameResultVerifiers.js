import { SYSTEM_HEALTH_STATES } from '../../../shared/src/constants/gameEnums.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import { createError } from '../utils/createErrors.js';

export function verifyGameOverCondition(systemHealthState) {
  if (!systemHealthState) {
    throw createError(ERRORS.MISSING_CURRENT_HEALTH_STATE);
  }
  return (
    systemHealthState.isCrisisRound &&
    systemHealthState.healthState === SYSTEM_HEALTH_STATES.CRITICAL
  );
}

export function verifyGameWinCondition(componentsState) {
  if (!isValidComponentsShape(componentsState)) {
    throw createError(ERRORS.MISSING_COMPONENTS_DATA);
  }

  const { byType, nodes } = componentsState;

  const requestComponents = byType.REQUESTS.map((id) => nodes[id]);
  const allRequestsTested = requestComponents.every(
    (component) => component?.hasTests === true,
  );
  if (!allRequestsTested) {
    return false;
  }

  const structuralComponents = byType.STRUCTURAL.map((id) => nodes[id]);
  const allStructuralTested = structuralComponents.every(
    (component) => component?.hasTests === true,
  );
  if (!allStructuralTested) {
    return false;
  }

  const localComponents = byType.LOCAL.map((id) => nodes[id]);
  const allLocalTested = localComponents.every(
    (component) => component?.hasTests === true,
  );

  return allLocalTested;
}

function isValidComponentsShape(componentsState) {
  if (!componentsState || typeof componentsState !== 'object') {
    return false;
  }

  const hasByType =
    componentsState.byType && typeof componentsState.byType === 'object';
  const hasNodes =
    componentsState.nodes && typeof componentsState.nodes === 'object';
  if (!hasByType || !hasNodes) {
    return false;
  }

  return (
    Array.isArray(componentsState.byType.REQUESTS) &&
    Array.isArray(componentsState.byType.STRUCTURAL) &&
    Array.isArray(componentsState.byType.LOCAL)
  );
}
