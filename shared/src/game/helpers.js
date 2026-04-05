export function isComponentEligibleForTests(component, components) {
  console.log('Checking eligibility for component:', component.id);
  const requiresChildrenTested = component.type !== 'LOCAL';
  const hasNoBugs = component.bugAmount === 0;
  const hasNoTests = !component.hasTests;
  const hasChildrenTested =
    !requiresChildrenTested ||
    component.childrenIds.every((childId) => components.nodes[childId].hasTests);

  const isEligible = hasNoBugs && hasNoTests && hasChildrenTested;

  return isEligible;
}