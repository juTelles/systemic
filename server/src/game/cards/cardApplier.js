import { ERRORS } from '../../../../shared/src/constants/errors.js';
import { applyBugs, addPointsToPlayerBank } from '../gameHelpers.js';
import { getTotalPlayersPoints } from '../selectors.js';
import { updateAbsorbBugsState } from '../absorbedBugsLogic.js';
import { createError } from '../../utils/createErrors.js';
import { addGameLog } from '../gameLog.js';

export function applyCardEffect(roomState, card) {
  const applyCard = cardAppliers[card.type];
  if (!applyCard) {
    throw createError(ERRORS.CARD_TYPE_NOT_FOUND);
  }

  roomState.gameLog = addGameLog(roomState, {
    type: '[APPLIED_CARD]',
    cardDrawId: card.drawId,
    cardType: card.type,
    cardEffect: card.effect,
  });

  return applyCard(roomState, card);
}

const cardAppliers = {
  LOCAL: applyBugCard,
  STRUCTURAL: applyBugCard,
  REQUESTS: applyBugCard,
  POINTS: applyPointsCard,
  EVENT: applyEventCard,
};

function applyBugCard(state, card) {
  const { absorbedBugs } = state;
  const componentAffectedId = card.effect.componentsAffected[0];
  const component = state.components.nodes[componentAffectedId];

  if (!component) throw createError(ERRORS.COMPONENT_NOT_FOUND);

  if (component.hasTests === true) {
    const absorbBugResult = updateAbsorbBugsState(absorbedBugs, component);
    state.absorbedBugs = absorbBugResult.absorbedBugs;

    state.gameLog = addGameLog(state, {
      type: 'ABSORBED_BUGS',
      componentId: component.id,
      absorbed: absorbBugResult.wasAbsorbed,
      before: absorbedBugs,
      after: absorbBugResult.absorbedBugs,
    });

    if (absorbBugResult.wasAbsorbed) {
      return state;
    }
  }

  const { nodes, log } = applyBugs(
    [componentAffectedId],
    state.components.nodes,
  );

  state.gameLog = addGameLog(state, {
    type: '[BUGS_APPLIED]',
    reason: 'BUG_CARD_EFFECT',
    appliedBugs: log.bugsApplied,
    amount: 1,
    propagated: log.componentsPropagated,
  });
  state.components.nodes = nodes;
  return state;
}

function applyPointsCard(state, card) {
  const pointsToAdd = card.effect.amount;

  const updatedPlayers = state.players.map((player) =>
    addPointsToPlayerBank(
      player,
      pointsToAdd,
      state.gameConfig.taskPoints.maxPlayerPoints,
    ),
  );
  state.gameLog = addGameLog(state, {
    type: '[POINTS_APPLIED]',
    reason: 'POINTS_CARD_EFFECT',
    playersBefore: state.players,
    playersAfter: updatedPlayers,
    amount: pointsToAdd,
  });
  state.players = updatedPlayers;
  return state;
}

export function applyEventCard(state, card) {
  const amount = card.effect.amount;
  const affectedComponents = card.effect.componentsAffected;

  if (!affectedComponents || !Array.isArray(affectedComponents)) {
    throw createError(ERRORS.INVALID_CARD);
  }

  const { nodes, log } = applyBugs(
    affectedComponents,
    state.components.nodes,
    amount,
  );

  state.gameLog = addGameLog(state, {
    type: '[BUGS_APPLIED]',
    reason: 'EVENT_CARD_EFFECT',
    appliedBugs: log.bugsApplied,
    amount: amount,
    propagated: log.componentsPropagated,
  });

  state.components.nodes = nodes;
  return state;
}
