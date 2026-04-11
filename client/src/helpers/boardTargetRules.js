import { isComponentEligibleForTests } from '../../../shared/src/game/helpers.js';

export function isBoardNodeDisabled(node, decisions, state) {
  const component = state?.components?.nodes?.[node];

  if (!component || !Array.isArray(decisions) || decisions.length === 0) {
    return false;
  }

  const context = {
    node: component,
    components: state?.components,
  };

  const isAble = decisions.some((decision) => {
    const rule = nodeRules[decision];
    return typeof rule === 'function' ? rule(context) : false;
  });

  return !isAble;
}

const nodeRules = {
  RESOLVE_LOCAL_BUG: (context) => {
    return (
      context.node.type === 'LOCAL' &&
      context.node.bugAmount > 0 &&
      !context.node.hasTests
    );
  },
  RESOLVE_LOCAL_BUG_TESTED: (context) => {
    return (
      context.node.type === 'LOCAL' &&
      context.node.bugAmount > 0 &&
      context.node.hasTests
    );
  },
  RESOLVE_STRUCTURAL_BUG: (context) => {
    return (
      context.node.type === 'STRUCTURAL' &&
      context.node.bugAmount > 0 &&
      !context.node.hasTests
    );
  },
  RESOLVE_STRUCTURAL_BUG_TESTED: (context) => {
    return (
      context.node.type === 'STRUCTURAL' &&
      context.node.bugAmount > 0 &&
      context.node.hasTests
    );
  },
  RESOLVE_REQUESTS_BUG: (context) => {
    return (
      context.node.type === 'REQUESTS' &&
      context.node.bugAmount > 0 &&
      !context.node.hasTests
    );
  },
  RESOLVE_REQUESTS_BUG_TESTED: (context) => {
    return (
      context.node.type === 'REQUESTS' &&
      context.node.bugAmount > 0 &&
      context.node.hasTests
    );
  },
  DEVELOP_TESTS: (context) => {
    return isComponentEligibleForTests(context.node, context.components);
  },
};
