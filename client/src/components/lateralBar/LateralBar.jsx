// eslint-disable-next-line no-unused-vars
import styles from './LateralBar.module.css';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import CardBack from '../cardBack/CardBack';
import Button from '../button/Button';

function LateralBar({
  roomState,
  isPreGame,
  localPlayerId,
  roomId,
  waitDecisionAmount,
  waitDecisionTarget,
}) {

  return (
    <div className={styles.lateralBar}>
      <div className={styles.cardContainer}>
      <CardBack />
      </div>
      <div className={styles.panelContainer}>
      <AbsorbedBugsPanel />
      </div>
      <div className={styles.menuContainer}>
        <Button border={'0px'} borderRadius={'0px'} label={'REGRAS'}/>
        <Button border={'0px'} borderRadius={'0px'} label={'OPÇÕES'}/>
      </div>
    </div>
  );
}

export default LateralBar;
