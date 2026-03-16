const decisionValidators = {
  REQUIRES_COMPONENT: ({ action }) => !!action.component,
  REQUIRES_TARGET: ({ action }) => !!action.target,
  REQUIRES_AMOUNT: ({ action }) => typeof action.selectedAmount === 'number',
  COMPONENT_MUST_HAVE_BUG: ({ component }) => component?.bugAmount > 0,
  COMPONENT_MUST_NOT_HAVE_TESTS: ({ component }) => !component?.hasTests,
};

export function runDecisionValidators(validators, context) {
  for (const validatorName of validators ?? []) {
    const validator = decisionValidators[validatorName];

    if (!validator) {
      console.warn(`[DECISION_VALIDATOR] missing validator: ${validatorName}`);
      return false;
    }

    const isValid = validator(context);

    if (!isValid) {
      console.warn(`[DECISION_VALIDATOR] failed: ${validatorName}`, context);
      return false;
    }
  }

  return true;
}
