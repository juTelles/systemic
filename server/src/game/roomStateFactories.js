import { createError } from "../utils/createErrors.js";
import { ERRORS } from "../../../shared/src/constants/errors.js";
import { steps } from "../../../shared/src/definitions/steps.js";

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

export function createStepState(stepKey) {
  const baseStep = steps[stepKey];

  if (!baseStep) {
    throw new createError(ERRORS.MISSING_STEP_DEFINITION);
  }

  return {
    ...baseStep,
    flowControl: {
      ...baseStep.flowControl,
      current: {
        ...baseStep.flowControl.current,
      },
      nextTransition: {
        ...baseStep.flowControl.nextTransition,
      },
    },
    effects: [...baseStep.effects],
  };
}