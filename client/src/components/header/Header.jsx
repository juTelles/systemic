// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './Header.module.css';
import Button from '../button/Button';

function Header({ title }) {
  // const handleClick = () => {
  //   alert('Em desenvolvimento');
  // };

  return (
    <header className={styles.header}>
      <Button label="Opções" margin={'1rem 2rem'} padding={'8px 20px'} />
      <div className={styles.titleDiv}>
        <h1 className={styles.gameTitle}>{title}</h1>
      </div>
      <Button label="Regras"  margin={'1rem 2rem'} padding={'8px 20px'}/>
    </header>
  );
}

export default Header;
