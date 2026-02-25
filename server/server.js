// server/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { MSG, makeMessage } from "../shared/protocol.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/health", (req, res) => res.status(200).send("ok"));

const httpServer = http.createServer(app);

const isProd = process.env.NODE_ENV === "production";

// Em dev, libera o Vite (5173). Em prod (Render junto), não precisa abrir '*'
const io = new Server(httpServer, {
  cors: isProd
    ? undefined
    : {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
});

let gameState = {
  turn: 1,
  phase: "WAIT_DRAW",
  players: [],
  lastActionId: null,
};

function broadcastState() {
  io.emit("message", makeMessage(MSG.STATE, { state: gameState }));
}

io.on("connection", (socket) => {
  socket.emit("message", makeMessage(MSG.STATE, { state: gameState }));

  socket.on("message", (msg) => {
    if (msg?.type !== MSG.ACTION) return;

    const { actionId, action } = msg.payload || {};

    if (actionId && actionId === gameState.lastActionId) return;

    if (action?.type === "END_TURN") {
      gameState = {
        ...gameState,
        turn: gameState.turn + 1,
        phase: "WAIT_DRAW",
        lastActionId: actionId ?? null,
      };
      broadcastState();
      return;
    }

    if (action?.type === "RESET_GAME") {
      gameState = {
        turn: 1,
        phase: "WAIT_DRAW",
        players: [],
        lastActionId: actionId ?? null,
      };
      broadcastState();
      return;
    }

    socket.emit(
      "message",
      makeMessage(MSG.ERROR, {
        code: "UNKNOWN_ACTION",
        message: `Ação não suportada: ${action?.type}`,
      })
    );
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});