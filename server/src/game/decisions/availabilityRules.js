import {
  existsComponentEligibleForTests,
  existsComponentEligibleForBugResolvByType,
} from '../gameHelpers.js';

export const decisionsAvailabilityRules = {
  EXISTS_UNTESTED_COMPONENT_WITH_BUG: (context) => {
    return existsComponentEligibleForBugResolvByType(
      context?.components,
      context?.componentType,
      false
    );
  },
  EXISTS_TESTED_COMPONENT_WITH_BUG: (context) => {
    return existsComponentEligibleForBugResolvByType(
      context?.components,
      context?.componentType,
      true
    );
  },
  DONATION_WITHIN_TURN_LIMIT: (context) => {
    return context?.usedPointsDonation < context?.donationTurnLimit;
  },
  HOLD_WITHIN_TURN_LIMIT: (context) => {
    return context?.usedPointsHold < context?.holdTurnLimit;
  },
  EXISTS_COMPONENT_ELIGIBLE_FOR_TESTS: (context) =>
    existsComponentEligibleForTests(context?.components),
};

export function runDecisionsAvailabilityRules(rules, context) {
  for (const ruleName of rules ?? []) {
    const availabilityRule = decisionsAvailabilityRules[ruleName];

    if (!availabilityRule) {
      console.warn(`[DECISION_VALIDATOR] missing validator: ${ruleName}`);
      continue;
    }
    const rulePassed = availabilityRule(context);

    if (!rulePassed) {
      return false;
    }
  }
  return true;
}
