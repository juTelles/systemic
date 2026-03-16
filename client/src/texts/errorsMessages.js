import { ERRORS } from "../../../shared/src/constants/errors.js";

export const errorMessages = {
  pt: {
    [ERRORS.ROOM_NOT_FOUND]: "Sala não encontrada.",
    [ERRORS.ROOM_FULL]: "A sala já está cheia.",
    [ERRORS.ROOM_ALREADY_EXISTS]: "Esta sala já existe.",

    [ERRORS.INVALID_ROOM_ID]: "Código da sala inválido.",

    [ERRORS.INVALID_NICKNAME]: "Nickname inválido.",
    [ERRORS.INVALID_NICKNAME_LENGTH]: "O nickname deve ter entre 1 e 8 caracteres.",
    [ERRORS.INVALID_NICKNAME_EMPTY]: "Digite um nickname.",
    [ERRORS.INVALID_NICKNAME_CHARACTERS]: "O nickname contém caracteres inválidos.",
    [ERRORS.NICKNAME_TAKEN]: "Este nickname já está em uso na sala.",

    [ERRORS.PLAYER_NOT_FOUND]: "Jogador não encontrado.",

    [ERRORS.GAME_ALREADY_STARTED]: "A partida já começou.",
    [ERRORS.GAME_NOT_IN_LOBBY]: "A partida não está mais no lobby.",

    [ERRORS.INVALID_ACTION]: "Ação inválida.",
    [ERRORS.UNAUTHORIZED_ACTION]: "Você não pode realizar esta ação.",

    [ERRORS.INTERNAL_ERROR]: "Ocorreu um erro inesperado."
  },

  en: {
    [ERRORS.ROOM_NOT_FOUND]: "Room not found.",
    [ERRORS.ROOM_FULL]: "The room is already full.",
    [ERRORS.ROOM_ALREADY_EXISTS]: "This room already exists.",

    [ERRORS.INVALID_ROOM_ID]: "Invalid room code.",

    [ERRORS.INVALID_NICKNAME]: "Invalid nickname.",
    [ERRORS.INVALID_NICKNAME_LENGTH]: "Nickname must be between 1 and 8 characters.",
    [ERRORS.INVALID_NICKNAME_EMPTY]: "Please enter a nickname.",
    [ERRORS.INVALID_NICKNAME_CHARACTERS]: "Nickname contains invalid characters.",
    [ERRORS.NICKNAME_TAKEN]: "This nickname is already being used in the room.",

    [ERRORS.PLAYER_NOT_FOUND]: "Player not found.",

    [ERRORS.GAME_ALREADY_STARTED]: "The match has already started.",
    [ERRORS.GAME_NOT_IN_LOBBY]: "The match is no longer in the lobby.",

    [ERRORS.INVALID_ACTION]: "Invalid action.",
    [ERRORS.UNAUTHORIZED_ACTION]: "You cannot perform this action.",

    [ERRORS.INTERNAL_ERROR]: "An unexpected error occurred."
  }
};

export function getErrorMessage(code, lang = "pt") {
  return (
    errorMessages[lang]?.[code] ||
    errorMessages.pt[code] ||
    errorMessages[lang]?.[ERRORS.INTERNAL_ERROR] ||
    errorMessages.pt[ERRORS.INTERNAL_ERROR]
  );
}