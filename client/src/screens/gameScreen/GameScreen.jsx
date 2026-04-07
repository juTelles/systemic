// eslint-disable-next-line no-unused-vars
import styles from './GameScreen.module.css';
import ActionBar from '../../components/actionBar/ActionBar';
import StatusBar from '../../components/statusBar/StatusBar';
import { useStatePolling } from '../../hooks/useStatePolling';
import { useRef, useEffect, useState } from 'react';
import TableTop from '../../components/tableTop/TableTop';
import LateralBar from '../../components/lateralBar/LateralBar';
import { useRoomActions } from '../../actions/roomsActions';
import { resolveDecisionIdFromUISelection } from '../../helpers/helpers.js';

function GameScreen({ roomId, localPlayerId, onSessionInvalid }) {
  const { roomState, isLoading, errorCode } = useStatePolling(roomId);
  const previousPhaseRef = useRef(null);
  const { setDecisonChosen } = useRoomActions(roomId, localPlayerId);

  const [selectedDecisionUIId, setSelectedDecisionUIId] = useState(null);
  const [instructionKey, setInstructionKey] = useState(null);
  const [showGameStartDialog, setShowGameStartDialog] = useState(false);

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

  async function handleDecisionSubmit(decisionUIId, target, amount = null) {
    const action = resolveDecisionIdFromUISelection(
      decisionUIId,
      target,
      amount,
      roomState,
    );
    if (!action) {
      console.error('No action resolved for the selected decision UI');
      return;
    }
    const result = await setDecisonChosen(action);
    if (!result.ok) {
      console.error('Error applyng decision:', result.error);
    }
    setInstructionKey(null);
    setSelectedDecisionUIId(null);
  }

  useEffect(() => {
    if (isLoading) return;

    if (errorCode === 'ROOM_NOT_FOUND' || errorCode === 'INTERNAL_ERROR') {
      onSessionInvalid();
      return;
    }

    if (roomState?.players) {
      const playerExists = roomState.players.some(
        (player) => player.id === localPlayerId
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
        }, 5000);
      }, 0);
      previousPhaseRef.current = currentPhase;
      return () => clearTimeout(timeout);
    }
    previousPhaseRef.current = currentPhase;
  }, [roomState?.phase]);

  return (
    <div className={styles.pageContainer}>
      {showGameStartDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h2>Iniciando partida</h2>
            <p>Preparando ambiente...</p>
          </div>
        </div>
      )}
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
          isPreGame={isPreGame}
          roomState={roomState}
          localPlayerId={localPlayerId}
          selectedDecisionUIId={selectedDecisionUIId}
          isReadOnly={isReadOnlyTurn}
          handleDecisionSubmit={handleDecisionSubmit}
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
        <LateralBar />
      </div>
    </div>
  );
}

export default GameScreen;
