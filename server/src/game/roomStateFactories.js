export function createDecisionState() {
  return {
    available: [],
    currentDecision: {
      decisionId: null,
      target: null,
      selectedAmount: 0,
    },
    appliedTotals: {
      DONATE_POINTS: 0,
      HOLD_POINTS: 0,
    },
    validationError: null,
  };
}
export function createValidationErrorState() {
  return {
    type: null,
    failedValidation: null,
  };
}
export function createPlayerState() {
  return {
  id: null,
  nickname: null,
  status: null,
  handPoints: 0,
  bankPoints: 0,
  };
}
