// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './GameHeader.module.css';
import Button from '../button/Button';

function GameHeader({ title, }) {
  // const handleClick = () => {
  //   alert('Em desenvolvimento');
  // };

  return (
    <header className={styles.header}>
      <div className={styles.menuButtonDiv}>
      <Button label="Opções" margin={'1rem 2rem'} padding={'8px 20px'} />
      </div>
      <div className={styles.titleDiv}>
        <h1 className={styles.gameTitle}>{title}</h1>
      </div>
      <div className={styles.rulesButtonDiv}>
      <Button label="Regras"  margin={'1rem 2rem'} padding={'8px 20px'}/>
      </div>
    </header>
  );
}

export default GameHeader;
