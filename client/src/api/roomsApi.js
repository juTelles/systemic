import { apiFetch } from "./apiClient";

export async function joinRoom(roomId, nickname) {
  return apiFetch(`/rooms/${roomId}/join`, {
    method: "POST",
    body: JSON.stringify({ nickname })
  });
}

export async function leaveRoom(roomId, playerId) {
  return apiFetch(`/rooms/${roomId}/leave`, {
    method: "POST",
    body: JSON.stringify({ playerId })
  });
}

export async function getRoomList() {
  const res = await apiFetch(`/rooms`);
  return res?.roomsList || [];
}

export async function createRoom() {
  return apiFetch(`/rooms/createRoom`, {
    method: "POST",
  });
}

export async function getRoomState(roomId, rev) {
  const result = await apiFetch(`/rooms/${roomId}/state?rev=${rev}`);
  return result;
}

export async function sendAction(roomId, senderId, type, payload = {}) {
console.log(`Sending action to room ${roomId} from sender ${senderId} with type ${type} and payload:`, payload);
  return apiFetch(`/rooms/${roomId}/action`, {
    method: "POST",
    body: JSON.stringify({
      senderId,
      action: {
        type,
        payload,
      },
    }),
  });
}
// TODO: investigate > sendAction wraps game-specific fields under action.payload,
// but the server engine reads fields like action.phase / action.decision.* directly
// (not under payload). As-is, actions like SET_PHASE / APPLY_DECISION will be ignored
// or mis-processed. Either flatten the request so the server receives the expected shape,
// or update the engine to consistently read from action.payload.
