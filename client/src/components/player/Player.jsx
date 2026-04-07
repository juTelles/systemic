// eslint-disable-next-line no-unused-vars
import styles from '../playersPanel/PlayersPanel.module.css';

function Player({
  id,
  playerName,
  currentPlayerId,
  pointsTotal,
  pointsHand,
  pointsBank,
  targetMode,
  handleSelectTargetPlayer,
}) {
  const paintPlayer = id === currentPlayerId && !targetMode;
  return (
    <div
      className={`${styles.gridRow} ${styles.itemRow}`}
      style={{ cursor: targetMode ? 'pointer' : 'default' }}
      onClick={targetMode ? () => handleSelectTargetPlayer(id) : undefined}
    >
      <span
        className={`${styles.cell} ${styles.playerName} ${
          paintPlayer ? styles.playerSelected : ''
        }`}
      >
        {playerName}
      </span>
      <span
        className={`${styles.cell} ${styles.playerPoints} ${
          paintPlayer ? styles.playerSelected : ''
        }`}
      >
        {pointsHand}
      </span>
      <span
        className={`${styles.cell} ${styles.playerPoints} ${
          paintPlayer ? styles.playerSelected : ''
        }`}
      >
        {pointsBank}
      </span>
      <span
        className={`${styles.cell} ${styles.playerPoints} ${
          paintPlayer ? styles.playerSelected : ''
        }`}
      >
        {pointsTotal}
      </span>
    </div>
  );
}

export default Player;
