// eslint-disable-next-line no-unused-vars
import styles from './LobbyScreen.module.css';
import Header from '../../components/header/Header';

function LobbyScreen() {
  return (
    <div className={styles.pageContainer}>
      <Header title="Systemic" />
      <div className={styles.formWrapper}>
        <div className={styles.startButtonWrapper}>
          <button className={styles.startButton} onClick={'a'}>
            {' '}
            START GAME
          </button>
          <label>Escolha um apelido com até 8 caracteres:</label>
          <input type="text" className={styles.nameInput}></input>
        </div>
      </div>
    </div>
  );
}

export default LobbyScreen;
