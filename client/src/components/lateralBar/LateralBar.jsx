// eslint-disable-next-line no-unused-vars
import { STEP_NAME } from '../../../../shared/src/definitions/steps.js';
import { ERRORS } from '../../../../shared/src/constants/errors.js';
import { lateralBarTxt as txt } from '../../texts/lateralBarTxt.js';
import { useState } from 'react';
import styles from './LateralBar.module.css';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import Deck from '../deck/Deck';
import { BsQuestionCircle } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { useRoomActions } from '../../actions/roomsActions';
import ModalDialog from '../../components/modalDialog/ModalDialog.jsx';
import { getErrorMessage } from '../../texts/errorsMessages.js';
import ArrowButton from '../arrowButton/ArrowButton';

function LateralBar({
  roomState,
  localPlayerId,
  roomId,
  isReadOnlyTurn,
  handleFinishDecision,
}) {
  const [showErrorDialog, setShowErrorDialog] = useState(null);
  const { drawCard, applyCard } = useRoomActions(roomId, localPlayerId);
  const currentStepName = roomState?.flow?.step?.name;
  const isDecisionStep = currentStepName === STEP_NAME.AWAIT_DECISION;
  const isShowCardStep = currentStepName === STEP_NAME.SHOWING_CARD;
  const canDrawCard =
    currentStepName === STEP_NAME.AWAIT_CARD_DRAW && !isReadOnlyTurn;

  const handleCardDraw = async () => {
    const result = await drawCard();
    if (!result.ok) {
      console.error('Error drawing card:', result.error);
      setShowErrorDialog({
        content: ERRORS.DRAW_CARD_ERROR,
      });
    }
  };

  const handleApplyCard = async () => {
    const result = await applyCard();
    if (!result.ok) {
      console.error('Error applying card:', result.error);
      setShowErrorDialog({
        content: ERRORS.APPLY_CARD_EFFECT_ERROR,
      });
    }
  };

  const handleUnallowedClick = () => {
    return;
  };

  const arrowButtonHandle =
    isShowCardStep && !isReadOnlyTurn
      ? handleApplyCard
      : isDecisionStep && !isReadOnlyTurn
        ? handleFinishDecision
        : handleUnallowedClick;

  return (
    <>
      {showErrorDialog ? (
        <ModalDialog
          type={'ERROR'}
          error={showErrorDialog}
          button={true}
          onClose={() => setShowErrorDialog(false)}
        />
      ) : null}
      <div className={styles.lateralBar}>
        <div className={styles.menuContainer}>
          <button type="button" className={styles.helpButton}>
            <BsQuestionCircle size={43} className={styles.icon} />
          </button>
          <button type="button" className={styles.menuButton}>
            <IoSettingsOutline size={48} className={styles.icon} />
          </button>
        </div>
        <div
          className={styles.deckContainer}
          style={{ cursor: canDrawCard ? 'pointer' : 'default' }}
          onClick={canDrawCard ? handleCardDraw : handleUnallowedClick}
        >
          <Deck
            roomId={roomId}
            localPlayerId={localPlayerId}
            currentCard={isShowCardStep ? roomState?.cardState?.current : null}
            isFlipped={isShowCardStep ? true : false}
            shine={canDrawCard}
          />
        </div>
        <div className={styles.absorbedBugsPanelContainer}>
          <AbsorbedBugsPanel />
        </div>
        <div className={styles.nextButtonConteiner}>
          {!isReadOnlyTurn && (isDecisionStep || isShowCardStep) ? (
            <ArrowButton
              label={txt?.arrowButtonTxt?.[currentStepName]?.label?.pt}
              width={'4rem'}
              height={'4rem'}
              borderRadius={'50%'}
              inverted={true}
              color={'var(--red)'}
              fontSize={'var(--font-sm)'}
              onClick={arrowButtonHandle}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default LateralBar;
