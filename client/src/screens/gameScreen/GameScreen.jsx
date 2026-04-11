// eslint-disable-next-line no-unused-vars
import styles from './GameScreen.module.css';
import ActionBar from '../../components/actionBar/ActionBar';
import StatusBar from '../../components/statusBar/StatusBar';
import { useStatePolling } from '../../hooks/useStatePolling';
import { useRef, useEffect, useState } from 'react';
import TableTop from '../../components/tableTop/TableTop';
import LateralBar from '../../components/lateralBar/LateralBar';
import { useRoomActions } from '../../actions/roomsActions';
import ModalDialog from '../../components/modalDialog/ModalDialog.jsx';
import { getErrorMessage } from '../../texts/errorsMessages.js';

function GameScreen({ roomId, localPlayerId, onSessionInvalid }) {
  const { setDecisonChosen, setEndDecision } = useRoomActions(
    roomId,
    localPlayerId,
  );
  const { roomState, isLoading, errorCode } = useStatePolling(roomId);
  const previousPhaseRef = useRef(null);

  const [selectedDecisionUIId, setSelectedDecisionUIId] = useState(null);
  const [instructionKey, setInstructionKey] = useState(null);
  const [showGameStartDialog, setShowGameStartDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(null);

  const isPreGame = roomState?.phase === 'LOBBY';
  const isReadOnlyTurn = localPlayerId !== roomState?.flow?.currentPlayerId;

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
    const result = await setDecisonChosen(action);

    if (!result.ok) {
      console.error('Error applyng decision:', result.error);
      setShowErrorDialog({ content: getErrorMessage('DECISION_ERROR') });
    }

    if (result.roomState?.decisionState?.validationError !== null) {
      const validationError = result.roomState.decisionState.validationError;
      const errorMessage = {
        title: getErrorMessage(validationError.type),
        content: getErrorMessage(validationError.failedValidation),
      };
      setShowErrorDialog(errorMessage);
    }
    setInstructionKey(null);
    setSelectedDecisionUIId(null);
  }

  async function handleFinishDecision() {
    const result = await setEndDecision();
    if (!result.ok) {
      console.error('Error finishing decision:', result.error);
    }
    setInstructionKey(null);
    setSelectedDecisionUIId(null);
    return;
  }

  useEffect(() => {
    if (isLoading) return;

    if (errorCode === 'ROOM_NOT_FOUND' || errorCode === 'INTERNAL_ERROR') {
      onSessionInvalid();
      return;
    }

    if (roomState?.players) {
      const playerExists = roomState.players.some(
        (player) => player.id === localPlayerId,
      );

      if (!playerExists) {
        onSessionInvalid();
      }
    }
  }, [isLoading, errorCode, roomState, localPlayerId]);

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
      {showGameStartDialog ? (
        <ModalDialog
          title={'Iniciando partida'}
          content={'Preparando ambiente...'}
        />
      ) : showErrorDialog ? (
        <ModalDialog
          title={showErrorDialog.title ? showErrorDialog.title : 'Erro'}
          content={
            showErrorDialog.content
              ? showErrorDialog.content
              : 'Ocorreu um erro inesperado.'
          }
          button={true}
          onClose={() => setShowErrorDialog(false)}
        />
      ) : null}
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
        />
      </div>
    </div>
  );
}

export default GameScreen;
