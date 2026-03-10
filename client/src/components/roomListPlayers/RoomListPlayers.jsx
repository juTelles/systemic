import styles from './RoomListPlayers.module.css';
import Button from '../button/Button';
import { leaveRoom } from '../../api/roomsApi';

function RoomListPlayers({ roomId, room }) {

  const handleLeave = (playerId) => {
    const playerLeave = async () => {
      try {
        const player = await leaveRoom(roomId, playerId);
        console.log('Player leaved room successfully:', player);
      } catch (err) {
        console.error(`Failed to leave room ${roomId}:`, err);
        console.error(err);
      }
    };
    playerLeave();
    console.log(`Player left room ${roomId}`);
  };
  return (
    <div key={roomId} className={styles.roomListPlayersContainer}>
      {room.players.map((player, index) => (
        <div
        key={`${player.id}-${index}`}
        className={styles.roomListPlayersWrapper}
        >
          <div className={styles.playerItem}>{player.nickname}</div>
          <Button
            label={'X'}
            width={'10%'}
            borderRadius={'0px'}
            onClick={() => handleLeave(player?.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default RoomListPlayers;
