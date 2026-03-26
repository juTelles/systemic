import { components } from '../../../shared/src/definitions/components.js';
import { getTotalPlayersPoints } from './selectors.js';


export function applyBug(component, amount = 1) {
  return {
    ...component,
    bugAmount: component.bugAmount + amount,
    saturated: component.bugAmount >= component.saturationLimit,
  };
}

export function applyGameStartBugs(stateComponents, amount = 5) {
  const updatedNodes = { ...stateComponents.nodes };
  for (let i = 0; i < amount; i++) {
    let randomComponentId = components.allIds[Math.floor(Math.random() * components.allIds.length)];
    updatedNodes[randomComponentId] = applyBug(updatedNodes[randomComponentId]);
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
