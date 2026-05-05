# Architecture

Systemic is implemented as a web-based multiplayer application using a client-server architecture.

The backend acts as the authoritative server and is responsible for maintaining the official game state, validating player actions, applying game rules, and returning updated state snapshots to the clients.

The frontend does not directly change the game state. It only sends player actions to the backend and renders the state received from the server.

## Main components

- `client/`: React + Vite frontend application.
- `server/`: Node.js + Express backend application.
- `shared/`: shared constants, action types, protocols, and definitions used by both client and server.

## Authoritative server

The server is the single source of truth for the game state.

This approach was adopted to reduce inconsistencies between players and to keep the game rules centralized. Every relevant action is validated and applied by the backend before the updated state is made available to the clients.

## Rooms

Matches are organized into rooms. Each room contains its own players, configuration, game state, revision number, and current flow state.

Players join a room and interact with the same shared game state during the match.

## Synchronization

Synchronization is currently implemented through HTTP polling.

There are two main polling flows:

- Rooms polling: keeps the lobby updated with the available rooms.
- State polling: keeps the current match state updated during gameplay.

Each room state has a revision number. When the state changes, the revision is updated. This allows the client to avoid applying outdated states over newer ones.

## Game flow

The game flow is organized around actions and steps.

Actions represent events triggered by players or by the system. Steps represent the current phase of the game flow and define which actions are valid at a given moment.

A game loop processes actions, validates them, applies their effects, and advances the game flow when necessary.

## Finite State Machine

The game flow was initially modeled using a hierarchical finite state machine. This model helped define the main states of the match, including game initialization, rounds, turns, card application, decisions, system health checks, crisis flow, victory, and defeat.

During implementation, some aspects of the flow were adapted to better fit the digital prototype, but the finite state machine remained an important guide for structuring the backend logic.

## Deployment

In the deployed version, the frontend build is served by the backend as a single web application on Render.