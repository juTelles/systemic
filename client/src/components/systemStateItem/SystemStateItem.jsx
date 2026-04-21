// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './SystemStateItem.module.css';

function SystemStateItem({ label, active, level }) {
  return (
    <div className={styles.systemStateItemWrapper} data-status={level}>
      <span className={styles.systemStatelabel}>{label}</span>
      <span
        className={`${styles.statusChecker} ${
          active ? styles.statusCheckerActive : ''
        }`}
        data-status={level}
      ></span>
    </div>
  );
}

export default SystemStateItem;
