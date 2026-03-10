import { createRoomsStore } from "./roomsStore.js";
import { createInitialState } from "../game/initialState.js";
import { applyAction } from "../game/engine.js";
import crypto from "crypto";

const MAX_PLAYERS = 4;

export function createRoomsService() {
  const store = createRoomsStore();

  return {
    joinRoom,
    getState,
    applyRoomAction,
    listRooms,
    createRoom,
    leaveRoom
  };


  function createRoom() {
    const roomId = store.generateRoomId();

    const room = store.ensure(roomId, (id) => ({
      id,
      state: createInitialState({ roomId: id })
    }));

    room.state.rev++;

    return { id: room.id, state: room.state };
  }

  function joinRoom(roomId, nickname) {
    let room = store.get(roomId);

    if (!room) {
      room = createRoom(roomId);
    }

    if (room.state.players.length >= MAX_PLAYERS) {
      throw new Error("Room is full");
    }

    const player = {
      id: crypto.randomUUID(),
      nickname
    };
    room.state.players.push(player);

    return {
      playerId: player.id,
      state: room.state
    };
  }

  function leaveRoom(roomId, playerId) {
    const room = store.get(roomId);

    if (!room) {
      throw new Error("Room not found");
    }
    const initialCount = room.state.players.length;
    room.state.players = room.state.players.filter(p => p.id !== playerId);

    return room.state.players.length < initialCount;
  }

  function listRooms() {
    return store.getAll().map(room => ({
      id: room.id,
      playersCount: room.state.players.length,
      players: room.state.players.map(player => ({ nickname: player.nickname, id: player.id })),
      phase: room.state.phase
    }));
  }

  function getState(roomId) {
    const room = store.get(roomId);
    return room ? room.state : null;
  }

  function applyRoomAction(roomId, action, ctx) {
    const room = store.get(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    const nextState = applyAction(room.state, action, ctx);

    room.state = nextState;

    return nextState;
  }
}