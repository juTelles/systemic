// eslint-disable-next-line no-unused-vars
import styles from './LateralBar.module.css';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import CardBack from '../cardBack/CardBack';
import { BsQuestionCircle } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import Button from '../button/Button';

function LateralBar({
  roomState,
  // isPreGame,
  // localPlayerId,
  // roomId,
  isReadOnlyTurn,
  handleFinishDecision
}) {
  const isDecisionStep = roomState?.flow?.step?.name === 'AWAIT_DECISION';

  return (
    <div className={styles.lateralBar}>
      <div className={styles.menuContainer}>
        <button type="button" className={styles.helpButton}>
          <BsQuestionCircle size={43} className={styles.icon} />
        </button>
        <button type="button" className={styles.menuButton}>
          <IoSettingsOutline size={48} className={styles.icon} />
        </button>
      </div>
      <div className={styles.cardContainer}>
        <CardBack />
      </div>
      <div className={styles.absorbedBugsPanelContainer}>
        <AbsorbedBugsPanel />
      </div>
      <div className={styles.barBottomContainer}>
        <div className={styles.finishDecisionContainer}>
          {!isReadOnlyTurn && isDecisionStep ? (
            <Button
              label="Finalizar Decisões"
              width={'4rem'}
              height={'4rem'}
              borderRadius={'50%'}
              inverted={true}
              color={'var(--red)'}
              fontSize={'var(--font-sm)'}
              onClick={handleFinishDecision}
            />
          ) : null}
        </div>
        <div className={styles.exitContainer}>
          <button type="button" className={styles.exitButton}>
            <VscSignOut size={50} className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LateralBar;
