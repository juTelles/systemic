import { ERRORS } from '../constants/errors.js';
import { CARD_TYPES } from './cards.js';
import { NODE_TYPES } from './components.js';
import { createError } from '../../../server/src/utils/createErrors.js';

export function buildGameConfig({ playerCount = 4, difficulty = 'REGULAR' }) {
  const playerConfig = REGULAR_BY_PLAYERS[playerCount];
  const difficultyConfig = DIFFICULTY_OVERRIDES[difficulty];

  if (!playerConfig) throw createError(ERRORS.INVALID_PLAYERS_COUNT_CONFIG);
  if (!difficultyConfig) throw createError(ERRORS.INVALID_DIFFICULTY_CONFIG);

  const gameConfig = {
    ...playerConfig,
    ...difficultyConfig,
    id: `${difficulty}_${playerCount}P`,
    level: `${difficulty}`,
    playerCountConfig: playerCount,
  };
  return structuredClone(gameConfig);
}

export const getConfigIdGameOrText = (
  playerCount,
  difficulty,
  type = 'text',
  lang = 'pt',
) => {
  const playerCountOption = CONFIG_DEFINITIONS['playerCount'].options.find(
    (option) => option.value === playerCount,
  );
  const difficultyOption = CONFIG_DEFINITIONS['difficulty'].options.find(
    (option) => option.value === difficulty,
  )?.id;

  if (type === 'text') {
    return `${difficultyOption.label[lang]}_${playerCountOption.label[lang]}`;
  }

  return `${difficultyOption.id}_${playerCountOption.id}`;
};

export const CONFIG_DEFINITIONS = {
  playerCount: {
    id: 'playerCount',
    options: [
      { value: 2, id: '2P', label: { pt: '2 Jogadores', en: '2 Players' } },
      { value: 3, id: '3P', label: { pt: '3 Jogadores', en: '3 Players' } },
      { value: 4, id: '4P', label: { pt: '4 Jogadores', en: '4 Players' } },
    ],
  },
  difficulty: {
    id: 'difficulty',
    options: [
      {
        value: 'REGULAR',
        id: 'REGULAR',
        label: { pt: 'Regular', en: 'Regular' },
      },
      {
        value: 'HARD_TWO_CARDS',
        id: 'HARD_TWO_CARDS',
        label: { pt: 'Difícil - 2 Cartas', en: 'Hard - 2 Cards' },
      },
    ],
  },
};

const DIFFICULTY_OVERRIDES = {
  REGULAR: {
    cardsPerTurn: 1,
  },

  HARD_TWO_CARDS: {
    cardsPerTurn: 2,
  },
};

