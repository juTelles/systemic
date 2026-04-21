import { SYSTEM_HEALTH_STATES } from '../../../../shared/src/constants/systemHealthStates.js';
import { verifySystemHealthChange } from './systemHealthChangeVerifier.js';
import { getInstructionForHealthChange } from './systemHealthInstructionResolver.js';

export function processSystemHealth(gameState) {
  validateSystemHealthProcessInput(gameState);

  const system = { ...gameState.system };
  const step = { ...gameState.flow.step };

  const changeObject = verifySystemHealthChange(gameState);

  const { oldHealthState, newHealthState, healthStateChanged } = changeObject;
  if (!healthStateChanged) return { updated: false };

  const updatedSystem = updateSystemHealthState(system, changeObject);

  const updatedStep = { ...step };
  updatedStep.stepInstructionKey = getInstructionForHealthChange(
    oldHealthState,
    newHealthState,
  );
  return {
    system: updatedSystem,
    step: updatedStep,
    updated: true,
  };
}

function updateSystemHealthState(systemObject, changeObject) {
  const { healthStateChanged, newHealthState } = changeObject;

  if (healthStateChanged && newHealthState === SYSTEM_HEALTH_STATES.CRITICAL) {
    systemObject.pendingCrisisRound = true;
  }
  systemObject.healthState = newHealthState;

  return systemObject;
}

function validateSystemHealthProcessInput(gameState) {
  if (!gameState?.system) {
    throw new Error('System state is missing for system health processing');
  }

  if (!gameState?.flow?.step) {
    throw new Error('Flow step is missing for system health processing');
  }
}
