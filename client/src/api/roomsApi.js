import { apiFetch } from "./apiClient";

export async function joinRoom(roomId, nickname) {
  console.log(`Joining room ${roomId} with nickname ${nickname}`);
  return apiFetch(`/rooms/${roomId}/join`, {
    method: "POST",
    body: JSON.stringify({ nickname })
  });
}

export async function leaveRoom(roomId, playerId) {
  console.log(`Leaving room ${roomId} with playerId ${playerId}`);
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
  const res = await fetch(`/api/rooms/${roomId}/state?rev=${rev}`);
  return res.json();
}

export async function sendAction(roomId, playerId, action) {
  return apiFetch(`/rooms/${roomId}/action`, {
    method: "POST",
    body: JSON.stringify({ playerId, action })
  });
}