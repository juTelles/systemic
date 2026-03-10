// eslint-disable-next-line no-unused-vars
import Button from '../button/Button';
import styles from './RoomPlayerForm.module.css';
import { useState } from 'react';
import { joinRoom } from '../../api/roomsApi';

function RoomPlayerForm({ roomId, room }) {
  const [inputValue, setInputValue] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [playerId, setPlayerId] = useState('');
  // const [roomId, setRoomId] = useState('');
  // const player = {
  //   nickname: '',
  //   playerId: '',
  //   roomId: '',
  // };

  const handleChange = (event) => {
      setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    const validationResult = validateNickname();
    if (validationResult === false) {
      alert('Nickname inválido. Certifique-se de que o nickname tenha entre 1 e 8 caracteres e não seja igual ao de outro jogador na sala.');
      console.log('eeeeeeee',validateNickname());
      return;
    }
    console.log('Submitting nickname:', inputValue);
    const playerJoin = async () => {
      try {
        const player = await joinRoom(room.id, inputValue);
        console.log('Player joined room successfully:', player);
      } catch (err) {
        console.error('Failed to get room list:', err);
        console.error(err);
      }
    };
    playerJoin();
    // setNickname(player.nickname);
    // console.log('Submitted:', inputValue);
    setInputValue(''); // Clear state
  };

const validateNickname = () => {
  let result = true;
  result = inputValue.length >= 8 || inputValue.length < 1 ? true : false;
  console.log('validateNickname result', room.players);
  room.players.map((player) => {
    if (player.nickname === inputValue) {
      result = false;
    }
    return result;
  });
}

  return (
    <div className={styles.roomPlayerFormContainer}>
      <div className={styles.playersFormWrapper}>
        <input
          maxLength="8"
          placeholder="escolha um apelido..."
          className={styles.playerForm}
          type="text"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          label={'+'}
          width={'10%'}
          height={'100%'}
          inverted={true}
          borderRadius={'0px'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default RoomPlayerForm;
