import { ERRORS } from '../../../../shared/src/constants/errors.js';
import { applyBug, addPointsToPlayerBank } from '../gameHelpers.js';
import { getTotalPlayersPoints } from '../selectors.js';

export function applyCardEffect(roomState, card) {

  const applier = cardAppliers[card.type];

  if (!applier) {
    throw new Error(`No applier function defined for card type: ${card.type}`);
  }
  return applier(roomState, card);
}

const cardAppliers = {
  LOCAL: bugCardApplier,
  STRUCTURAL: bugCardApplier,
  REQUESTS: bugCardApplier,
  POINTS: pointsCardApplier,
  EVENT: eventCardApplier,
};

function bugCardApplier(state, card) {
  const next = structuredClone(state);
  const updatedNodes = { ...next.components.nodes };
  const componentsWithUpdatedNodes = {
    ...next.components,
    nodes: updatedNodes,
  };
  const componentId = card.effect.componentsAffected[0];
  const component = next.components.nodes[componentId];

  updatedNodes[componentId] = applyBug(component, componentsWithUpdatedNodes);
  next.components = {
    ...next.components,
    nodes: updatedNodes,
  };
  return next;
}

function pointsCardApplier(state, card) {
  const next = structuredClone(state);

  const pointsToAdd = card.effect.amount;
  const currentPlayer = next.players.find(
    (player) => player.id === next.flow.currentPlayerId,
  );
  if (!currentPlayer) {
    return {
      ok: false,
      error: ERRORS.CURRENT_PLAYER_NOT_FOUND,
      ...next,
     };
  }

  const totalPoints = getTotalPlayersPoints(currentPlayer);
  if (totalPoints >= next.gameConfig.taskPoints.maxPlayerPoints) {
    return next;
  }

  const updatedCurrentPlayer = addPointsToPlayerBank(
    currentPlayer,
    pointsToAdd,
    next.gameConfig.taskPoints.maxPlayerPoints,
  );
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player,
  );
  return next;
}

export function eventCardApplier(state, card) {
  const next = structuredClone(state);

  const amount = card.effect.amount;
  const affectedComponents = card.effect.componentsAffected;
  const updatedNodes = { ...next.components.nodes };
  const componentsWithUpdatedNodes = {
    ...next.components,
    nodes: updatedNodes,
  };
  affectedComponents.forEach((componentId) => {
    updatedNodes[componentId] = applyBug(
      updatedNodes[componentId],
      componentsWithUpdatedNodes,
      amount,
    );
  });
  next.components = {
    ...next.components,
    nodes: updatedNodes,
  };
  return next;
}
