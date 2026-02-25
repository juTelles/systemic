// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import Player from '../player/Player';
import SystemStateItem from '../systemStateItem/SystemStateItem';
import styles from './PlayersPanel.module.css';

function PlayersPanel() {
  const players = [
    { playerName: 'Juliana', points: 4, level: 1 },
    { playerName: 'Marcelo', points: 6, level: 2 },
    { playerName: 'Ana C', points: 2, level: 3 },
    { playerName: 'Player 4', points: 0, level: 4 },
  ];

  return (
    <div className={styles.playersPanelWrapper}>
      <h2 className={styles.playersPanelTitle}>Jogadores</h2>
      <div className={styles.playersItemsContainer}>
        {players.map((player) => (
          <Player
            key={player.level}
            playerName={player.playerName}
            playerPoints={player.points}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayersPanel;
