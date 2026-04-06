// eslint-disable-next-line no-unused-vars
import styles from '../playersPanel/PlayersPanel.module.css';

function Player({
  id,
  playerName,
  pointsTotal,
  pointsHand,
  pointsBank,
  targetMode,
  handleSelectTargetPlayer,
}) {
  return (
    <div
      className={`${styles.gridRow} ${styles.itemRow}`}
      style={{ cursor: targetMode ? 'pointer' : 'default' }}
      onClick={targetMode ? () => handleSelectTargetPlayer(id) : undefined}
    >
      <span className={`${styles.cell} ${styles.playerName}`}>
        {playerName}
      </span>
      <span className={`${styles.cell} ${styles.playerPoints}`}>
        {pointsHand}
      </span>
      <span className={`${styles.cell} ${styles.playerPoints}`}>
        {pointsBank}
      </span>
      <span className={`${styles.cell} ${styles.playerPoints}`}>
        {pointsTotal}
      </span>
    </div>
  );
}

export default Player;
