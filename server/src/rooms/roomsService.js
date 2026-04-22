import { PLAYER_STATUS } from '../../../shared/src/constants/gameEnums.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import { createError } from '../utils/createErrors.js';
import { createRoomsStore } from './roomsStore.js';
import { createInitialState } from '../game/initialState.js';
import { applyAction } from '../game/engine.js';
import crypto from 'crypto';
import { createPlayerState } from '../game/roomStateFactories.js';
import {
  validateNickname,
  validateNicknameAvailability,
} from '../../../shared/src/validations/validations.js';


const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;

export function createRoomsService() {
  const store = createRoomsStore();

  return {
    joinRoom,
    getState,
    applyRoomAction,
    listRooms,
    createRoom,
    leaveRoom,
    cleanRoomState,
  };

  function createRoom() {
    const finalRoomId = store.generateRoomId();

    const existingRoom = store.get(finalRoomId);
    if (existingRoom) {
      throw createError(ERRORS.ROOM_ALREADY_EXISTS);
    }

    const room = store.ensure(finalRoomId, (id) => ({
      id,
      state: createInitialState({ roomId: id }),
    }));
    room.state.meta.rev++;

    return { id: room.id, state: room.state };
  }

  function cleanRoomState(roomId) {
    const room = store.get(roomId);
    if (!room) {
      throw createError(ERRORS.ROOM_NOT_FOUND, 404);
    }
    store.removeRoom(roomId);
    return { ok: true };
  }

  function joinRoom(roomId, nickname) {
    let room = store.get(roomId);

    if (!room) {
      throw createError(ERRORS.ROOM_NOT_FOUND, 404);
    }
    const nicknameValidation = validateNickname(nickname);
    if (!nicknameValidation.ok) {
      return nicknameValidation;
    }

    const availabilityValidation = validateNicknameAvailability(
      room.state.players,
      nickname
    );
    if (!availabilityValidation.ok) {
      return availabilityValidation;
    }

    if (room.state.phase !== 'LOBBY') {
      return { ok: false, code: ERRORS.GAME_ALREADY_STARTED };
    }
    if (room.state.players.length >= MAX_PLAYERS) {
      return { ok: false, code: ERRORS.ROOM_FULL };
    }

    let player = createPlayerState();
    player.id = crypto.randomUUID();
    player.nickname = nickname;
    player.status = PLAYER_STATUS.WAITING;

    room.state.players.push(player);
    room.state.meta.rev += 1;

    return {
      playerId: player.id,
      playerNickname: player.nickname,
      state: room.state,
    };
  }
  //TODO: ADD OK objects to joinRoom normal return.

  function leaveRoom(roomId, playerId) {
    const room = store.get(roomId);

    if (!room) {
      throw createError(ERRORS.ROOM_NOT_FOUND, 404);
    }
    const initialCount = room.state.players.length;

    const exists = room.state.players.some((player) => player.id === playerId);
    if (!exists) {
      throw createError(ERRORS.PLAYER_NOT_FOUND, 404);
    }
    room.state.players = room.state.players.filter(
      (player) => player.id !== playerId
    );
    room.state.meta.rev += 1;

    return {
      removed: true,
      state: room.state,
    };
  }

  function listRooms() {
    return store.getAll().map((room) => ({
      id: room.id,
      playersCount: room.state.players.length,
      players: room.state.players.map((player) => ({
        nickname: player.nickname,
        id: player.id,
        status: player.status,
      })),
      phase: room.state.phase,
    }));
  }

  function getState(roomId) {
    const room = store.get(roomId);
    if (!room) {
      throw createError(ERRORS.ROOM_NOT_FOUND, 404);
    }
    return room.state;
  }

  function applyRoomAction(roomId, action, ctx) {
    const room = store.get(roomId);
    if (!room) {
      throw createError(ERRORS.ROOM_NOT_FOUND, 404);
    }

    let nextState = applyAction(room.state, action, ctx);
    console.log(`Applied action to room ${roomId} with action:`, action, 'and context:', ctx);

    room.state = nextState;
    return room.state;
  }
};
