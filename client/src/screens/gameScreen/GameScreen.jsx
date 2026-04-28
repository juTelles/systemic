import styles from './GameScreen.module.css';
import ActionBar from '../../components/actionBar/ActionBar';
import StatusBar from '../../components/statusBar/StatusBar';
import { useStatePolling } from '../../hooks/useStatePolling';
import { useRef, useEffect, useState } from 'react';
import TableTop from '../../components/tableTop/TableTop';
import LateralBar from '../../components/lateralBar/LateralBar';
import { useRoomActions } from '../../actions/roomsActions';
import ModalDialog from '../../components/modalDialog/ModalDialog.jsx';
import { deleteRoom } from '../../api/roomsApi';
import { useRoomSessionGuard } from '../../hooks/useSessionGuard';


function GameScreen({ roomId, localPlayerId, onSessionInvalid }) {
  const { submitDecision, endDecision } = useRoomActions(roomId, localPlayerId);
  const { roomState, isLoading, errorCode } = useStatePolling(roomId);

  const previousPhaseRef = useRef(null);

  const [selectedDecisionUIId, setSelectedDecisionUIId] = useState(null);

  const [instructionKey, setInstructionKey] = useState(null);

  const [showGameStartDialog, setShowGameStartDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(null);

  const isPreGame = roomState?.phase === 'LOBBY';
  const isReadOnlyTurn = localPlayerId !== roomState?.flow?.currentPlayerId;

  useRoomSessionGuard({
  isLoading,
  errorCode,
  roomState,
  localPlayerId,
  onSessionInvalid,
  maxFailures: 3,
});

  const handleDecisionUISelect = (decisionUIId, decisionInstructionKey) => {
    if (decisionUIId === selectedDecisionUIId) {
      setInstructionKey(null);
      setSelectedDecisionUIId(null);
      return;
    }
    setSelectedDecisionUIId(decisionUIId);
    setInstructionKey(decisionInstructionKey);
  };

  async function handleDecisionSubmit(action) {
    const result = await submitDecision(action);

    if (!result.ok) {
      console.error('Error applying decision:', result.code);
      setShowErrorDialog({ content: 'DECISION_ERROR' });
    }
    if (
      result.ok &&
      result.roomState?.decisionState?.validationError !== null
    ) {
      const validationError = result?.roomState?.decisionState?.validationError;
      const errorMessage = {
        title: validationError.type,
        content: validationError.failedValidation,
      };
      setShowErrorDialog(errorMessage);
    }
    setInstructionKey(null);
    setSelectedDecisionUIId(null);
  }

  async function handleEndGame() {
    try {
      const result = await deleteRoom(roomId);
      if (!result.ok) {
        console.error('Failed to delete room:', result.error);
      }
      onSessionInvalid('end_game_success');
    } catch (err) {
      console.error('Failed to delete room:', err);
    }
  }

  async function handleFinishDecision() {
    const result = await endDecision();
    if (!result.ok) {
      console.error('Error finishing decision:', result.error);
      setShowErrorDialog({ content: 'FINISH_DECISION_ERROR' });
    }
    setInstructionKey(null);
    setSelectedDecisionUIId(null);
    return;
  }

  useEffect(() => {
    const currentPhase = roomState?.phase;
    const previousPhase = previousPhaseRef.current;

    if (previousPhase === 'LOBBY' && currentPhase === 'IN_GAME') {
      const timeout = setTimeout(() => {
        setShowGameStartDialog(true);
        setTimeout(() => {
          setShowGameStartDialog(false);
        }, 1500);
      }, 0);
      previousPhaseRef.current = currentPhase;
      return () => clearTimeout(timeout);
    }
    previousPhaseRef.current = currentPhase;
  }, [roomState?.phase]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <StatusBar
          isPreGame={isPreGame}
          roomState={roomState}
          localPlayerId={localPlayerId}
          roomId={roomId}
          selectedDecisionUIId={selectedDecisionUIId}
          isReadOnly={isReadOnlyTurn}
          instructionKey={instructionKey}
          handleDecisionSubmit={handleDecisionSubmit}
        />
        <TableTop
          roomState={roomState}
          isPreGame={isPreGame}
          isReadOnly={isReadOnlyTurn}
          handleDecisionSubmit={handleDecisionSubmit}
          selectedDecisionUIId={selectedDecisionUIId}
        />
        <ActionBar
          isPreGame={isPreGame}
          roomState={roomState}
          localPlayerId={localPlayerId}
          handleDecisionUISelect={handleDecisionUISelect}
          selectedDecisionUIId={selectedDecisionUIId}
          isReadOnly={isReadOnlyTurn}
        />
      </div>
      <div className={styles.lateralBarContainer}>
        <LateralBar
          isPreGame={isPreGame}
          roomState={roomState}
          localPlayerId={localPlayerId}
          isReadOnlyTurn={isReadOnlyTurn}
          roomId={roomId}
          handleFinishDecision={handleFinishDecision}
          onSessionInvalid={onSessionInvalid}
        />
      </div>
      {showGameStartDialog ? (
        <ModalDialog modalType={'GAME_START'} />
      ) : showErrorDialog ? (
        <ModalDialog
          modalType={'ERROR'}
          error={showErrorDialog}
          button={true}
          onClose={() => setShowErrorDialog(false)}
        />
      ) : roomState?.gameResult === 'GAME_WIN' ? (
        <ModalDialog
          modalType={'GAME_WIN'}
          button={true}
          onClose={handleEndGame}
        />
      ) : roomState?.gameResult === 'GAME_OVER' ? (
        <ModalDialog
          modalType={'GAME_OVER'}
          button={true}
          onClose={handleEndGame}
        />
      ) : null}
    </div>
  );
}

export default GameScreen;
