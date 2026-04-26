import { ERRORS } from '../../../shared/src/constants/errors.js';

export const errorMessages = {
  [ERRORS.ROOM_NOT_FOUND]: {
    pt: 'Sala não encontrada',
    en: 'Room not found',
  },

  [ERRORS.ROOM_FULL]: {
    pt: 'A sala já está cheia',
    en: 'The room is already full',
  },

  [ERRORS.ROOM_ALREADY_EXISTS]: {
    pt: 'Esta sala já existe',
    en: 'This room already exists',
  },

  [ERRORS.INVALID_ROOM_ID]: {
    pt: 'Código da sala inválido',
    en: 'Invalid room code',
  },

  [ERRORS.INVALID_NICKNAME]: {
    pt: 'Nickname inválido',
    en: 'Invalid nickname',
  },

  [ERRORS.INVALID_NICKNAME_LENGTH]: {
    pt: 'O nickname deve ter entre 1 e 8 caracteres.',
    en: 'Nickname must be between 1 and 8 characters.',
  },

  [ERRORS.INVALID_NICKNAME_EMPTY]: {
    pt: 'Digite um nickname',
    en: 'Please enter a nickname',
  },

  [ERRORS.INVALID_NICKNAME_CHARACTERS]: {
    pt: 'O nickname contém caracteres inválidos.',
    en: 'Nickname contains invalid characters.',
  },

  [ERRORS.NICKNAME_TAKEN]: {
    pt: 'Este nickname já está em uso na sala.',
    en: 'This nickname is already being used in the room.',
  },

  [ERRORS.PLAYER_NOT_FOUND]: {
    pt: 'Jogador não encontrado',
    en: 'Player not found',
  },

  [ERRORS.GAME_ALREADY_STARTED]: {
    pt: 'A partida já começou.',
    en: 'The match has already started.',
  },

  [ERRORS.GAME_NOT_IN_LOBBY]: {
    pt: 'A partida não está mais no lobby.',
    en: 'The match is no longer in the lobby.',
  },

  [ERRORS.INVALID_ACTION]: {
    pt: 'Ação inválida',
    en: 'Invalid action.',
  },

  [ERRORS.INVALID_DECISION]: {
    pt: 'Decisão inválida',
    en: 'Invalid decision.',
  },

  [ERRORS.UNAUTHORIZED_ACTION]: {
    pt: 'Você não pode realizar esta ação.',
    en: 'You cannot perform this action.',
  },

  [ERRORS.REQUIRES_COMPONENT]: {
    pt: 'Nenhum Componente foi selecionado.',
    en: 'No component was selected.',
  },

  [ERRORS.REQUIRES_TARGET]: {
    pt: 'Nenhum jogador foi selecionado.',
    en: 'No player was selected.',
  },

  [ERRORS.REQUIRES_AMOUNT]: {
    pt: 'Quantidade não informada.',
    en: 'No amount provided.',
  },

  [ERRORS.AMOUNT_MUST_BE_POSITIVE]: {
    pt: 'Quantidade inválida.',
    en: 'Invalid amount.',
  },

  [ERRORS.COMPONENT_MUST_HAVE_BUG]: {
    pt: 'O Componente selecionado não possui bugs.',
    en: 'The selected component has no bugs.',
  },

  [ERRORS.COMPONENT_MUST_NOT_HAVE_TESTS]: {
    pt: 'O Componente selecionado já possui testes.',
    en: 'The selected component already has tests.',
  },

  [ERRORS.COMPONENT_MUST_HAVE_TESTS]: {
    pt: 'O Componente selecionado não possui testes.',
    en: 'The selected component has no tests.',
  },

  [ERRORS.HOLD_WITHIN_TURN_LIMIT]: {
    pt: 'Limite de guardar por turno excedido.',
    en: 'Hold limit by turn exceeded.',
  },

  [ERRORS.DONATION_WITHIN_TURN_LIMIT]: {
    pt: 'Limite de doação por turno excedido.',
    en: 'Donation limit by turn exceeded.',
  },

  [ERRORS.TARGET_PLAYER_TOTAL_WITHIN_LIMIT]: {
    pt: 'Limite total do jogador excedido.',
    en: "Player's total limit exceeded.",
  },

  [ERRORS.HAS_POINTS_FOR_DONATION]: {
    pt: 'Pontos insuficientes.',
    en: 'Insufficient points.',
  },

  [ERRORS.HAS_HAND_POINTS_FOR_HOLD]: {
    pt: 'Pontos insuficientes na mão.',
    en: 'Insufficient points in hand.',
  },

  [ERRORS.HAS_POINTS_FOR_OPERATION_COST]: {
    pt: 'Pontos insuficientes.',
    en: 'Insufficient points.',
  },

  [ERRORS.DECISION_ERROR]: {
    pt: 'Ocorreu um erro inesperado ao aplicar a decisão, por favor, tente novamente.',
    en: 'An unexpected error occurred while applying the decision, please try again.',
  },

  [ERRORS.APPLY_CARD_EFFECT_ERROR]: {
    pt: 'Ocorreu um erro ao aplicar o efeito da carta.',
    en: 'An error occurred while applying the card effect.',
  },

  [ERRORS.DRAW_CARD_ERROR]: {
    pt: 'Ocorreu um erro ao comprar a carta.',
    en: 'An error occurred while drawing the card.',
  },
  [ERRORS.FINISH_DECISION_ERROR]: {
    pt: 'Ocorreu um erro ao finalizar a etapa de decisão, por favor, tente novamente.',
    en: 'An unexpected error occurred while finishing the decision step, please try again.',
  },
  [ERRORS.CANNOT_LEAVE_DURING_OWN_TURN]: {
    pt: 'Você não pode sair durante o seu turno. Termine seu turno e tente novamente.',
    en: 'You cannot leave during your turn. Finish your turn and try again.',
  },
  [ERRORS.INTERNAL_ERROR]: {
    pt: 'Ocorreu um erro inesperado.',
    en: 'An unexpected error occurred.',
  },
};

export function getErrorMessage(code, lang = 'pt') {
  return (
    errorMessages[code]?.[lang] ||
    errorMessages[code]?.pt ||
    errorMessages[ERRORS.INTERNAL_ERROR]?.[lang] ||
    errorMessages[ERRORS.INTERNAL_ERROR]?.pt
  );
}
