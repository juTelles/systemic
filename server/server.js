import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { MSG, makeMessage, PROTOCOL_VERSION } from '../shared/protocol.js';

// ======== LOGAR TUDO QUE MATAR O PROCESSO ========
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

// ======== __dirname EM ESM ========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======== APP + SERVER ========
const app = express();
const httpServer = http.createServer(app);

// ======== RESOLVE O CAMINHO DO DIST (repoRoot/client/dist) ========
// server/server.js -> __dirname = .../server
// então ../client/dist cai na raiz/client/dist
const clientDist = path.resolve(__dirname, '../client/dist');
const indexHtml = path.join(clientDist, 'index.html');

// Logs úteis (pra acabar a confusão de caminho)
console.log('[boot] __dirname:', __dirname);
console.log('[boot] clientDist:', clientDist);
console.log('[boot] indexHtml exists?', fs.existsSync(indexHtml));

// Serve estáticos se existir dist
app.use(express.static(clientDist));

app.get('/health', (req, res) => res.status(200).send('ok'));

// SPA fallback: se tiver index.html, manda; senão avisa claramente
app.get(/.*/, (req, res) => {
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res
      .status(500)
      .send(
        'index.html não encontrado. Você buildou o client? Esperado em: ' +
          indexHtml
      );
  }
});

// ======== SOCKET.IO ========
const isProd = process.env.NODE_ENV === 'production';

const io = new Server(httpServer, {
  // Em prod (mesmo host) pode ficar undefined.
  // Em dev (Vite 5173) precisa liberar.
  cors: isProd
    ? undefined
    : { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

// ======== GAMESTATE MVP ========
let gameState = {
  turn: 1,
  phase: 'WAIT_DRAW',
  players: [],
  lastActionId: null,
};

function broadcastState() {
  io.emit('message', makeMessage(MSG.STATE, { state: gameState }));
}

function sendError(socket, code, message) {
  socket.emit('message', makeMessage(MSG.ERROR, { code, message }));
}

function handleAction(socket, payload) {
  const { actionId, action } = payload || {};

  if (!action || typeof action.type !== 'string') {
    sendError(socket, 'BAD_ACTION', 'ACTION inválida: faltou action.type.');
    return;
  }

  if (actionId && actionId === gameState.lastActionId) return;

  if (action.type === 'RESET_GAME') {
    gameState = {
      turn: 1,
      phase: 'WAIT_DRAW',
      players: [],
      lastActionId: actionId ?? null,
    };
    broadcastState();
    return;
  }

  if (action.type === 'END_TURN') {
    gameState = {
      ...gameState,
      turn: gameState.turn + 1,
      phase: 'WAIT_DRAW',
      lastActionId: actionId ?? null,
    };
    broadcastState();
    return;
  }

  sendError(socket, 'UNKNOWN_ACTION', `Ação não suportada: ${action.type}`);
}

io.on('connection', (socket) => {
  console.log('[socket] connected:', socket.id);

  socket.emit('message', makeMessage(MSG.STATE, { state: gameState }));

  socket.on('message', (msg) => {
    try {
      if (!msg || typeof msg !== 'object') {
        sendError(socket, 'BAD_MESSAGE', 'Mensagem inválida: não é objeto.');
        return;
      }
      if (msg.v !== undefined && msg.v !== PROTOCOL_VERSION) {
        sendError(socket, 'BAD_VERSION', `Versão não suportada: ${msg.v}`);
        return;
      }
      if (msg.type === MSG.ACTION) {
        handleAction(socket, msg.payload);
        return;
      }
      sendError(socket, 'UNKNOWN_TYPE', `Tipo não suportado: ${msg.type}`);
    } catch (e) {
      console.error('[socket] handler error:', e);
      sendError(socket, 'SERVER_ERROR', 'Erro interno ao processar mensagem.');
    }
  });
});

// ======== LISTEN ========
const PORT = process.env.PORT || 10000;
httpServer.listen(PORT, () => {
  console.log(`[boot] listening on :${PORT}`);
});
