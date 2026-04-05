import { components } from '../../../shared/src/definitions/components.js';
import { getTotalPlayersPoints } from './selectors.js';
import { isComponentEligibleForTests } from '../../../shared/src/game/helpers.js';

export function existsComponentEligibleForBugResolvByType(
  components,
  componentType,
  withTests = false
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
      isComponentEligibleForTests(components.nodes[component], components)
    ) ||
    byType.STRUCTURAL.Array.some((component) =>
      isComponentEligibleForTests(components.nodes[component], components)
    ) ||
    byType.REQUESTS.Array.some((component) =>
      isComponentEligibleForTests(components.nodes[component], components)
    );
  return exists;
}

export function applyBug(component, components, amount = 1) {
  const saturated = component.bugAmount + amount >= component.saturationLimit;

  if (saturated && component.type !== 'REQUESTS') {
    components.parentIds.forEach((parentId) => {
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

export function applyGameStartBugs(stateComponents, amount = 5) {
  const updatedNodes = { ...stateComponents.nodes };
  for (let i = 0; i < amount; i++) {
    let randomComponentId =
      stateComponents.allIds[
        Math.floor(Math.random() * stateComponents.allIds.length)
      ];
    updatedNodes[randomComponentId] = applyBug(updatedNodes[randomComponentId], stateComponents);
  }
  return {
    ...stateComponents,
    nodes: updatedNodes,
  };
}

export function applyTest(component) {
  if (component.hasTests) {
    console.warn('Invalid action: Component already has tests');
    return component;
  }
  return {
    ...component,
    hasTests: true,
  };
}

export function resolveBug(component, amount = 1) {
  if (component.bugAmount <= 0) {
    console.warn('Invalid action: Component has no bugs to resolve');
    return component;
  }
  return {
    ...component,
    bugAmount: component.bugAmount - amount,
  };
}

export function subtractPointsToPlayer(player, pointsToSubtract) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints - pointsToSubtract < 0) {
    console.warn('Invalid action: Not have enough points to subtract');
    return player;
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
  maxPlayerPoints
) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints + pointsToAdd > maxPlayerPoints) {
    console.warn('Invalid action: exceeds maximum allowed points per player');
    return player;
  }
  return {
    ...player,
    bankPoints: player.bankPoints + pointsToAdd,
  };
}

export function addPointsToPlayerBankByHolding(
  player,
  pointsToAdd
) {
  if (player.handPoints < pointsToAdd) {
    console.warn(
      'Invalid action: Not have enough points in hand to add to bank'
    );
    return player;
  }
  return {
    ...player,
    bankPoints: player.bankPoints + pointsToAdd,
    handPoints: player.handPoints - pointsToAdd,
  };
}

export function addPointsToPlayerHand(player, pointsToAdd, maxPlayerPoints) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints >= maxPlayerPoints) {
    return player;
  }
  const allowedPointsToAdd = Math.min(
    pointsToAdd,
    maxPlayerPoints - totalPoints
  );
  return {
    ...player,
    handPoints: player.handPoints + allowedPointsToAdd,
  };
}
