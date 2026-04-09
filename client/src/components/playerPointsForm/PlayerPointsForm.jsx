// eslint-disable-next-line no-unused-vars
import styles from '../playersPanel/PlayersPanel.module.css';
import Button from '../button/Button';
import { GiCheckMark } from 'react-icons/gi';
import { useState } from 'react';

function PlayerPointsForm({
  playerName,
  pointsHand,
  pointsBank,
  pointsTotal,
  maxPoints,
  handleDecisionSubmit,
  selectedDecisionUIId,
  decisionUI,
  targetPlayer,
  maxDonationTurnLimit,
  maxHoldTurnLimit,
}) {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(null);

  const maxPlayerPoints = Number(maxPoints) - (Number(pointsBank) + Number(pointsHand));
  const MIN = 1;

  const handleChange = (event) => {
    let val = parseInt(event.target.value, 10);
    setError(null);
    const maxTurnLimit = selectedDecisionUIId === 'HOLD_POINTS' ? maxHoldTurnLimit : maxDonationTurnLimit;

    if (val > maxPlayerPoints) {
      val = maxPlayerPoints;
      setError(`O valor máximo permitido é ${maxPlayerPoints}`);
    }
    if (val > maxTurnLimit) {
      val = maxTurnLimit;
      setError(`O valor máximo permitido por turno é ${maxTurnLimit}`);
    }
    if (val < MIN) {
      val = MIN;
      setError(`O valor mínimo permitido é ${MIN}`);
    }

    setValue(isNaN(val) ? '' : val);
  };

  const displayTotal = value ? Number(pointsHand) + Number(value) : pointsTotal;
  console.log('Input value:', value);

  return (
    <div>
    <div className={`${styles.gridRow} ${styles.itemRow} ${styles.selectedRow}`}>
      <span
        className={`${styles.cell} ${styles.playerName} ${styles.playerSelected}`}
      >
        {playerName}
      </span>
      <Button
        className={`${styles.cell} ${styles.buttonSendPoints}`}
        label={<GiCheckMark size={16} />}
        width={'40%'}
        height={'1.2rem'}
        margin={'3px 0px 3px 7px'}
        borderRadius={'0px'}
        padding={'0'}
        color={'var(--ciano)'}
        onClick={() => handleDecisionSubmit(decisionUI, targetPlayer, value)}
      />
      <input
        id="inputPoints"
        className={`${styles.cell} ${styles.inputPoints} ${styles.playerSelected}`}
        type="number"
        placeholder=""
        onChange={handleChange}
        max={Number(maxPoints) - (Number(pointsBank) + Number(pointsHand))}
        min={1}
        value={value}
      />
      <span
        className={`${styles.cell} ${styles.playerPoints} ${styles.playerSelected}`}
      >
        {displayTotal}
      </span>
    </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default PlayerPointsForm;
