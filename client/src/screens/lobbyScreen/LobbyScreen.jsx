import styles from './LobbyScreen.module.css';
import { createRoom } from './../../api/roomsApi';
import Button from '../../components/button/Button';
import RoomList from '../../components/RoomList/RoomList';
import { useRoomsPolling } from '../../hooks/useRoomsPolling';
import { joinRoom } from '../../api/roomsApi';
import LobbyHeader from '../../components/lobbyHeader/LobbyHeader';

function LobbyScreen({ onJoinSuccess }) {
  const { rooms } = useRoomsPolling(2000);

  async function handleCreateRoom() {
    try {
      await createRoom();
    } catch (err) {
      console.error('Failed to createRoom:', err);
    }
  }

  const handleJoinRoom = (room, nickname) => {
    const playerJoin = async () => {
      try {
        const result = await joinRoom(room.id, nickname);
        if (result.ok) {
          onJoinSuccess(room.id, result.playerId);
        }
        return result;
      } catch (err) {
        console.error('Failed to get room list:', err);
      }
    };
    const result = playerJoin();
    return result;
  };

  return (
    <div className={styles.pageContainer}>
      <LobbyHeader title="Systemic" />
      <div className={styles.lobbyWrapper}>
        <RoomList rooms={rooms} onJoinRoom={handleJoinRoom} />
        <div className={styles.buttonsWrapper}>
          <Button
            label={'Criar uma sala'}
            width="10rem"
            height="4rem"
            onClick={handleCreateRoom}
          />
        </div>
        <span className={styles.bottomInfo}>
          Escolha um apelido com até 8 caracteres
        </span>
      </div>
    </div>
  );
}

export default LobbyScreen;
