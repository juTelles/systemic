import Player from './Player';
import PlayerPointsForm from './PlayerPointsForm';
import styles from './PlayersPanel.module.css';
import { useState } from 'react';

function PlayersPanel({
  players,
  localPlayerId,
  selectedDecisionUIId,
  roomState,
  isReadOnly,
  txt,
  handleDecisionSubmit,
}) {
  const [selectedTargetPlayerId, setSelectedTargetPlayerId] = useState(null);
  const [prevSelectedDecisionUIId, setPrevSelectedDecisionUIId] =
    useState(null);
  const currentPlayerId = roomState?.flow?.currentPlayerId;
  const targetPlayer = players?.find((p) => p.id === selectedTargetPlayerId);

  if (prevSelectedDecisionUIId !== selectedDecisionUIId) {
    setPrevSelectedDecisionUIId(selectedDecisionUIId);
    if (selectedDecisionUIId === 'HOLD_POINTS')
      setSelectedTargetPlayerId(currentPlayerId);
    else setSelectedTargetPlayerId(null);
  }

  const targetMode = selectedDecisionUIId === 'DONATE_POINTS';
  const inputMode =
    !isReadOnly &&
    (selectedDecisionUIId === 'HOLD_POINTS' ||
      selectedDecisionUIId === 'DONATE_POINTS');

  const handleSelectTargetPlayer = (playerId) => {
    if (targetMode && !isReadOnly) {
      setSelectedTargetPlayerId(playerId);
    }
  };

  return (
    <div className={`${styles.playersPanelContainer} ${inputMode ? styles.cianoShine : ''}`}>
      <div className={`${styles.gridRow} ${styles.playersPanelHeader}`}>
        <h2 className={styles.playersPanelTitle}>{txt.playerTitle.pt}</h2>
        <h2 className={styles.playersPanelTitle}>{txt.handPointsTitle.pt}</h2>
        <h2 className={styles.playersPanelTitle}>{txt.bankPointsTitle.pt}</h2>
        <h2 className={styles.playersPanelTitle}>{txt.totalPointsTitle.pt}</h2>
      </div>

      <div
        className={styles.playersItemsContainer}
        style={{ width: '100%', overflowY: 'auto' }}
      >
        {players?.map((player) => {
          return inputMode && selectedTargetPlayerId === player.id ? (
            <PlayerPointsForm
              key={player.id}
              targetPlayer={targetPlayer}
              handleDecisionSubmit={handleDecisionSubmit}
              selectedDecisionUIId={selectedDecisionUIId}
              roomState={roomState}
            />
          ) : (
            <Player
              key={player.id}
              id={player.id}
              playerName={player.nickname}
              pointsHand={player.handPoints}
              pointsBank={player.bankPoints}
              pointsTotal={player.handPoints + player.bankPoints}
              targetMode={player.id !== localPlayerId && targetMode}
              currentPlayerId={currentPlayerId}
              handleSelectTargetPlayer={handleSelectTargetPlayer}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PlayersPanel;
