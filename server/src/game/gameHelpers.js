import { isComponentEligibleForTests } from '../../../shared/src/game/helpers.js';
import { createError } from '../utils/createErrors.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import { getTotalPlayersPoints } from './selectors.js';

export {
  cloneNodesForUpdate,
  existsComponentEligibleForBugResolvByType,
  existsComponentEligibleForTests,
  applyBug,
  applyBugAndUpdateComponents,
  applyGameStartBugs,
  applyTest,
  resolveBug,
  subtractPointsToPlayer,
  addPointsToPlayerBank,
  addPointsToPlayerBankByHolding,
  addPointsToPlayerHand,
  addStartRoundPointsToPlayers,
  cleanPlayerHandPoints,
  bankPlayersPointsForCrisisRound,
  addComponentToAbsorbedBugs,
  removeComponentFromAbsorbedBugs,
  removePlayerFromRoom,
};

function cloneNodesForUpdate(stateComponents) {
  const updatedNodes = { ...stateComponents.nodes };

  return {
    updatedNodes,
    updatedComponents: {
      ...stateComponents,
      nodes: updatedNodes,
    },
  };
}

function existsComponentEligibleForBugResolvByType(
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

function existsComponentEligibleForTests(components) {
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

function applyBug(component, components, amount = 1) {
  const saturated = component.bugAmount + amount >= component.saturationLimit;

  if (saturated && component.type !== 'REQUESTS') {
    component.parentIds.forEach((parentId) => {
      const parentComponent = components.nodes[parentId];
      components.nodes[parentId] = applyBug(parentComponent, components);
    });
    return { ...component, bugAmount: 0, saturated: false };
  }
    console.info('[APPLY_BUG]', {
    componentId: component.id,
   });
  return {
    ...component,
    bugAmount: component.bugAmount + amount,
    saturated: component.bugAmount + amount >= component.saturationLimit,
  };
}
// TODO: refactor to make applyBug more generica and pure

function applyBugAndUpdateComponents(componentId, stateComponents, amount = 1) {
  const updatedNodes = { ...stateComponents.nodes };
  const componentsWithUpdatedNodes = {
    ...stateComponents,
    nodes: updatedNodes,
  };

  updatedNodes[componentId] = applyBug(
    updatedNodes[componentId],
    componentsWithUpdatedNodes,
    amount,
  );

  return {
    ...stateComponents,
    nodes: updatedNodes,
  };
}
// TODO: refactor applyBug and applyBugAndUpdateComponents to use an queue based
// approach to avoid deep recursion and potential stack overflow with large
// component trees

function applyGameStartBugs(stateComponents, amount = 5) {
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

function applyTest(component) {
  if (component.hasTests) {
    throw createError(ERRORS.COMPONENT_ALREADY_HAS_TESTS);
  }
  return {
    ...component,
    hasTests: true,
  };
}

function resolveBug(component, amount = 1) {
  if (component.bugAmount <= 0) {
    throw createError(ERRORS.COMPONENT_HAS_NO_BUGS_TO_RESOLVE);
  }
  console.info('[RESOLVE_BUG]', {
    component: component.id,
  });
  return {
    ...component,
    bugAmount: component.bugAmount - amount,
  };
}

function subtractPointsToPlayer(player, pointsToSubtract) {
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

function addPointsToPlayerBank(player, pointsToAdd, maxPlayerPoints) {
  const totalPoints = getTotalPlayersPoints(player);
  if (totalPoints >= maxPlayerPoints) {
    return player;
  }
  const allowedPointsToAdd = Math.min(
    pointsToAdd,
    maxPlayerPoints - totalPoints,
  );
  return {
    ...player,
    bankPoints: player.bankPoints + allowedPointsToAdd,
  };
}

function addPointsToPlayerBankByHolding(player, pointsToHold) {

  const allowedPointsToHold = Math.min(pointsToHold, player.handPoints);

  return {
    ...player,
    bankPoints: player.bankPoints + allowedPointsToHold,
    handPoints: player.handPoints - allowedPointsToHold,
  };
}

function addPointsToPlayerHand(player, pointsToAdd, maxPlayerPoints) {
  const totalPoints = getTotalPlayersPoints(player);

  if (totalPoints >= maxPlayerPoints) {
    return player;
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

function addStartRoundPointsToPlayers(players, pointsToAdd, maxPlayerPoints) {
  const updatedPlayers = players.map((player) => {
    return addPointsToPlayerHand(player, pointsToAdd, maxPlayerPoints);
  });
  return updatedPlayers;
}

function bankPlayersPointsForCrisisRound(
  players,
  pointsToBank,
  maxPlayerPoints,
) {
  const updatedPlayers = players.map((player) => {
    if (player.handPoints === 0) return player;
    return addPointsToPlayerBankByHolding(
      player,
      pointsToBank,
      maxPlayerPoints,
    );
  });
  return updatedPlayers;
}

function cleanPlayerHandPoints(playerId, players) {
  return players.map((player) => {
    return player.id === playerId ? { ...player, handPoints: 0 } : player;
  });
}

function addComponentToAbsorbedBugs(absorbedBugsArray, componentId) {
    console.info('[ADD_TO_ABSORBED_BUGS]', {
    componentId,
    before: absorbedBugsArray,
    after: [...absorbedBugsArray, componentId],
   });
  return [...absorbedBugsArray, componentId];
}

function removeComponentFromAbsorbedBugs(absorbedBugsArray, componentId) {
  console.info('[REMOVE_FROM_ABSORBED_BUGS]', {
    componentId,
    before: absorbedBugsArray,
    after: absorbedBugsArray.filter((id) => id !== componentId),
   });
  return absorbedBugsArray.filter((id) => id !== componentId);
}

function removePlayerFromRoom(players, playerId){
    const exists = players.some((player) => player.id === playerId);
    if (!exists) {
      throw createError(ERRORS.PLAYER_NOT_FOUND, 404);
    }

    players = players.filter(
      (player) => player.id !== playerId
    );

    return players;
  }
