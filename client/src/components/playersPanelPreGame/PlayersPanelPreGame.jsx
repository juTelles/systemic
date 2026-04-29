import styles from './PlayersPanelPreGame.module.css';
import { useRoomActions } from '../../actions/roomsActions';
import Button from '../button/Button';
import { GiCheckMark } from 'react-icons/gi';
import { Tooltip } from 'react-tooltip';

function PlayersPanelPreGame({ players, localPlayerId, roomId, txt, gameConfigId }) {
  const { setReady, unsetReady } = useRoomActions(roomId, localPlayerId);

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
  const gameConfigTxt = txt.preGamePlayersTitle[gameConfigId]?.pt || '';
  const title = `${txt.preGameRoom.pt} ${roomId} - ${gameConfigTxt}`;
  return (
    <div className={styles.playersPanelContainer}>
      <h2 className={styles.playersPanelTitle}>
        {title}
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
              title={txt.preGameToolTipStatus[player.status]?.pt || ''}
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
