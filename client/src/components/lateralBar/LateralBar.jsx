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
import ArrowButton from '../arrowButton/ArrowButton';
import SideBarMenu from '../sideBarMenu/SideBarMenu.jsx';

function LateralBar({
  roomState,
  localPlayerId,
  roomId,
  isReadOnlyTurn,
  handleFinishDecision,
  isPreGame,
}) {
  const { drawCard, applyCard, leaveRoom, setConfig } = useRoomActions(roomId, localPlayerId);
  const [showErrorDialog, setShowErrorDialog] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [menuTypeOpen, setIsMenuTypeOpen] = useState(false);

  const isCurrentPlayerId = roomState?.flow?.currentPlayerId === localPlayerId;
  const currentStepName = roomState?.flow?.step?.name;
  const isDecisionStep = currentStepName === STEP_NAME.AWAIT_DECISION;
  const isShowCardStep = currentStepName === STEP_NAME.SHOWING_CARD;
  const canDrawCard =
    currentStepName === STEP_NAME.AWAIT_CARD_DRAW && !isReadOnlyTurn;
  const disabledExit =  isCurrentPlayerId ? true : false;

  function handleOpenSideBar(menuType) {
    setIsSideBarOpen(true);
    setIsMenuTypeOpen(menuType);
  }
  function handleCloseSideBar() {
    setIsSideBarOpen(false);
  }

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

  const handleChangeGameConfig = async (playerCount, difficulty) => {
    const result = await setConfig({ playerCount, difficulty });
    if (!result.ok) {
      console.error('Error changing game config:', result.error);
      setShowErrorDialog({
        content: ERRORS.SET_CONFIG_ERROR,
      });
    }
  };

  const handleLeaveRoom= async () => {
    const result = await leaveRoom();
    if (!result.ok) {
      console.error('Error leaving room:', result.error);
      setShowErrorDialog({
        content: ERRORS.LEAVE_ROOM_ERROR,
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
          <button
            type="button"
            className={styles.helpButton}
            onClick={() => handleOpenSideBar('RULES')}
          >
            <BsQuestionCircle size={43} className={styles.icon} />
          </button>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => handleOpenSideBar('MENU')}
          >
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
          <AbsorbedBugsPanel
            absorbedBugs={roomState?.absorbedBugs}
            txt={txt.absorbedBugsTxt}
          />
        </div>
        <div className={styles.nextButtonContainer}>
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
        <SideBarMenu
          title="Menu"
          isSideBarOpen={isSideBarOpen}
          handleOpenSideBar={handleOpenSideBar}
          handleCloseSideBar={handleCloseSideBar}
          menuTypeOpen={menuTypeOpen}
          handleChangeGameConfig={isPreGame ? handleChangeGameConfig : handleUnallowedClick}
          handleLeaveRoom={isCurrentPlayerId ? handleUnallowedClick : handleLeaveRoom}
          isPreGame={isPreGame}
          disabledExit={disabledExit}
          gameConfig={roomState?.gameConfig}
          players={roomState?.players}
        />
      </div>
    </>
  );
}

export default LateralBar;
