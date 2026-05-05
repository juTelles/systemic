# API Overview

Systemic uses a REST API to manage rooms, players, game actions, and state synchronization.

All frontend requests are made through the `apiFetch` helper, which prefixes routes with `/api`, sends JSON requests when needed, parses JSON responses, and normalizes API errors.

The backend is the authoritative source of truth. Clients send requests to the server, and actions are processed through the backend engine. All authoritative game state changes happen within the engine-controlled flow.

## Rooms

### `GET /api/rooms`

Returns the list of available rooms.

Client function: `getRoomList()`

### `POST /api/rooms/createRoom`

Creates a new room.

Client function: `createRoom()`

### `POST /api/rooms/:roomId/join`

Adds a player to an existing room.

Client function: `joinRoom(roomId, nickname)`

### `POST /api/rooms/:roomId/leave` _(legacy)_

This endpoint is not currently supported by the backend and should not be used.

To leave a room, use the action-based flow instead:

Client function: `sendAction(roomId, "LEAVE_ROOM", payload)`

### `POST /api/rooms/:roomId/deleteRoom`

Deletes or clears a room from the server.

Client function: `deleteRoom(roomId)`

## Game State

### `GET /api/rooms/:roomId/state?rev=:rev`

Returns the current state of a room.

Client function: `getRoomState(roomId, rev)`

The `rev` query parameter is used by the state polling flow. It allows the backend to compare the client revision with the current room revision and avoid unnecessary state updates when nothing has changed.

## Actions

### `POST /api/rooms/:roomId/action`

Sends a player or system action to the backend.

Client function: `sendAction(roomId, type, payload)`

Actions are processed through the backend engine, and all authoritative game state changes happen within the engine-controlled flow.

## Notes

The current API uses REST endpoints with HTTP polling for synchronization.

Some endpoints use `POST` for operations that could be represented with other HTTP methods. This documentation reflects the current implementation of the prototype.
