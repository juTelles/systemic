import styles from './DecisionButton.module.css';
import { Tooltip } from 'react-tooltip';

function DecisionButton({
  categoryColor,
  isDisabled,
  isRegularDecisionAvailable,
  isTestedDecisionAvailable,
  label,
  costLabel,
  costTestedLabel,
  handleDecisionUISelect,
  id,
  isChosen,
  isReadOnly,
  instructionKey,
  isPreGame,
  title,
}) {
  return (
    <div className={styles.decisionButtonWrapper}>
      <button
        className={
          isChosen ? styles.decisionButtonChosen : styles.decisionButton
        }
        style={{
          '--category-color': categoryColor,
          cursor: isReadOnly ? 'default' : 'pointer',
        }}
        onClick={() => handleDecisionUISelect(id, instructionKey)}
        disabled={isDisabled}
        data-tooltip-id="decisionButton"
        title={title}
      >
        <span>{label}</span>
        <span
          className={
            !isRegularDecisionAvailable && !isPreGame ? styles.grayText : ''
          }
        >
          {costLabel}
        </span>
        {costTestedLabel ? (
          <span
            className={
              !isTestedDecisionAvailable && !isPreGame ? styles.grayText : ''
            }
          >
            {costTestedLabel}
          </span>
        ) : null}
      </button>
      <Tooltip id="decisionButton" place="top" variant="light" />
    </div>
  );
}

export default DecisionButton;
