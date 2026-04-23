import { componentIdHasAbsorbedBug } from './selectors.js';
import { createError } from '../utils/createErrors.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import {
  addComponentToAbsorbedBugs,
  removeComponentFromAbsorbedBugs,
} from './gameHelpers.js';

export function updateAbsorbBugsState(absorbedBugs, testedComponent) {
  if (!testedComponent.id) throw createError(ERRORS.MISSING_COMPONENT_ID);
  if (!testedComponent.hasTests) throw createError(ERRORS.COMPONENT_NOT_TESTED);
  if (!Array.isArray(absorbedBugs))
    throw createError(ERRORS.ABSORBED_BUGS_MUST_BE_ARRAY);

  const hasAbsorbedBug = componentIdHasAbsorbedBug(
    absorbedBugs,
    testedComponent.id,
  );

  const updatedAbsorbedBugs = hasAbsorbedBug
    ? removeComponentFromAbsorbedBugs(absorbedBugs, testedComponent.id)
    : addComponentToAbsorbedBugs(absorbedBugs, testedComponent.id);

  return {
    wasAbsorbed: !hasAbsorbedBug,
    absorbedBugs: updatedAbsorbedBugs,
  };
}
