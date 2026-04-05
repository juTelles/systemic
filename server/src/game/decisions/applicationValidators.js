export const decisionsApplicationValidators = {
  REQUIRES_COMPONENT: (context) => !!context?.selectedComponent,
  REQUIRES_TARGET: (context) => !!context?.target,
  REQUIRES_AMOUNT: (context) => context.selectedAmount != null,
  AMOUNT_MUST_BE_POSITIVE: (context) => context.selectedAmount > 0,
  COMPONENT_MUST_HAVE_BUG: (context) =>
    context?.selectedComponent?.bugAmount > 0,
  COMPONENT_MUST_NOT_HAVE_TESTS: (context) =>
    !context?.selectedComponent?.hasTests,
  COMPONENT_MUST_HAVE_TESTS: (context) => context?.selectedComponent?.hasTests,
};

export function runDecisionsApplicationValidators(validators, context) {
  for (const validatorName of validators ?? []) {
    const validator = decisionsApplicationValidators[validatorName];

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
