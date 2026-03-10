import styles from './App.module.css';
import GameScreen from './screens/gameScreen/GameScreen';
import './theme.css';
import LobbyScreen from './screens/lobbyScreen/LobbyScreen';

export default function App() {

  return (
    <div className={styles.app}>
        <LobbyScreen/>
    </div>
  );
}
