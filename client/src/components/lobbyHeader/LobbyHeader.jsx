// eslint-disable-next-line no-unused-vars
import styles from './LobbyHeader.module.css';
import Button from '../button/Button';

function LobbyHeader({ title, txt, handleOpenSideBar }) {
  return (
    <header className={styles.lobbyHeader}>
      <div className={styles.menuButtonDiv}>
        <Button
          width={'6rem'}
          height={'1.5rem'}
          label={txt?.roomListButtons?.optionsButton?.pt}
          margin={'1rem 2rem'}
          padding={'8px 20px'}
          color={'var(--ciano)'}
          onClick={() => handleOpenSideBar('MENU')}
        />
      </div>
      <div className={styles.titleDiv}>
        <h1 className={styles.gameTitle}>{title}</h1>
      </div>
      <div className={styles.rulesButtonDiv}>
        <Button
          width={'6rem'}
          height={'1.5rem'}
          label={txt?.roomListButtons?.rulesButton?.pt}
          margin={'1rem 2rem'}
          padding={'8px 20px'}
          color={'var(--ciano)'}
          onClick={() => handleOpenSideBar('RULES')}
        />
      </div>
    </header>
  );
}

export default LobbyHeader;
