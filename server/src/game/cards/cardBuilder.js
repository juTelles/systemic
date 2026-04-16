import { cards } from '../../../../shared/src/definitions/cards.js';
import { components } from '../../../../shared/src/definitions/components.js';

export function buildCard(cardKey, drawnCardId) {
  const cardType = resolveCardType(cardKey);
  const builder = cardBuilders[cardType];

  if (!builder) {
    throw new Error(`No builder function defined for card type: ${cardType}`);
  }

  return builder(cardKey, drawnCardId);
}

const cardBuilders = {
  LOCAL: bugCardBuilder,
  STRUCTURAL: bugCardBuilder,
  REQUESTS: bugCardBuilder,
  POINTS: pointsCardBuilder,
  EVENT: eventCardBuilder,
};

function resolveCardType(cardKey) {
  if (cards.special.eventCards[cardKey]) return 'EVENT';
  return cardKey;
}

function bugCardBuilder(type, drawnCardId) {
  const nodesByType = components.byType[type];
  const cardNodeId = nodesByType[Math.floor(Math.random() * nodesByType.length)];
  return {
    drawId: drawnCardId,
    type: type,
    effect: {
      id: 'APPLY_BUG',
      componentsAffected: [cardNodeId],
      amount: null,
    },
  };
}

function pointsCardBuilder(type, drawnCardId) {
  const pointsWon = Math.floor(Math.random() * 2) + 1; // 1 or 2 points
  return {
    drawId: drawnCardId,
    type: type,
    effect: {
      id: 'ADD_POINTS',
      componentsAffected: null,
      amount: pointsWon,
    },
  };
}

function eventCardBuilder(eventId, drawnCardId) {
  const event = cards.special.eventCards[eventId];
  return {
    drawId: drawnCardId,
    type: 'EVENT',
    eventId: eventId,
    effect: {
      id: event.effect.id,
      componentsAffected: [...event.effect.componentsAffected],
      amount: event.effect.amount,
    },
  };
}
