// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import DecisionButton from '../decisionButton/DecisionButton';
import styles from './DecisionsPanel.module.css';
import { decisions } from '../../../../shared/src/definitions/decisons';
import { decisionsTxt } from '../../texts/decisionsTxt';

function DecisionsPanel({ roomState, isPreGame, localPlayerId }) {

    const costs = roomState?.gameConfig?.decisionCosts;
    console.log('DecisionsPanel renderizado com roomState:', decisions);

      if (!costs) return null;

      return (
        <div className={styles.decisionsPanelWrapper}>
      <div className={styles.decisionsContainer}>
        {decisions.forUI.map((id) => {
            return (
              <DecisionButton
                key={decisions.options[id].id}
                id={decisions.options[id].id}
                optionDescription={decisionsTxt[decisions.options[id].id].label.pt}
                cost={costs[decisions.options[id].costType]}
                categoryColor={decisionsTxt[decisions.options[id].id].categoryColor}
                isPreGame={isPreGame}
                localPlayerId={localPlayerId}
                type={decisions.options[id].type}
              />
            );
          })}
      </div>
    </div>
  )
}
// TODO: Adress the decisionsPanelWrapper class mismatch
export default DecisionsPanel;

// TODO: Change categoryColor to be defined in the color css variables, and then use the variable name in the decisionsTxt, instead of the hex color directly. This way we can keep all colors in one place and make it easier to update them in the future.