// eslint-disable-next-line no-unused-vars
import Player from '../player/Player';
import PlayerPointsForm from '../playerPointsForm/PlayerPointsForm';
import styles from './PlayersPanel.module.css';
import { useState } from 'react';

function PlayersPanel({
  players,
  localPlayerId,
  selectedDecisionUIId,
  roomState,
  isReadOnly,
  txt,
}) {
  const currentPlayerId = roomState?.flow?.currentPlayerId;
  const currentPlayer = selectedDecisionUIId == 'HOLD_POINTS' ? localPlayerId : null;
  const [selectedTargetPlayerId, setSelectedTargetPlayerId] = useState(currentPlayer);

  const targetMode = selectedDecisionUIId == 'DONATE_POINTS' ? true : false;

  const handleSelectTargetPlayer = (player) => {
    setSelectedTargetPlayerId(player);
    console.log('Jogador selecionado:', player);
  };

  return (
    <div className={styles.playersPanelContainer}>
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
          const inputMode =
            !isReadOnly && selectedTargetPlayerId === player.id &&
            (currentPlayer ||
            (targetMode && player.id !== localPlayerId));

          return inputMode ? (
            <PlayerPointsForm
              key={player.id}
              id={player.id}
              playerName={player.nickname}
              pointsTotal={player.handPoints + player.bankPoints}
              pointsHand={player.handPoints}
              pointsBank={player.bankPoints}
              maxPoints={roomState?.gameConfig?.taskPoints?.maxPlayerPoints}
            />
          ) : (
            <Player
              key={player.id}
              id={player.id}
              playerName={player.nickname}
              pointsHand={player.handPoints}
              pointsBank={player.bankPoints}
              pointsTotal={player.handPoints + player.bankPoints}
              localPlayerId={localPlayerId}
              targetMode={targetMode}
              currentPlayerId={currentPlayerId}
              handleSelectTargetPlayer={handleSelectTargetPlayer}
              selectedTargetPlayerId={selectedTargetPlayerId}
              maxPoints={roomState?.gameConfig?.taskPoints?.maxPlayerPoints}
              inputMode={inputMode}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PlayersPanel;
