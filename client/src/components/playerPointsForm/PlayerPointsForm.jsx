// eslint-disable-next-line no-unused-vars
import styles from '../playersPanel/PlayersPanel.module.css';
import Button from '../button/Button';
import { GiCheckMark } from 'react-icons/gi';
import { useState } from 'react';

function PlayerPointsForm({
  id,
  playerName,
  localPlayerId,
  pointsTotal,
  pointsHand,
  pointsBank,
  selectedTargetPlayerId,
  currentPlayerId,
  maxPoints,
}) {
  const [value, setValue] = useState(0);

  const MAX = Number(maxPoints) - (Number(pointsBank) + Number(pointsHand));
  const MIN = 1;

  const handleChange = (event) => {
    let val = parseInt(event.target.value, 10);

    if (val > MAX) val = MAX;
    if (val < MIN) val = MIN;

    setValue(isNaN(val) ? '' : val);
  };

  const displayTotal = value ? Number(pointsHand) + Number(value) : pointsTotal;
  console.log('Input value:', value);

  return (
    <div
      className={`${styles.gridRow} ${styles.itemRow} ${styles.selectedRow}`}
    >
      <span
        className={`${styles.cell} ${styles.playerName} ${styles.targetPlayer}`}
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
  );
}

export default PlayerPointsForm;
