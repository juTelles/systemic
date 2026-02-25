// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './Header.module.css';
import HeaderButton from '../headerButton/HeaderButton';

function Header({ title }) {
  // const handleClick = () => {
  //   alert('Em desenvolvimento');
  // };

  return (
    <header className={styles.header}>
      <HeaderButton label="Opções"/>
      <div className={styles.titleDiv}>
        <h1 className={styles.gameTitle}>{title}</h1>
      </div>
      <HeaderButton label="Regras"/>
    </header>
  );
}

export default Header;
