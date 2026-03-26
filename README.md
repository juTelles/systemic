
# Systemic

**Systemic** is a cooperative serious game implemented as a web-based multiplayer application. The game simulates the maintenance and evolution of a software system through a shared remote digital board, where players must coordinate decisions, manage issues across interconnected components, and keep the system stable.

## Project status

This project is currently in development.

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

## Production

In production, the frontend is built and served by the backend as a single web application.

The project is intended to be deployed as a Web Service on Render.

## Notes
This repository is organized as a multi-part project, with separate frontend and backend applications.
Shared definitions that must remain consistent between client and server are stored in the shared folder.
The project is still under active development, so parts of the structure and implementation may change.
