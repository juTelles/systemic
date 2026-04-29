import { NODE_TYPES } from '../../../../shared/src/definitions/components.js';
import { Tooltip } from 'react-tooltip';
import styles from '../board/Board.module.css';

function ComponentNode({ anchorRef, ...props }) {
  const {
    type,
    bugAmount,
    label,
    hasTests,
    hasBug,
    isDisabled,
    id,
    handleSubmit,
  } = props;

  const title = `Componente ${type === NODE_TYPES.LOCAL ? 'Local' : type === NODE_TYPES.STRUCTURAL ? 'Estrutural' : ''} ${label}\n${hasTests ? 'Testado' : 'Sem Testes'}\n${
    hasBug ? `${bugAmount} Bugs` : 'Sem Bugs'
  }`;

  return (
    <div className={styles.ComponentNodeWrapper}>
      {type === NODE_TYPES.LOCAL ? (
        <label className={styles.labelUp}>{label}</label>
      ) : null}
      <div
        id={id}
        role="button"
        tabIndex={0}
        onClick={handleSubmit}
        data-tooltip-id="nodes"
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
        title={title}
      >
        <Tooltip id="nodes" place="top" variant="light" />
        <span className={styles.bugQntLed}>
          {bugAmount !== 0 ? bugAmount : ''}
        </span>
      </div>
      {type !== NODE_TYPES.LOCAL ? (
        <label className={styles.labelDown}>{label}</label>
      ) : null}
    </div>
  );
}

export default ComponentNode;
