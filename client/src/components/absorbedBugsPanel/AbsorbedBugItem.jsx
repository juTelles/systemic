import styles from './AbsorbedBugsPanel.module.css';

function AbsorbedBugItem({ component }) {
  return (
    <div className={`${styles.absorbedBugItemWrapper} ${styles.updated}`}>
      <span className={styles.absorbedBugItemLabel}>{component}</span>
    </div>
  );
}

export default AbsorbedBugItem;
