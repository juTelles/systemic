// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './Player.module.css';

function Player({ playerName, playerPoints }) {
  return (
    <div className={styles.playerItemWrapper}>
      <span className={styles.playerName}>{playerName}</span>
      <span className={styles.playerPoints}>{playerPoints} </span>
    </div>
  );
}

export default Player;
