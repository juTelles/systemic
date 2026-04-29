import styles from './App.module.css';
import GameScreen from './screens/gameScreen/GameScreen';
import './theme.css';
import { useState, useCallback } from 'react';
import LobbyScreen from './screens/lobbyScreen/LobbyScreen';

const STORAGE_KEYS = {
  roomId: 'systemic_roomId',
  localPlayerId: 'systemic_localPlayerId',
};

export default function App() {
  const [roomId, setRoomId] = useState(
    () => localStorage.getItem(STORAGE_KEYS.roomId) || '',
  );
  const [localPlayerId, setLocalPlayerId] = useState(
    () => localStorage.getItem(STORAGE_KEYS.localPlayerId) || '',
  );

  const onJoinSuccess = (roomId, localPlayerId) => {
    //TO DO: make custom hook to manage session and localStorage
    localStorage.setItem(STORAGE_KEYS.roomId, roomId);
    localStorage.setItem(STORAGE_KEYS.localPlayerId, localPlayerId);
    setRoomId(roomId);
    setLocalPlayerId(localPlayerId);
  };

  const clearSession = useCallback((reason = 'unknown') => {
    console.info('Clearing session:', { reason });

    localStorage.removeItem(STORAGE_KEYS.roomId);
    localStorage.removeItem(STORAGE_KEYS.localPlayerId);

    setRoomId('');
    setLocalPlayerId('');
  }, []);

  return (
    <div className={styles.app}>
      {!roomId && !localPlayerId? (
        <LobbyScreen onJoinSuccess={onJoinSuccess} />
      ) : (
        <GameScreen
          roomId={roomId}
          localPlayerId={localPlayerId}
          onSessionInvalid={clearSession}
        />
      )}
    </div>
  );
}
