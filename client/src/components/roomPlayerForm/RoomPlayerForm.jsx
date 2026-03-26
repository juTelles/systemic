// eslint-disable-next-line no-unused-vars
import Button from '../button/Button';
import styles from './RoomPlayerForm.module.css';
import { useState } from 'react';
import { getErrorMessage } from '../../texts/errorsMessages';

function RoomPlayerForm({ room, onJoinRoom }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const trimmedInputValue = inputValue.trim();
    const result = await onJoinRoom(room, trimmedInputValue);
    if (!result.ok) {
      setError(getErrorMessage(result.code));
    }
  };

  return (
    <div className={styles.roomPlayerFormContainer}>
      <form
        className={styles.playersFormWrapper}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          maxLength="8"
          placeholder="escolha um apelido..."
          className={styles.playerForm}
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          label="+"
          width="10%"
          height="100%"
          inverted={true}
          borderRadius="0px"
        />
      </form>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default RoomPlayerForm;
