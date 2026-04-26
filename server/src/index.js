// // server/src/index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { createRoutes } from "./api/routes.js";
import { createRoomsService } from "./rooms/roomsService.js";
import { createRunGameLoop } from "./game/controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // payload JSON (join/action)
  app.use(express.json());

  app.use((req, res, next) => {
    next();
  });

  // health-check simples
  app.get("/health", (req, res) => res.json({ ok: true }));

  app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

  // dependências do "domínio"
  const rooms = createRoomsService();
  const runGameLoop = createRunGameLoop({ rooms });

  // API primeiro, para não conflitar com SPA
  app.use("/api", createRoutes({ rooms, runGameLoop  }));

  // Servir o front buildado (Vite)
  const clientDistPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDistPath));

  // Fallback do SPA: qualquer rota que não seja /api devolve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(`Error at ${req.method} ${req.url}:`, err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  //TODO: The error-handling middleware always responds with HTTP 500 and a
  // generic message, ignoring any err.status / err.code set by domain logic
  //  (e.g., createError). This will make expected 4xx errors indistinguishable
  //  from server failures for the client. Use err.status ?? 500 and include a
  // stable code field in the JSON response.
  return app;
}