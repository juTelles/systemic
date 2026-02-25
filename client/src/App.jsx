import { useEffect, useMemo, useRef, useState } from "react";
import { createSocketClient } from "./socketClient";

export default function App() {
  const [state, setState] = useState(null);
  const [err, setErr] = useState(null);

  const clientRef = useRef(null);

  const socketUrl = useMemo(() => {
    // Local: backend em http://localhost:8080
    // Em produção: seu domínio do Render (https://...)
    return "http://localhost:8080";
  }, []);

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

  const send = (action) => {
    if (!clientRef.current) return;
    clientRef.current.sendAction(action);
  };

  if (!state) {
    return <div style={{ padding: 16 }}>Conectando e aguardando STATE...</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Systemic (Socket.IO test)</h1>

      {err && (
        <pre style={{ background: "#fee", padding: 12 }}>
          {JSON.stringify(err, null, 2)}
        </pre>
      )}

      <pre style={{ background: "#eee", padding: 12 }}>
        {JSON.stringify(state, null, 2)}
      </pre>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => send({ type: "END_TURN" })}>END_TURN</button>
        <button onClick={() => send({ type: "RESET_GAME" })}>RESET_GAME</button>
        <button onClick={() => send({ type: "FOO" })}>AÇÃO INVÁLIDA</button>
      </div>
    </div>
  );
}

//   return (
//     <div className={styles.pageContainer}>
//       <Header title="Systemic" />
//       <TopBar />
//       <Board />
//       <BottomPanel />
//     </div>
//   );
// }
