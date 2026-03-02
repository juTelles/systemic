// client/src/socketClient.js
import { io } from "socket.io-client";
import { MSG, makeMessage } from "../../shared/protocol.js";

function makeActionId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createSocketClient({ onState, onError }) {
  const url = import.meta.env.VITE_SOCKET_URL;
  console.log("[ws] connecting to:", url);

  const socket = io(url, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  // Tudo que o servidor manda vem no evento "message"
  socket.on("message", (msg) => {
    if (!msg || typeof msg !== "object") return;

    if (msg.type === MSG.STATE) {
      onState?.(msg.payload.state);
      return;
    }

    if (msg.type === MSG.ERROR) {
      onError?.(msg.payload);
      return;
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  function sendAction(action) {
    const actionId = makeActionId();
    socket.emit("message", makeMessage(MSG.ACTION, { actionId, action }));
    return actionId;
  }

  return { socket, sendAction };
}