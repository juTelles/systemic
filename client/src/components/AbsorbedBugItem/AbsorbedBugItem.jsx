// eslint-disable-next-line no-unused-vars
import styles from './AbsorbedBugItem.module.css';

function AbsorbedBugItem({ component }) {
  return (
    <div className={styles.AbsorbedBugItemWrapper}>
      <span className={styles.AbsorbedBugItemLabel}>{component}</span>
    </div>
  );
}

export default AbsorbedBugItem;
