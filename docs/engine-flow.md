# Engine Flow

Systemic uses a step/action-based flow to control the match.

The backend is responsible for validating and applying every action. The frontend only sends commands and renders the updated state.

## Actions

Actions represent events triggered by players or by the system.

Examples of actions used in Systemic include:

- `SET_READY`: marks a player as ready in the lobby.
- `UNSET_READY`: allows a player to cancel their ready state.
- `START_GAME`: starts the match when the room is ready.
- `SUBMIT_DECISION`: submits the decision chosen in the interface to the backend.
- `DRAW_CARD`: player-triggered action that advances the flow to reveal or show the already-drawn current card.
- `APPLY_CARD_EFFECT`: applies the effect of the currently drawn card.
- `CHECK_SYSTEM_HEALTH`: checks and updates the current system health conditions.

Every action is processed through the backend engine, and all authoritative game state changes happen within the engine-controlled flow.

## Steps

Steps represent the current phase of the game flow.

Each step defines:

- which actions are accepted;
- whether the next transition is automatic or requires player input;
- which effects should be applied;
- which instruction should be shown to the player.

## Game loop

The game loop coordinates the execution of the match flow.

It receives an action, checks whether the current state allows that action, and calls the engine function responsible for applying it. After the action is applied, the loop continues automatic transitions when the current step defines them, until the game reaches a step that requires player input or a blocked state, such as victory, defeat, or waiting for players.

## Authoritative state

All game state changes happen inside the engine.

This includes:

- player points;
- Bugs;
- tests;
- cards;
- system health;
- current player;
- current step;
- Crisis Round state;
- win/loss conditions;
- game logs.

This approach keeps the rules centralized and avoids the frontend directly modifying the match state.