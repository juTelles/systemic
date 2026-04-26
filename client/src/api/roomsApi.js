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

export async function deleteRoom(roomId) {
  return apiFetch(`/rooms/${roomId}/deleteRoom`, {
    method: "POST",
  });
}

export async function getRoomState(roomId, rev) {
  const result = await apiFetch(`/rooms/${roomId}/state?rev=${rev}`);
  return result;
}

export async function sendAction(roomId, type, payload = {}) {
  return apiFetch(`/rooms/${roomId}/action`, {
    method: "POST",
    body: JSON.stringify({
      action: {
        type,
        payload
      },
    }),
  });
}
