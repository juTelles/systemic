// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './ArrowButton.module.css';

function ArrowButton({
  label,
  disabled,
  onClick
}) {
  return (
    <div className={styles.container}>
    <button
      className={styles.body}
      onClick={onClick}
      disabled={disabled}
      >
      {label}
    </button>
    </div>
  );
}

export default ArrowButton;
