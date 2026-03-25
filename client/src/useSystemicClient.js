import { useEffect, useRef, useState, useCallback } from "react";
import { createSocketClient } from "./socketClient";

export function useSystemicClient(socketUrl) {
  const [state, setState] = useState(null);
  const [err, setErr] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = createSocketClient({
      url: socketUrl,
      onState: (s) => setState(s),
      onError: (e) => setErr(e),
    });

    clientRef.current = client;

    return () => {
      client.socket.disconnect();
      clientRef.current = null;
    };
  }, [socketUrl]);

  const send = useCallback((action) => {
    clientRef.current?.sendAction(action);
  }, []);

  return { state, err, send };
}