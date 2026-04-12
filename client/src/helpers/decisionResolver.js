import { decisionsApplicationValidators } from '../../../shared/src/validations/decisionsValidators.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import { decisions as decisionDefinitions } from '../../../shared/src/definitions/decisions.js';
import { getErrorMessage } from '../texts/errorsMessages.js';

export function resolveDecision(
  roomState,
  decisionUIId,
  targetStateObj,
  amount = null,
) {
  const decisionUI = decisionDefinitions?.forUI[decisionUIId];
  if (!decisionUI) {
    console.error(`No decision UI found for ID: ${decisionUIId}`);
    return null;
  }
  const action = buildDecisionIdFromUISelection(
    decisionUI,
    targetStateObj,
    amount,
  );
  if (!action) return null;

  const isValid = validateDecision(
    action.chosen,
    targetStateObj,
    amount,
    roomState,
  );
  if (!isValid.ok) {
    return {
      ok: false,
      errorMessage: getErrorMessage(isValid.failedValidation),
    };
  }
  return {
    ok: true,
    action,
  };
}

export function buildDecisionIdFromUISelection(
  decisionUI,
  targetStateObj,
  amount = null,
) {
  console.log('Resolving decision ID from UI selection', {
    decisionUI,
    targetStateObj,
    amount,
  });
  let chosen = decisionUI.regularDecisionId;
  if (!decisionUI || !targetStateObj) return null;

  if (decisionUI.type === 'RESOLVE_BUG') {
    chosen =
      targetStateObj.hasTests && decisionUI.testedDecisionId
        ? decisionUI.testedDecisionId
        : decisionUI.regularDecisionId;
  }
  return {
    chosen: chosen,
    target: targetStateObj.id,
    selectedAmount: amount,
  };
}

export function validateDecision(decisionId, targetObj, amount, roomState) {
  console.log('Validating decision', {
    decisionId,
    targetObj,
    amount,
    roomState,
  });
  const definition = decisionDefinitions.options[decisionId];
  if (!definition) throw Error(ERRORS.DECISION_DEFINITION_NOT_FOUND);

  const context = resolveContextForDecisionValidation({
    definition,
    targetObj,
    amount,
    roomState,
  });

  const validationResult = runDecisionsValidators(
    definition.applicationValidators,
    context,
  );
  if (!validationResult.ok) return validationResult;

  return {
    ok: true,
  };
}

export function runDecisionsValidators(validators, context) {
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

export function resolveContextForDecisionValidation({
  definition,
  targetObj,
  amount,
  roomState,
}) {
  const targetPlayer = definition.type === 'MANAGE_POINTS' ? targetObj : null;
  const component = definition.type !== 'MANAGE_POINTS' ? targetObj : null;
  const usedPointsDonation =
    roomState?.decisionState?.appliedTotals?.DONATE_POINTS ?? null;
  const usedPointsHold =
    roomState?.decisionState?.appliedTotals?.HOLD_POINTS ?? null;
  const totalPointsLimit =
    roomState?.gameConfig?.taskPoints?.maxPlayerPoints ?? null;
  const donationTurnLimit =
    roomState?.gameConfig?.decisionCosts?.DONATE_POINTS ?? null;
  const holdTurnLimit =
    roomState?.gameConfig?.decisionCosts?.HOLD_POINTS ?? null;
  const currentPlayerId = roomState?.flow?.currentPlayerId;
  const currentPlayer =
    roomState?.players?.find((p) => p.id === currentPlayerId) ?? null;
  const operationCost =
    roomState?.gameConfig?.decisionCosts?.[definition.id] ?? null;

  return {
    currentPlayer,
    targetPlayer,
    component,
    amount,
    usedPointsDonation,
    usedPointsHold,
    donationTurnLimit,
    holdTurnLimit,
    totalPointsLimit,
    operationCost,
  };
}
