import styles from '../playersPanel/PlayersPanel.module.css';
import Button from '../button/Button.jsx';
import { GiCheckMark } from 'react-icons/gi';
import { useState } from 'react';
import { resolveDecision } from '../../helpers/decisionResolver.js';

function PlayerPointsForm({
  targetPlayer,
  handleDecisionSubmit,
  selectedDecisionUIId,
  roomState,
}) {
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);

  const { bankPoints, handPoints, nickname } = targetPlayer;

  const maxPoints = Number(
    roomState?.gameConfig?.decisionCosts?.[selectedDecisionUIId],
  );
  const displayTotal =
    value && selectedDecisionUIId === 'DONATE_POINTS'
      ? Number(handPoints) + Number(bankPoints) + Number(value)
      : Number(handPoints) + Number(bankPoints);

  const handleSubmit = (roomState, decisionUIId, target, amount = null) => {
    const decision = resolveDecision(roomState, decisionUIId, target, amount);
    if (!decision.ok) {
      setError(decision.errorMessage);
      return;
    }
    handleDecisionSubmit(decision.action);
    setError(null);
    setValue(0);
  };

  const handleChange = (event) => {
    let val = parseInt(event.target.value, 10);
    setError(null);
    setValue(isNaN(val) ? '' : val);
  };

  return (
    <div
      className={`${styles.gridRow} ${styles.itemRow} ${styles.selectedRow}`}
    >
      <span className={`${styles.cell} ${styles.playerName}`}>{nickname}</span>
      <Button
        className={`${styles.cell} ${styles.buttonSendPoints}`}
        label={<GiCheckMark size={16} />}
        width={'40%'}
        height={'1.2rem'}
        margin={'3px 0px 3px 7px'}
        borderRadius={'0px'}
        padding={'0'}
        color={'var(--ciano)'}
        inverted
        onClick={() =>
          handleSubmit(roomState, selectedDecisionUIId, targetPlayer, value)
        }
      />
      <input
        id="inputPoints"
        className={`${styles.cell} ${styles.inputPoints}`}
        type="number"
        placeholder=""
        onChange={handleChange}
        max={maxPoints}
        min={1}
        value={value}
      />
      <span className={`${styles.cell} ${styles.playerPoints} `}>
        {displayTotal}
      </span>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default PlayerPointsForm;
