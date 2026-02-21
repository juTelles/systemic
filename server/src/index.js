const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  // como vamos servir front e back no mesmo host,
  // não precisa configurar CORS aqui.
});

const clientDist = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDist));

// SPA fallback (React Router / rotas no client)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("JOIN_ROOM", ({ roomId, name }) => {
    socket.join(roomId);
    io.to(roomId).emit("LOG", { message: `${name} entrou na sala ${roomId}` });
  });

  socket.on("PING", () => socket.emit("PONG"));
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on ${PORT}`);
});