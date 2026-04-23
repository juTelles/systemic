import styles from './RoomListPlayers.module.css';

function RoomListPlayers({ roomId, room }) {
  return (
    <div key={roomId} className={styles.roomListPlayersContainer}>
      {room.players.map((player, index) => (
        <div
          key={`${player.id}-${index}`}
          className={styles.roomListPlayerItemWrapper}
        >
          <div className={styles.roomListPlayerNickname}>{player.nickname}</div>
          <div className={styles.roomListPlayerStatus}>
            {player.status === 'WAITING'
              ? 'ESPERANDO'
              : player.status === 'READY'
              ? 'PRONTO'
              : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomListPlayers;
