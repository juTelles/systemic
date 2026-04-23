import { ERRORS } from '../../../../shared/src/constants/errors.js';
import { applyBug, cloneNodesForUpdate , addPointsToPlayerBank } from '../gameHelpers.js';
import { getTotalPlayersPoints } from '../selectors.js';
import { updateAbsorbBugsState } from '../absorbedBugsLogic.js';

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

function bugCardApplier(clonedState, card) {
  const { components, absorbedBugs } = clonedState;
  const componentAffectedId = card.effect.componentsAffected[0];
  const component = clonedState.components.nodes[componentAffectedId];

function bugCardApplier(state, card) {
  const next = structuredClone(state);
  const updatedNodes = { ...next.components.nodes };
  const componentsWithUpdatedNodes = {
    ...next.components,
    nodes: updatedNodes,
  };
  const componentId = card.effect.componentsAffected[0];
  const component = next.components.nodes[componentId];
  const { updatedNodes, updatedComponents } = cloneNodesForUpdate(components);

  updatedNodes[componentAffectedId] = applyBug(component, updatedComponents);
  clonedState.components = {
    ...updatedComponents,
    nodes: updatedNodes,
  };
  return clonedState;
}

function pointsCardApplier(clonedState, card) {
  const pointsToAdd = card.effect.amount;
  const currentPlayer = clonedState.players.find(
    (player) => player.id === clonedState.flow.currentPlayerId,
  );
  if (!currentPlayer) {
    return {
      ok: false,
      error: ERRORS.CURRENT_PLAYER_NOT_FOUND,
      next: clonedState,
    };
  }

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

export function eventCardApplier(clonedState, card) {
  const amount = card.effect.amount;
  const { components } = clonedState;
  const affectedComponents = card.effect.componentsAffected;

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
