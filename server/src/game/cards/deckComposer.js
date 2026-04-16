import { cards as cardsDefinition } from '../../../../shared/src/definitions/cards.js';

export const composeDeck = (composition) => {
  const regularDeck = shuffle(regularDeckComposer(composition.regularCards));
  const specialDeck = specialDeckComposer(composition.specialCards);
  const chunksCount = specialDeck.length;
  const deck = splitIntoChunks(regularDeck, chunksCount, specialDeck, true);
  return deck.flat();
};

const regularDeckComposer = (composition) => {
  const regularCards = [];
  let card;
  for (const current of composition) {
    for (let i = 0; i < current.quantity; i++) {
      card = current.cardType;
      regularCards.push(card);
    }
  }
  return regularCards;
};

const specialDeckComposer = (composition) => {
  const { quantity, quantityByPressureLevel } = composition;

  const critical = getEventsCards('CRITICAL', quantityByPressureLevel.CRITICAL);
  const warning = getEventsCards('WARNING', quantityByPressureLevel.WARNING);
  const low = getEventsCards('LOW', quantityByPressureLevel.LOW);
  let deck = [...warning, ...low];

  deck = shuffle(deck).slice(0, quantity);
  const eventsDeck = splitIntoChunks(deck, critical.length, critical);
  return eventsDeck.flat();
};

const getEventsCards = (pressureLevel, amount) => {
  const cards = [
    ...cardsDefinition.special.eventCards.byPressureLevel[pressureLevel],
  ];
  if (amount > cards.length) {
    cards.push(...cards);
  }
  const shuffledCards = shuffle(cards);
  return shuffledCards.slice(0, amount);
};

function splitIntoChunks(
  cards,
  chunkCount,
  injectedItems = [],
  shouldShuffle = false,
) {
  const baseSize = Math.floor(cards.length / chunkCount);
  let remainder = cards.length % chunkCount;

  const chunks = [];
  let start = 0;

  for (let i = 0; i < chunkCount; i++) {
    const extra = remainder > 0 ? 1 : 0;
    const size = baseSize + extra;

    let chunk = cards.slice(start, start + size);

    if (injectedItems[i] !== undefined) {
      chunk.push(injectedItems[i]);
    }
    if (shouldShuffle) {
      chunk = shuffle(chunk);
    }
    chunks.push(chunk);
    start += size;

    if (remainder > 0) remainder--;
  }
  return chunks;
}
const shuffle = (cards) => {
  const shuffledCards = [...cards];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
};
