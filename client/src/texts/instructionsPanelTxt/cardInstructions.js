import { getCardText } from '../cardsTxt.js';

export function buildCardInstruction(
  { currentCard, playerNickname, saturationLimit, maxPointsPerPlayer },
  textType,
  lang = 'pt',
) {
  if (!currentCard) return null;

  const cardType = getCardType[currentCard.type];

  const builder = instructionBuilders[cardType];
  if (!builder) return null;

  if (textType === 'title') {
    return builder.title?.[lang] || null;
  }

  const cardTitle = getCardText(currentCard, 'title', lang) || '';
  const cardDescription = getCardText(currentCard, 'description', lang) || '';

  return (
    builder.description?.[lang]?.({
      playerNickname,
      cardTitle,
      cardDescription,
      saturationLimit,
      maxPointsPerPlayer,
    }) || null
  );
}

const getCardType = {
  LOCAL: 'BUG',
  STRUCTURAL: 'BUG',
  REQUESTS: 'BUG',
  POINTS: 'POINTS',
  EVENT: 'EVENT',
};

const instructionBuilders = {
  BUG: {
    title: {
      pt: `Carta de Bug Local`,
      en: `Local Bug card`,
    },
    description: {
      pt: ({ cardTitle, cardDescription, saturationLimit }) =>
        `Pressione APLICAR CARTA para aplicar: 1 ${cardTitle} no Componente ${cardDescription}.\n\nComponentes com Testes absorvem a primeira Carta de Bug; na segunda, o Bug é aplicado.\nOs Bugs Absorvidos ficam listados no painel abaixo do baralho.\n\nLembre-se: O limite de saturação dos Componentes é de ${saturationLimit} Bugs. Componentes Locais e Estruturais saturados propagam 1 Bug aos componentes pais e zeram.\nComponentes de Requisições saturados propagam 1 Bug aos Componentes filhos no fim da rodada e acumulam Bugs infinitamente.`,
      en: ({ cardTitle, cardDescription, saturationLimit }) =>
        `Press APPLY CARD to apply: 1 ${cardTitle} to the ${cardDescription} Component.\n\nComponents with Tests absorb the first Bug Card; on the second, the Bug is applied.\nAbsorbed Bugs are listed in the panel below the deck.\n\nRemember: The saturation limit of Components is ${saturationLimit} Bugs. Saturated Local and Structural Components propagate 1 Bug to parent components and reset to zero.\nSaturated Request Components propagate 1 Bug to child Components at the end of the round and accumulate Bugs infinitely.`,
    },
  },
  POINTS: {
    title: {
      pt: `Carta de Pontos de Tarefa`,
      en: `Task Points card`,
    },
    description: {
      pt: ({ playerNickname, cardDescription, maxPointsPerPlayer }) =>
        `Parabéns ${playerNickname}! ${cardDescription}. Seu bônus será creditado no seu banco.\n\nLembre-se: Cada membro do Time pode ter no máximo ${maxPointsPerPlayer} pontos. Os pontos da carta só serão aplicados até esse limite.`,
      en: ({ playerNickname, cardDescription, maxPointsPerPlayer }) =>
        `Congratulations ${playerNickname}! ${cardDescription}. Your bonus will be credited to your bank.\n\nRemember: Each Team member can have a maximum of ${maxPointsPerPlayer} points. The card will only be applied up to this limit.`,
    },
  },
  EVENT: {
    title: {
      pt: `Carta de Evento`,
      en: `Event card`,
    },
    description: {
      pt: ({ cardTitle, cardDescription, saturationLimit }) =>
        `Pressione APLICAR CARTA para aplicar:\n${cardTitle.toUpperCase()}\n${cardDescription}.\n\nComponentes Testados não absorvem Bugs de Cartas de Evento.\n\nLembre-se: O limite de saturação dos Componentes é de ${saturationLimit} Bugs. Componentes Locais e Estruturais saturados propagam 1 Bug aos componentes pais e zeram.\nComponentes de Requisições saturados propagam 1 Bug aos Componentes filhos no fim da rodada e acumulam Bugs infinitamente.`,
      en: ({ cardTitle, cardDescription, saturationLimit }) =>
        `Press APPLY CARD to apply:\n${cardTitle.toUpperCase()}\n${cardDescription}.\n\nTested Components do not absorb Bugs from Event Cards.\n\nRemember: The saturation limit of Components is ${saturationLimit} Bugs. Saturated Local and Structural Components propagate 1 Bug to parent components and reset to zero.\nSaturated Request Components propagate 1 Bug to child Components at the end of the round and accumulate Bugs infinitely.`,
    },
  },
};
