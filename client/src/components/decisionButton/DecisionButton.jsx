// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './DecisionButton.module.css';

function DecisionOption({ optionDescription, cost, type, categoryColor }) {
  function handleClick() {
    console.log(`Option clicked: ${optionDescription} with cost ${cost}`);
  }

  return (
    <div className={styles.decisionOptionWrapper}>
      <button
        style={{ '--category-color': categoryColor }}
        className={styles.optionButton}
        onClick={handleClick}
      >
        {optionDescription}
        <br />
        {(type !== 'holdPoints') & (type !== 'givePoints')
          ? `${cost} Pontos`
          : `Limite: ${cost} Pontos`}
      </button>
    </div>
  );
}

export default DecisionOption;
