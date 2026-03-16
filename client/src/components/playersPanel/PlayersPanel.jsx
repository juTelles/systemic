// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import Button from '../button/Button';
import Player from '../player/Player';
import styles from './PlayersPanel.module.css';
import { useRoomActions } from '../../actions/roomsActions';

function PlayersPanel({ players, isPreGame, localPlayerId, roomId }) {

  const { setReady } = useRoomActions(roomId, localPlayerId);

  async function handleReady() {
    const result = await setReady();
    if (!result.ok) {
      console.error('Erro ao marcar como pronto:', result.error);
    }
  };


  return (
    // console.log('PlayersPanel renderizado com players:', players),
    <div className={styles.playersPanelWrapper}>
      <h2 className={styles.playersPanelTitle}>Jogadores</h2>
      <div className={styles.playersItemsContainer}>
        {players?.map(
          (player) =>
            console.log('Renderizando Player:', player) || (
              <Player
              key={player.id}
              playerName={player.nickname}
              playerStatus={player.status}
              playerPoints={player.handPoints + player.bankPoints}
              isPreGame={isPreGame}
              localPlayerId={player.id === localPlayerId}
              handleReady={handleReady}
              />
            )
          )}
      </div>
    </div>
  );
}

export default PlayersPanel;
