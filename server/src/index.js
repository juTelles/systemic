// // server/src/index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { createRoutes } from "./api/routes.js";
import { createRoomsService } from "./rooms/roomsService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // payload JSON (join/action)
  app.use(express.json());

  app.use((req, res, next) => {
    // console.log(req.method, req.url);
    next();
  });

  // health-check simples
  app.get("/health", (req, res) => res.json({ ok: true }));

  app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

  // dependências do "domínio"
  const rooms = createRoomsService();

  // API primeiro, para não conflitar com SPA
  app.use("/api", createRoutes({ rooms }));

  // Servir o front buildado (Vite)
  const clientDistPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDistPath));

  // Fallback do SPA: qualquer rota que não seja /api devolve index.html
  app.get("*", (req, res) => {
    console.log("Fallback route hit, serving index.html");
    res.sendFile(path.join(clientDistPath, "index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(`Error at ${req.method} ${req.url}:`, err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}