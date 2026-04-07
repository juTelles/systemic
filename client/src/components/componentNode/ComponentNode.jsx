// eslint-disable-next-line no-unused-vars
import { Tooltip } from 'react-tooltip';
import styles from './ComponentNode.module.css';

function ComponentNode({ anchorRef, ...props }) {
  const {
    type,
    bugAmount,
    label,
    hasTests,
    hasBug,
    isDisabled,
    id,
    handleDecisionSubmit,
  } = props;

  return (
    <div className={styles.ComponentNodeWrapper}>
      {type === 'local' ? (
        <label className={styles.labelUp}>{label}</label>
      ) : null}
      <div
        id={id}
        role="button"
        tabIndex={0}
        onClick={handleDecisionSubmit}
        data-tooltip-id="my-btn"
        ref={anchorRef}
        className={`${
          isDisabled ? styles.ComponentDisabled : styles.ComponentNode
        } ${
          hasTests
            ? styles.testedComponent
            : hasBug
            ? styles.buggyComponent
            : ''
        }`}
        data-status={type}
        title={`${label}\n${hasTests ? 'Testado' : 'Sem Testes'}\n${
          hasBug ? 'Com Bugs' : 'Sem Bugs'
        }`}
      >
        <Tooltip id="my-btn" place="top" variant="dark" />
        <span className={styles.bugQntLed}>
          {bugAmount !== 0 ? bugAmount : ''}
        </span>
      </div>
      {type !== 'local' ? (
        <label className={styles.labelDown}>{label}</label>
      ) : null}
    </div>
  );
}

export default ComponentNode;
