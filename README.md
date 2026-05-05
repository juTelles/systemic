
# Systemic

**Systemic** is a cooperative serious game implemented as a web-based multiplayer application. The game simulates the maintenance and evolution of a software system through a shared remote digital board, where players must coordinate decisions, manage issues across interconnected components, and keep the system stable.

## Project status

Systemic is currently a functional high-fidelity prototype.

The application supports complete online multiplayer matches, including room management, shared game state synchronization, player actions, game rules, event logs, and automatic win/loss conditions.

The project is still evolving, with planned improvements related to automated tests, technical documentation, UX refinements, game logs, and long-term persistence.

## Tech stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Architecture:** authoritative server
- **Synchronization:** state polling and rooms polling

## Project structure

- `client/` — frontend application
- `server/` — backend application and game state management
- `shared/` — shared constants, protocols, and definitions
- `docs/` — technical and project documentation

## Architecture overview

Systemic uses an authoritative server architecture.

The server is responsible for validating actions and maintaining the official game state.
The frontend does not control the game logic directly; instead, it requests updates from the backend.

Synchronization currently happens through two polling flows:

- **State polling:** used to keep the current game state updated
- **Rooms polling:** used to keep the room list updated

## Deployment

Systemic is deployed on Render as a single web service, with the frontend build served by the backend.

The current deployed version is available at:

https://systemic.onrender.com

> Note: if the Render service is inactive, the first access may take a few seconds while the server starts.

## Requirements

Before running the project locally, make sure you have installed:

- Node.js
- npm

## Running the project locally

To run the project in development mode, start the backend and the frontend separately.

#### Backend - Server
```bash
cd server
npm install
npm run dev
```

### Frontend - Client
```bash
cd client
npm install
npm run dev
```

## Local access

After both applications are running, the frontend should be available at:

http://localhost:5173

If your backend is using the current default local setup, it should run at:

http://localhost:3001

## Notes

This repository is organized as a multi-part project, with separate frontend and backend applications.

Shared definitions that must remain consistent between client and server are stored in the `shared/` folder.

The current version was developed as an academic prototype and is not intended to be considered a final commercial product. Some improvements remain planned, including automated test coverage, technical refactoring, persistent storage, and additional playtesting.

## Evidence and validation materials

Complementary evidence from the development and validation process is organized in a separate folder, including test reports, playtest records, game logs, questionnaires, screenshots, and supporting materials.

[Evidence folder](https://drive.google.com/drive/folders/1cM144FDsedQ13VHwRcPM56IuPqxh6zNo?usp=sharing)

Some materials, such as recordings and raw logs, may have restricted access due to participant privacy.