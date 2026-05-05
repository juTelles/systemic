# State Synchronization

Systemic uses HTTP polling to keep clients synchronized with the backend state.

The backend is the authoritative source of truth. Clients do not modify the game state directly; they send actions to the server and receive updated state snapshots through polling.

## Why polling?

WebSocket communication was initially considered, but HTTP polling was chosen because Systemic is a turn-based game and does not require millisecond-level real-time updates.

Polling also reduces deployment complexity and avoids potential WebSocket restrictions in corporate networks.

## Polling hooks

Systemic currently uses two polling hooks:

- `useRoomsPolling`: used in the lobby to keep the list of available rooms updated.
- `useStatePolling`: used during the match to keep the current room state synchronized.

## Rooms polling

`useStatePolling` runs while the player is in the lobby.

It periodically requests the list of available rooms from the backend and updates the lobby interface.

This allows players to see newly created rooms or changes in room availability.

## State polling

`useRoomsPolling` runs during the match.

It periodically requests the current state of the player’s room from the backend.

The room state includes information such as:

- players;
- current turn;
- current step;
- board state;
- Bugs;
- tests;
- Task Points;
- cards;
- system health;
- game logs;
- win/loss conditions.

## Revision control

Each room state has a revision number (`rev`).

When the room state changes, the backend increments the revision. The client sends its current revision when requesting the room state.

If the client already has the latest revision, the backend can avoid sending a full state update.

If the client revision is outdated, the backend returns the updated state.

This helps reduce unnecessary updates and prevents older states from being applied over newer ones.

## Session handling

The polling flow is also related to session validation.

If a player is no longer part of a room, or if the room no longer exists, the client can detect this through polling responses and clean the local session when appropriate.

To avoid removing players due to temporary inconsistencies, session cleanup is handled by a guard that validates the issue before clearing the local session.

## Limitations

Polling is simpler and suitable for the current prototype, but it may not be ideal for games that require instant real-time interactions.

Future versions could evaluate WebSocket-based synchronization if the game evolves toward more real-time mechanics.