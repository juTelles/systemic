import { decisionsApplicationValidators } from '../../../../shared/src/validations/decisionsValidators.js';

export function runDecisionsApplicationValidators(validators, context) {
  for (const validatorName of validators ?? []) {
    const validator = decisionsApplicationValidators[validatorName];

    if (!validator) {
      console.warn(`[DECISION_VALIDATOR] missing validator: ${validatorName}`);
      return {
        ok: false,
        type: 'VALIDATOR_NOT_FOUND',
        failedValidation: validatorName,
      };
    }

    const isValid = validator(context);

    if (!isValid) {
      console.warn(`[DECISION_VALIDATOR] failed: ${validatorName}`, context);
      return {
        ok: false,
        type: 'INVALID_DECISION',
        failedValidation: validatorName,
      };
    }
  }
  return { ok: true };
}
