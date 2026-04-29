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
  inputMode
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

  const handleSelectTargetPlayer = (playerId) => {
    if (targetMode && !isReadOnly) {
      setSelectedTargetPlayerId(playerId);
    }
  };
  const sendButtonToolTip  = txt.sendButton.pt || 'Send';
  return (
    <div className={`${styles.playersPanelContainer} ${inputMode ? styles.cianoShine : ''}`}>
      <div className={`${styles.gridRow} ${styles.playersPanelHeader}`}>
        <h2 className={styles.playersPanelTitle}>{txt.playerTitle.pt}</h2>
        <h2 className={styles.playersPanelTitle}>{txt.handPointsTitle.pt}</h2>
        <h2 className={styles.playersPanelTitle}>{txt.bankPointsTitle.pt}</h2>
        <h2 className={styles.playersPanelTitle}>{txt.totalPointsTitle.pt}</h2>
        {inputMode? <h2 className={styles.playersPanelTitle}>{`Enviar`}</h2> : null}
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
              sendButtonToolTip={sendButtonToolTip}
            />
          ) : (
            <Player
              key={player.id}
              id={player.id}
              sendButtonToolTip={sendButtonToolTip}
              playerName={player.nickname}
              pointsHand={player.handPoints}
              pointsBank={player.bankPoints}
              pointsTotal={player.handPoints + player.bankPoints}
              targetMode={player.id !== localPlayerId && targetMode}
              currentPlayerId={currentPlayerId}
              handleSelectTargetPlayer={handleSelectTargetPlayer}
              inputMode={inputMode}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PlayersPanel;
