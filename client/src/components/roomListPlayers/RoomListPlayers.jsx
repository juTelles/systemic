import styles from './RoomListPlayers.module.css';

function RoomListPlayers({ roomId, room,}) {

  return (
    <div key={roomId} className={styles.roomListPlayersContainer}>
      {room.players.map((player, index) => (
        <div
          key={`${player.id}-${index}`}
          className={styles.roomListPlayersWrapper}
        >
          <div className={styles.playerItem}>{player.nickname}</div>
        </div>
      ))}
    </div>
  );
}

export default RoomListPlayers;
