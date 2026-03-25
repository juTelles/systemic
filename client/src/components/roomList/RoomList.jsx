// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import styles from './RoomList.module.css';
import RoomListPlayers from '../roomListPlayers/RoomListPlayers';
import RoomPlayerForm from '../roomPlayerForm/RoomPlayerForm';

function RoomList({ rooms, onJoinRoom }) {
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
                  Sala {room.id} - {room.phase == 'LOBBY'? 'AGUARDANDO' : 'JOGANDO'}
                </li>
              </div>
              <RoomListPlayers
                roomId={room.id}
                room={room}
              />
              {room.playersCount < 4 ? (
                <RoomPlayerForm
                  rooms={rooms}
                  roomId={room.id}
                  room={room}
                  onJoinRoom={onJoinRoom}
                />
              ) : ( ''
              //   <Button
              //   label={'Entrar na sala'}
              //   reversed={true}
              //   width="100%"
              //   height="1.5rem"
              //   inverted={true}
              //   fontSize={'0.8rem'}
              //   margin={'0.5rem 0 0 0.5rem'}
              // />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RoomList;
