// eslint-disable-next-line no-unused-vars
import styles from './AbsorbedBugsPanel.module.css';

function AbsorbedBugItem({ component }) {
  return (
    <div className={`${styles.AbsorbedBugItemWrapper} ${styles.updated}`}>
      <span className={styles.AbsorbedBugItemLabel}>{component}</span>
    </div>
  );
}

export default AbsorbedBugItem;
