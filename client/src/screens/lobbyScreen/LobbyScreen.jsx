import styles from './LobbyScreen.module.css';
import { createRoom } from './../../api/roomsApi';
import Button from '../../components/button/Button';
import RoomList from '../../components/roomList/RoomList';
import { useRoomsPolling } from '../../hooks/useRoomsPolling';
import { joinRoom } from '../../api/roomsApi';
import LobbyHeader from '../../components/lobbyHeader/LobbyHeader';
import lobbyTxt from '../../texts/lobbyTxt.js';
import { useState } from 'react';
import SideBarMenu from '../../components/sideBarMenu/SideBarMenu.jsx';

function LobbyScreen({ onJoinSuccess }) {
  const { rooms } = useRoomsPolling(2000);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [menuTypeOpen, setIsMenuTypeOpen] = useState(false);

  function handleOpenSideBar(menuType) {
    setIsSideBarOpen(true);
    setIsMenuTypeOpen(menuType);
  }
  function handleCloseSideBar() {
    setIsSideBarOpen(false);
  }

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
      <LobbyHeader
        txt={lobbyTxt}
        title={lobbyTxt?.gameTitle?.pt}
        handleOpenSideBar={handleOpenSideBar}
      />
      <div className={styles.lobbyWrapper}>
        <RoomList rooms={rooms} onJoinRoom={handleJoinRoom} txt={lobbyTxt} />
        <div className={styles.buttonsWrapper}>
          <Button
            label={lobbyTxt?.roomListButtons?.createRoomButton?.pt}
            width="8rem"
            height="3rem"
            color={'var(--ciano)'}
            onClick={handleCreateRoom}
            title={lobbyTxt?.roomListButtons?.createRoomButton?.pt}
          />
        </div>
        <span className={styles.bottomInfo}>
          {lobbyTxt?.nicknameWarning?.pt}
        </span>
      </div>
      <SideBarMenu
        isSideBarOpen={isSideBarOpen}
        handleCloseSideBar={handleCloseSideBar}
        isLobby={true}
        menuTypeOpen={menuTypeOpen}
      />
    </div>
  );
}

export default LobbyScreen;
