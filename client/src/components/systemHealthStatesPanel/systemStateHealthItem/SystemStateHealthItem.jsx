// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './SystemStateHealthItem.module.css';

function SystemStateHealthItem({ label, active, level }) {
  return (
    <div className={styles.systemHealthStateItemWrapper} data-status={level}>
      <span className={styles.systemHealthStateItemlabel}>{label}</span>
      <span
        className={`${styles.statusChecker} ${
          active ? styles.statusCheckerActive : ''
        }`}
        data-status={level}
      ></span>
    </div>
  );
}

export default SystemStateHealthItem;
