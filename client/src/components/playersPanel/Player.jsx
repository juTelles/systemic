import styles from '../playersPanel/PlayersPanel.module.css';

function Player({
  id,
  playerName,
  pointsHand,
  pointsBank,
  pointsTotal,
  targetMode,
  currentPlayerId,
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
        className={`${styles.cell} ${styles.playerPointsTotal} ${
          paintPlayer ? styles.playerSelected : ''
        }`}
      >
        {pointsTotal}
      </span>
    </div>
  );
}

export default Player;
