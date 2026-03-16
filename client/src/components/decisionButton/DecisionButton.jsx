// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './DecisionButton.module.css';

function DecisionButton({ optionDescription, cost, type, categoryColor }) {
  function handleClick() {
    console.log(`Option clicked: ${optionDescription} with cost ${cost}`);
  }

  return (
    <div className={styles.decisionButtonWrapper}>
      <button
        style={{ '--category-color': categoryColor }}
        className={styles.decisionButton}
        onClick={handleClick}
      >
        {optionDescription}
        <br />
        {type === 'BUG' ? (
          <>
            {`${cost} Pontos`}
            <br />
            {`Testado: ${cost} Pontos`}
          </>
        ) : type === 'POINTS' ? (
          <>{`Limite: ${cost} Pontos`}</>
        ) : (
          `${cost} Pontos`
        )}
      </button>
    </div>
  );
}

export default DecisionButton;
