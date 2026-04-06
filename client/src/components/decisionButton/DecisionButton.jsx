// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './DecisionButton.module.css';

function DecisionButton({
  categoryColor,
  isDisabled,
  isRegularDecisionAvailable,
  isTestedDecisionAvailable,
  label,
  costLabel,
  costTestedLabel,
  handleDecisionMade,
  id,
  isChosen,
  isReadOnly,
  instructionKey,
  isPreGame,
}) {
  return (
    <div className={styles.decisionButtonWrapper}>
      <button
        className={
          isChosen ? styles.decisionButton : styles.decisionButtonChosen
        }
        style={{
          '--category-color': categoryColor,
          cursor: isReadOnly ? 'default' : 'pointer',
        }}
        onClick={() => handleDecisionMade(id, instructionKey)}
        disabled={isDisabled}
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
    </div>
  );
}

export default DecisionButton;
