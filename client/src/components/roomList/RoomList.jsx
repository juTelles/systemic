// eslint-disable-next-line no-unused-vars
import styles from './RoomList.module.css';
import RoomListPlayers from './roomListPlayers/RoomListPlayers.jsx';
import RoomPlayerForm from './roomPlayerForm/RoomPlayerForm';

function RoomList({ rooms, onJoinRoom, txt }) {
  return (
    <div className={styles.roomListContainer}>
      <h2 className={styles.roomListTitle}>Salas</h2>
      <div className={styles.roomListWrapper}>
        {rooms.length === 0 ? (
          <p className={styles.noRoomsMessage}>Nenhuma sala disponível</p>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className={styles.roomItemWrapper}>
              <div key={room.id} className={styles.roomItemHeader}>
                <li className={styles.roomItem}>
                  <div className={styles.roomItemTitle}>
                    {`${txt.roomListItems.room.pt} ${room.id} - ${txt.roomListItems.status[room.phase].pt}`}
                  </div>
                  <div className={styles.roomItemConfig}>
                    {`${txt.roomListItems.config[room?.gameConfig?.id]?.pt}`}
                  </div>
                </li>
              </div>
              <RoomListPlayers roomId={room.id} room={room} />
              {room.playersCount < 4 ? (
                <RoomPlayerForm
                  rooms={rooms}
                  roomId={room.id}
                  room={room}
                  onJoinRoom={onJoinRoom}
                />
              ) : (
                ''
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RoomList;
