import styles from '../playersPanel/PlayersPanel.module.css';
import { GiCheckMark } from 'react-icons/gi';
import Button from '../button/Button.jsx';

function Player({
  id,
  playerName,
  pointsHand,
  pointsBank,
  pointsTotal,
  targetMode,
  currentPlayerId,
  handleSelectTargetPlayer,
  inputMode,
  sendButtonToolTip,
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
        style={{ border: inputMode ? 'none' : '' }}
      >
        {pointsTotal}
      </span>
      {inputMode ? (
        <Button
          className={`${styles.cell} ${styles.buttonSendPoints}`}
          label={<GiCheckMark size={16} />}
          width={'40%'}
          height={'1.2rem'}
          margin={'3px 0px 3px 7px'}
          borderRadius={'0px'}
          padding={'0'}
          color={'var(--ciano)'}
          disabled={true}
          title={sendButtonToolTip}
        />
      ) : null}
    </div>
  );
}

export default Player;
