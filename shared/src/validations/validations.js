import { ERRORS } from '../constants/errors.js';

export function validateNickname(nickname, options = {}) {
  const { minLength = 1, maxLength = 8 } = options;

  if (typeof nickname !== 'string') {
    return { ok: false, code: ERRORS.INVALID_NICKNAME };
  }

  const normalizedNickname = nickname.trim().toLocaleLowerCase();

  if (
    normalizedNickname.length < minLength ||
    normalizedNickname.length > maxLength
  ) {
    return { ok: false, code: ERRORS.INVALID_NICKNAME_LENGTH };
  }

  return {
    ok: true,
    code: 'SUCCESS',
  };
}

export function validateNicknameAvailability(players, nickname) {
  const normalizedNickname = nickname.trim().toLowerCase();

  const taken = players.some(
    (player) => player.nickname.trim().toLowerCase() === normalizedNickname
  );

  if (taken) {
    return { ok: false, code: ERRORS.NICKNAME_TAKEN };
  }

  return { ok: true };
}
