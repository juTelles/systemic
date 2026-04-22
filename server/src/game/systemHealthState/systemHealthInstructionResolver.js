const HEALTH_STATE_INSTRUCTIONS = {
  HEALTHY: {
    WARNING: {
      key: 'HEALTHY_TO_WARNING',
    },
    CRITICAL: {
      key: 'HEALTHY_TO_CRITICAL',
    },
  },
  WARNING: {
    HEALTHY: {
      key: 'WARNING_TO_HEALTHY',
    },
    CRITICAL: {
      key: 'WARNING_TO_CRITICAL',
    },
  },
  CRITICAL: {
    HEALTHY: {
      key: 'CRITICAL_TO_HEALTHY',
    },
    WARNING: {
      key: 'CRITICAL_TO_WARNING',
    },
  },
};

export function getKeyForHealthChange(oldHealthState, newHealthState) {
  return HEALTH_STATE_INSTRUCTIONS[oldHealthState]?.[newHealthState]?.key;
}