const REGULAR_BY_PLAYERS = {
  4: {
    maxPlayers: 4,
    minPlayers: 4,
    cardsPerTurn: 1,
    bugSaturationLimit: 3,
    taskPoints: {
      maxPlayerPoints: 6,
      maxDonationPerPlayer: 2,
      maxHoldPerPlayer: 2,
      playerPerRound: 3,
      playerPerCrisisRound: 2,
    },
    decisionCosts: {
      RESOLVE_LOCAL_BUG: 2,
      RESOLVE_STRUCTURAL_BUG: 4,
      RESOLVE_REQUESTS_BUG: 6,
      RESOLVE_LOCAL_BUG_TESTED: 1,
      RESOLVE_STRUCTURAL_BUG_TESTED: 2,
      RESOLVE_REQUESTS_BUG_TESTED: 3,
      DEVELOP_TESTS: 6,
      DONATE_POINTS: 2,
      HOLD_POINTS: 2,
    },
    deckComposition: {
      regularCards: [
        {
          cardType: CARD_TYPES.LOCAL,
          componentType: NODE_TYPES.LOCAL,
          quantity: 20,
        },
        {
          cardType: CARD_TYPES.STRUCTURAL,
          componentType: NODE_TYPES.STRUCTURAL,
          quantity: 18,
        },
        {
          cardType: CARD_TYPES.REQUESTS,
          componentType: NODE_TYPES.REQUESTS,
          quantity: 6,
        },
        {
          cardType: CARD_TYPES.POINTS,
          quantity: 7,
        },
      ],
      specialCards: {
        cardType: CARD_TYPES.EVENT,
        quantity: 9,
        quantityByPressureLevel: {
          LOW: 3,
          WARNING: 3,
          CRITICAL: 3,
        },
      },
    },
  },

  3: {
    maxPlayers: 3,
    minPlayers: 3,
    cardsPerTurn: 1,
    bugSaturationLimit: 3,
    taskPoints: {
      maxPlayerPoints: 9,
      maxDonationPerPlayer: 2,
      maxHoldPerPlayer: 2,
      playerPerRound: 3,
      playerPerCrisisRound: 3,
    },
    decisionCosts: {
      RESOLVE_LOCAL_BUG: 2,
      RESOLVE_STRUCTURAL_BUG: 4,
      RESOLVE_REQUESTS_BUG: 6,
      RESOLVE_LOCAL_BUG_TESTED: 1,
      RESOLVE_STRUCTURAL_BUG_TESTED: 2,
      RESOLVE_REQUESTS_BUG_TESTED: 3,
      DEVELOP_TESTS: 6,
      DONATE_POINTS: 2,
      HOLD_POINTS: 2,
    },
    deckComposition: {
      regularCards: [
        {
          cardType: CARD_TYPES.LOCAL,
          componentType: NODE_TYPES.LOCAL,
          quantity: 23,
        },
        {
          cardType: CARD_TYPES.STRUCTURAL,
          componentType: NODE_TYPES.STRUCTURAL,
          quantity: 14,
        },
        {
          cardType: CARD_TYPES.REQUESTS,
          componentType: NODE_TYPES.REQUESTS,
          quantity: 6,
        },
        {
          cardType: CARD_TYPES.POINTS,
          quantity: 9,
        },
      ],
      specialCards: {
        cardType: CARD_TYPES.EVENT,
        quantity: 8,
        quantityByPressureLevel: {
          LOW: 3,
          WARNING: 2,
          CRITICAL: 3,
        },
      },
    },
  },
  2: {
    maxPlayers: 2,
    minPlayers: 2,
    cardsPerTurn: 1,
    bugSaturationLimit: 3,
    taskPoints: {
      maxPlayerPoints: 12,
      maxDonationPerPlayer: 3,
      maxHoldPerPlayer: 3,
      playerPerRound: 4,
      playerPerCrisisRound: 4,
    },
    decisionCosts: {
      RESOLVE_LOCAL_BUG: 2,
      RESOLVE_STRUCTURAL_BUG: 4,
      RESOLVE_REQUESTS_BUG: 6,
      RESOLVE_LOCAL_BUG_TESTED: 1,
      RESOLVE_STRUCTURAL_BUG_TESTED: 2,
      RESOLVE_REQUESTS_BUG_TESTED: 3,
      DEVELOP_TESTS: 6,
      DONATE_POINTS: 3,
      HOLD_POINTS: 3,
    },
    deckComposition: {
      regularCards: [
        {
          cardType: CARD_TYPES.LOCAL,
          componentType: NODE_TYPES.LOCAL,
          quantity: 24,
        },
        {
          cardType: CARD_TYPES.STRUCTURAL,
          componentType: NODE_TYPES.STRUCTURAL,
          quantity: 12,
        },
        {
          cardType: CARD_TYPES.REQUESTS,
          componentType: NODE_TYPES.REQUESTS,
          quantity: 6,
        },
        {
          cardType: CARD_TYPES.POINTS,
          quantity: 11,
        },
      ],
      specialCards: {
        cardType: CARD_TYPES.EVENT,
        quantity: 7,
        quantityByPressureLevel: {
          LOW: 2,
          WARNING: 2,
          CRITICAL: 3,
        },
      },
    },
  },
};

// In 2-player mode, WARNING events are reduced because they can create
// heavy mid-game pressure with fewer turns available for recovery.
// CRITICAL events are kept as structured tension points across the deck.
