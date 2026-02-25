// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './ComponentNode.module.css';

function ComponentNode({ anchorRef, ...props }) {
  const { type, bugQtn, label, hasTests, hasBug } = props;

  return (
    <div className={styles.ComponentNodeWrapper}>
      {type === 'local' ? (
        <label className={styles.labelUp}>{label}</label>
      ) : null}
      <div
        ref={anchorRef}
        className={`${styles.ComponentNode} ${
          hasTests
            ? styles.testedComponent
            : hasBug
            ? styles.buggyComponent
            : ''
        }`}
        data-status={type}
      >
        <span className={styles.bugQntLed}>{bugQtn !== 0 ? bugQtn : ''}</span>
      </div>
      {type !== 'local' ? (
        <label className={styles.labelDown}>{label}</label>
      ) : null}
    </div>
  );
}

export default ComponentNode;
