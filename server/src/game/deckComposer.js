import { cards } from '../../../shared/src/definitions/cards.js';
import { components } from '../../../shared/src/definitions/components.js';

export const composeDeck = (composition) => {
  const deck = [];
  let card;
  let index = 1;
  for (const current of composition) {
    for (let i = 0; i < current.quantity; i++) {
      if (current.cardType === 'BUG') {
        card = composeCard(current.cardType, index, current.componentType);
      } else {
        card = composeCard(current.cardType, index);
      }
      deck.push(card);
      index++;
    }
  }
  return deck;
};
// TODO: Refactor this function to be more modular and testable, maybe creating separate functions for each card type composition

export function composeCard(type, cardId, componentType) {
  const card = {};
  card.id = cardId;
  card.type = type;
  switch (card.type) {
    case 'POINTS':
      card.effect = 'ADD_POINTS';
      card.title = 'Pontos de Tarefa';
      card.pointsWon = Math.floor(Math.random() * 2) + 1; // 1 or 2 points
      card.description = `Você ganhou Pontos ${card.pointsWon} de Tarefa adicionais!`;
      return card;
    case 'EVENT':
      const cardDefinition =
      cards.EVENT[Math.floor(Math.random() * cards.EVENT.length)];
      if (!cardDefinition) {
        throw new Error(`Event definition not found`);
      }
      card.effect = cardDefinition.effect;
      card.description = cardDefinition.descriptionPT;
      card.componentsAffected = cardDefinition.componentsAffected;
      card.title = cardDefinition.titlePT;
      return card;
    case 'BUG':
      const componentDefinition = components.byType[componentType];
      if (
        !Array.isArray(componentDefinition) ||
        componentDefinition.length === 0
      ) {
        throw new Error(
          `Component definition not found or invalid for card id: ${card.id}`
        );
      }
      const cardComponent =
        componentDefinition[
          Math.floor(Math.random() * componentDefinition.length)
        ];
      card.effect = 'BUG_COMPONENT';
      card.componentsAffected = [cardComponent];
      card.title = components.nodes[cardComponent].namePT;
      card.componentId = cardComponent;
      card.bugType = componentType;
      return card;
    default:
      throw new Error(`Invalid card type: ${type}`);
  }
}
// TODO: Add error handling for invalid card types and refactor the random selection logic to be more robust and testable