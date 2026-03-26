const decisionValidators = {
  REQUIRES_COMPONENT: (context) => !!context?.selectedComponent,
  REQUIRES_TARGET: (context) => !!context?.target,
  REQUIRES_AMOUNT: (context) => typeof context.selectedAmount === 'number',
  COMPONENT_MUST_HAVE_BUG: (context) => context?.selectedComponent?.bugAmount > 0,
  COMPONENT_MUST_NOT_HAVE_TESTS: (context) => !context?.selectedComponent?.hasTests,
  COMPONENT_MUST_HAVE_TESTS: (context) => context?.selectedComponent?.hasTests,
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
