// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './Player.module.css';
import Button from '../button/Button';
import { GiCheckMark } from "react-icons/gi";

function Player({
  playerName,
  playerStatus,
  playerPoints,
  isPreGame,
  localPlayerId,
  handleReady,
}) {
  return (
    <div className={styles.playerItemWrapper}>
      <span className={styles.playerName}>{playerName}</span>
      {isPreGame ? (
        <div className={styles.preGameStatusWrapper}>
          <span className={`${styles.playerStatus} ${styles.preGameStatus}`}>
            {playerStatus == 'READY' ? 'PRONTO' : 'Esperando'}
          </span>
          <Button
            label={<GiCheckMark size={16}/>}
            width={'20%'}
            height={'1.2rem'}
            margin={'3px 0px 3px 7px'}
            borderRadius={'0px'}
            onClick={handleReady}
            padding={'0'}
            disabled={localPlayerId == true ? false : true}
          >
          </Button>
        </div>
      ) : (
        <span className={styles.playerPoints}>{playerPoints} </span>
      )}
    </div>
  );
}

export default Player;
