import { ERRORS } from '../../../../shared/src/constants/errors.js';
import { applyBug, cloneNodesForUpdate, addPointsToPlayerBank } from '../gameHelpers.js';
import { getTotalPlayersPoints } from '../selectors.js';
import { updateAbsorbBugsState } from '../absorbedBugsLogic.js';
import { createError } from '../../utils/createErrors.js';

export function applyCardEffect(roomState, card) {
  const applyCard = cardAppliers[card.type];
  console.info('[APPLY_CARD]', {
  roomId: roomState.meta?.roomId,
  rev: roomState.meta?.rev,
  step: roomState.flow?.step?.name,
  cardDrawId: card.drawId,
  cardType: card.type,
  cardEffect: card.effect,
  });
  if (!applyCard) {
    throw createError(ERRORS.CARD_TYPE_NOT_FOUND);
  }
  return applyCard(roomState, card);
}

const cardAppliers = {
  LOCAL: applyBugCard,
  STRUCTURAL: applyBugCard,
  REQUESTS: applyBugCard,
  POINTS: applyPointsCard,
  EVENT: applyEventCard,
};

function applyBugCard(clonedState, card) {
  const { components, absorbedBugs } = clonedState;
  const componentAffectedId = card.effect.componentsAffected[0];
  const component = clonedState.components.nodes[componentAffectedId];

  if (!component) throw createError(ERRORS.COMPONENT_NOT_FOUND);

  if (component.hasTests === true) {
    const absorbBugResult = updateAbsorbBugsState(absorbedBugs, component);
    clonedState.absorbedBugs = absorbBugResult.absorbedBugs;

    if (absorbBugResult.wasAbsorbed) {
      return clonedState;
    }
  }
  const { updatedNodes, updatedComponents } = cloneNodesForUpdate(components);

  updatedNodes[componentAffectedId] = applyBug(component, updatedComponents);
  clonedState.components = {
    ...updatedComponents,
    nodes: updatedNodes,
  };
  return clonedState;
}

function applyPointsCard(clonedState, card) {
  const pointsToAdd = card.effect.amount;
  const currentPlayer = clonedState.players.find(
    (player) => player.id === clonedState.flow.currentPlayerId,
  );
  if (!currentPlayer) throw createError(ERRORS.CURRENT_PLAYER_NOT_FOUND);

  const totalPoints = getTotalPlayersPoints(currentPlayer);
  if (totalPoints >= clonedState.gameConfig.taskPoints.maxPlayerPoints) {
    return clonedState;
  }

  const updatedCurrentPlayer = addPointsToPlayerBank(
    currentPlayer,
    pointsToAdd,
    clonedState.gameConfig.taskPoints.maxPlayerPoints,
  );
  clonedState.players = clonedState.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player,
  );
  return clonedState;
}

export function applyEventCard(clonedState, card) {
  const amount = card.effect.amount;
  const { components } = clonedState;
  const affectedComponents = card.effect.componentsAffected;

  if (!affectedComponents || !Array.isArray(affectedComponents)) {
    throw createError(ERRORS.INVALID_CARD);
  }

  const { updatedNodes, updatedComponents } = cloneNodesForUpdate(
    components,
  );

  affectedComponents.forEach((componentId) => {
    updatedNodes[componentId] = applyBug(
      updatedNodes[componentId],
      updatedComponents,
      amount,
    );
  });

  clonedState.components = {
    ...updatedComponents,
    nodes: updatedNodes,
  };
  return clonedState;
}
