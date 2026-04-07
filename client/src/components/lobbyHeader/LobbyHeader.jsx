// eslint-disable-next-line no-unused-vars
import styles from './LobbyHeader.module.css';
import Button from '../button/Button';

function LobbyHeader({ title }) {
  return (
    <header className={styles.lobbyHeader}>
      <div className={styles.menuButtonDiv}>
        <Button
          width={'6rem'}
          height={'1.5rem'}
          label="Opções"
          margin={'1rem 2rem'}
          padding={'8px 20px'}
          color={'var(--ciano)'}
        />
      </div>
      <div className={styles.titleDiv}>
        <h1 className={styles.gameTitle}>{title}</h1>
      </div>
      <div className={styles.rulesButtonDiv}>
        <Button
          width={'6rem'}
          height={'1.5rem'}
          label="Regras"
          margin={'1rem 2rem'}
          padding={'8px 20px'}
          color={'var(--ciano)'}
        />
      </div>
    </header>
  );
}

export default LobbyHeader;
