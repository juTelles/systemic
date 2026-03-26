// eslint-disable-next-line no-unused-vars
import Player from '../player/Player';
import styles from './PlayersPanel.module.css';
import { useRoomActions } from '../../actions/roomsActions';

function PlayersPanel({ players, isPreGame, localPlayerId, roomId }) {

  const { setReady } = useRoomActions(roomId, localPlayerId);

  async function handleReady() {
    const result = await setReady();
    if (!result.ok) {
      console.error('Error marking as ready:', result.error);
    }
  };


  return (
    <div className={styles.playersPanelWrapper}>
      <h2 className={styles.playersPanelTitle}>Jogadores</h2>
      <div className={styles.playersItemsContainer}>
        {players?.map((player) => (
          <Player
            key={player.id}
            playerName={player.nickname}
            playerStatus={player.status}
            playerPoints={player.handPoints + player.bankPoints}
            isPreGame={isPreGame}
            localPlayerId={player.id === localPlayerId}
            handleReady={handleReady}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayersPanel;
