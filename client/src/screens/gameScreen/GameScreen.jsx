// eslint-disable-next-line no-unused-vars
import styles from './GameScreen.module.css';
import ActionBar from '../../components/actionBar/ActionBar';
import StatusBar from '../../components/statusBar/StatusBar';
import { useStatePolling } from '../../hooks/useStatePolling';
import { useRef, useEffect, useState } from 'react';
import TableTop from '../../components/tableTop/TableTop';
import LateralBar from '../../components/lateralBar/LateralBar';

function GameScreen({ roomId, localPlayerId, onSessionInvalid }) {
  const [showGameStartDialog, setShowGameStartDialog] = useState(false);
  const [instructionKey, setInstructionKey] = useState(null);
  const previousPhaseRef = useRef(null);
  const { roomState, isLoading, errorCode } = useStatePolling(roomId);
  const isPreGame = roomState?.phase === 'LOBBY';
  const [selectedDecisionUIId, setSelectedDecisionUIId] = useState(null);
  // const [selectedTargetComponent, setSelectedTargetComponent] = useState(null);
  // const [selectedAmount, setSelectedAmount] = useState(null);

  const handleDecisionMade = (decison, decisionInstructionKey) => {
    setSelectedDecisionUIId(decison)
    setInstructionKey(decisionInstructionKey);
  };

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
        />
        <TableTop
          isPreGame={isPreGame}
          roomState={roomState}
          localPlayerId={localPlayerId}
          selectedDecisionUIId={selectedDecisionUIId}
          isReadOnly={isReadOnlyTurn}
        />
        <ActionBar
          isPreGame={isPreGame}
          roomState={roomState}
          localPlayerId={localPlayerId}
          handleDecisionMade={handleDecisionMade}
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
