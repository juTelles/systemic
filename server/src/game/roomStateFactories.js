export function createDecisionState() {
  return {
    available: [],
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
