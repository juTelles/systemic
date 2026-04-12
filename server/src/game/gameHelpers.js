import { getTotalPlayersPoints } from './selectors.js';
import { isComponentEligibleForTests } from '../../../shared/src/game/helpers.js';
import { createError } from '../utils/createErrors.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';

export function existsComponentEligibleForBugResolvByType(
  components,
  componentType,
  withTests = false,
) {
  const componentsByTypeArray = components.byType?.[componentType] ?? [];
  const exists = componentsByTypeArray.some((component) => {
    const componentObj = components.nodes[component];

    if (componentObj.bugAmount <= 0) return false;

    return withTests ? componentObj.hasTests : !componentObj.hasTests;
  });
  return exists;
}

export function existsComponentEligibleForTests(components) {
  const { byType } = components;
  const exists =
    byType.LOCAL.some((component) =>
      isComponentEligibleForTests(components.nodes[component], components),
    ) ||
    byType.STRUCTURAL.some((component) =>
      isComponentEligibleForTests(components.nodes[component], components),
    ) ||
    byType.REQUESTS.some((component) =>
      isComponentEligibleForTests(components.nodes[component], components),
    );
  return exists;
}

export function applyBug(component, components, amount = 1) {
  const saturated = component.bugAmount + amount >= component.saturationLimit;

  if (saturated && component.type !== 'REQUESTS') {
    component.parentIds.forEach((parentId) => {
      const parentComponent = components.nodes[parentId];
      components.nodes[parentId] = applyBug(parentComponent, components);
    });
    return { ...component, bugAmount: 0, saturated: false };
  }
  return {
    ...component,
    bugAmount: component.bugAmount + amount,
    saturated: component.bugAmount + amount >= component.saturationLimit,
  };
}
// TODO: refactor to make applyBug more generica and pure
export function applyGameStartBugs(stateComponents, amount = 5) {
  const updatedNodes = { ...stateComponents.nodes };
  const componentsWithUpdatedNodes = {
    ...stateComponents,
    nodes: updatedNodes,
  };
  for (let i = 0; i < amount; i++) {
    let randomComponentId =
      stateComponents.allIds[
        Math.floor(Math.random() * stateComponents.allIds.length)
      ];
    updatedNodes[randomComponentId] = applyBug(
      updatedNodes[randomComponentId],
      componentsWithUpdatedNodes,
    );
  }
  return {
    ...stateComponents,
    nodes: updatedNodes,
  };
}

export function applyTest(component) {
  if (component.hasTests) {
    throw createError(ERRORS.COMPONENT_ALREADY_HAS_TESTS);
  }
  return {
    ...component,
    hasTests: true,
  };
}

export function resolveBug(component, amount = 1) {
  if (component.bugAmount <= 0) {
    throw createError(ERRORS.COMPONENT_HAS_NO_BUGS_TO_RESOLVE);
  }
  return {
    ...component,
    bugAmount: component.bugAmount - amount,
  };
}

export function subtractPointsToPlayer(player, pointsToSubtract) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints - pointsToSubtract < 0) {
    throw createError(ERRORS.NOT_ENOUGH_POINTS_TO_SUBTRACT);
  }
  if (pointsToSubtract > player.handPoints) {
    const remainingPointsToSubtract = pointsToSubtract - player.handPoints;
    return {
      ...player,
      handPoints: 0,
      bankPoints: player.bankPoints - remainingPointsToSubtract,
    };
  }
  return {
    ...player,
    handPoints: player.handPoints - pointsToSubtract,
  };
}

export function addPointsToPlayerBankByDonation(
  player,
  pointsToAdd,
  maxPlayerPoints,
) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints + pointsToAdd > maxPlayerPoints) {
    throw createError(ERRORS.REACHED_MAX_PLAYER_POINTS);
  }
  return {
    ...player,
    bankPoints: player.bankPoints + pointsToAdd,
  };
}

export function addPointsToPlayerBankByHolding(player, pointsToAdd) {
  if (player.handPoints < pointsToAdd) {
    throw createError(ERRORS.NOT_ENOUGH_HAND_POINTS_TO_HOLD);
  }
}
return {
  ...player,
  bankPoints: player.bankPoints + pointsToAdd,
  handPoints: player.handPoints - pointsToAdd,
};

export function addPointsToPlayerHand(player, pointsToAdd, maxPlayerPoints) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints >= maxPlayerPoints) {
    throw createError(ERRORS.REACHED_MAX_PLAYER_POINTS);
  }
  const allowedPointsToAdd = Math.min(
    pointsToAdd,
    maxPlayerPoints - totalPoints,
  );
  return {
    ...player,
    handPoints: player.handPoints + allowedPointsToAdd,
  };
}
