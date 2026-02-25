// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './HeaderButton.module.css';

function HeaderButton({label}) {
  return (
    <button className={styles.headerButton}>
      {label}
    </button>
  );
}

export default HeaderButton;
