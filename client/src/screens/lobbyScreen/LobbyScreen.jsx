// eslint-disable-next-line no-unused-vars
import styles from './LobbyScreen.module.css';
import Header from '../../components/header/Header';

function LobbyScreen() {
  return (
    <div className={styles.pageContainer}>
            {console.log('room', rooms)}
      <Header title="Systemic" />
      <div className={styles.lobbyWrapper}>
        <RoomList rooms={rooms}/>
        <div className={styles.buttonsWrapper}>
          <Button
            label={'Entrar na sala'}
            reversed={true}
            width="10rem"
            height="4rem"
            inverted={true}
          />
          <Button
            label={'Criar uma sala'}
            width="10rem"
            height="4rem"
            onClick={handleCreateRoom}
          />
        </div>
        <span className={styles.bottomInfo}>Escolha um apelido com até 8 caracteres</span>
      </div>
    </div>
  );
}

export default LobbyScreen;
