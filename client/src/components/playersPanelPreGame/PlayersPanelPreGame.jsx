import styles from './PlayersPanelPreGame.module.css';
import { useRoomActions } from '../../actions/roomsActions';
import Button from '../button/Button';
import { GiCheckMark } from 'react-icons/gi';

function PlayersPanelPreGame({ players, localPlayerId, roomId, txt }) {
  const { setReady, unsetReady } = useRoomActions(roomId, localPlayerId);
  //TODO: add action to unset ready if player is already ready

  async function handleReady() {
    const result = await setReady();
    if (!result.ok) {
      console.error('Error marking as ready:', result.error);
    }
  }

  const handleUnsetReady = async () => {
    const result = await unsetReady();
    if (!result.ok) {
      console.error('Error unsetting ready:', result.error);
    }
  };

  return (
    <div className={styles.playersPanelContainer}>
      <h2 className={styles.playersPanelTitle}>
        {txt?.preGamePlayersTitle?.pt}
      </h2>
      <div className={styles.playersItemsContainer}>
        {players?.map((player) => (
          <div className={styles.preGamePanelItemWrapper} key={player.id}>
            <span className={styles.playerName}>{player.nickname}</span>
            <span className={styles.playerStatus}>
              {txt.preGameStatusDescription[player.status]?.pt || ''}
            </span>
            <Button
              label={
                player?.status === 'READY' ? 'X' : <GiCheckMark size={14} />
              }
              width={'15%'}
              height={'1.2rem'}
              margin={'3px 0px 3px 7px'}
              borderRadius={'0px'}
              onClick={
                player.status === 'READY' ? handleUnsetReady : handleReady
              }
              padding={'0'}
              disabled={localPlayerId === player.id ? false : true}
              color={'var(--ciano)'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayersPanelPreGame;
