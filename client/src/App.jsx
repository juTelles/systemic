import styles from './App.module.css';
import { useSystemicClient } from "./useSystemicClient";
import GameScreen from './screens/gameScreen/GameScreen';
import './theme.css';
import LobbyScreen from './screens/lobbyScreen/LobbyScreen';

export default function App() {
  const socketUrl = "http://localhost:10000";
  const { state, err, send } = useSystemicClient(socketUrl);

  return (
    <div className={styles.app}>
      {err && <pre className={styles.error}>{JSON.stringify(err, null, 2)}</pre>}
        <LobbyScreen/>
      {!state ? (
        <div>Conectando...</div>
      ) : (
        <>
          {/* exemplo */}
          {/* <Board state={state} /> */}
          {/* <Actions onAction={send} /> */}
          <button onClick={() => send({ type: "END_TURN" })}>END_TURN</button>
        </>
      )}
    </div>
  );
}
