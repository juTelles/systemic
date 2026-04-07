// eslint-disable-next-line no-unused-vars
import styles from './LateralBar.module.css';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import CardBack from '../cardBack/CardBack';
import { BsQuestionCircle } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import Button from '../button/Button';
import { useRoomActions } from '../../actions/roomsActions';

function LateralBar({
  roomState,
  isPreGame,
  localPlayerId,
  roomId,
}) {
  const { setEndDecision } = useRoomActions(roomId, localPlayerId);

  async function handleFinishDecision() {
    const result = await setEndDecision();
    if (!result.ok) {
      console.error('Error finishing decision:', result.error);
    }
  }

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
          <Button label="Finalizar Decisões"
            width={'4rem'}
            height={'4rem'}
            borderRadius={'50px'}
            inverted={true}
            color={'var(--red)'}
            fontSize={'var(--font-sm)'}
            onClick={handleFinishDecision}
          />
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
