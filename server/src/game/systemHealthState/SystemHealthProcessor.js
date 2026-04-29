import { SYSTEM_HEALTH_STATES } from '../../../../shared/src/constants/gameEnums.js';
import { verifySystemHealthChange } from './systemHealthChangeVerifier.js';
import { getKeyForHealthChange } from './systemHealthInstructionResolver.js';
import { addGameLog } from '../gameLog.js';

export function processSystemHealth(gameState) {
  validateSystemHealthProcessInput(gameState);

  const system = { ...gameState.system };

  const changeObject = verifySystemHealthChange(gameState);

  const { oldHealthState, newHealthState, healthStateChanged } = changeObject;
  if (!healthStateChanged) return { updated: false };

  const updatedSystem = updateSystemHealthState(system, changeObject);
  const changeKey = getKeyForHealthChange(oldHealthState, newHealthState);

  const gameLog = addGameLog(gameState, {
    type: '[SYSTEM_HEALTH_CHANGE]',
    oldHealthState: oldHealthState,
    newHealthState: newHealthState,
    oldSystemState: system,
    newSystemState: updatedSystem,
  });

  return {
    gameLog: gameLog,
    system: updatedSystem,
    stepInstructionKey: changeKey,
    updated: true,
  };
}

function updateSystemHealthState(systemObject, changeObject) {
  const { healthStateChanged, newHealthState } = changeObject;

  if (
    healthStateChanged &&
    newHealthState === SYSTEM_HEALTH_STATES.CRITICAL &&
    !systemObject.isCrisisRound
  ) {
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
