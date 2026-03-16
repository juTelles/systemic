// eslint-disable-next-line no-unused-vars
import react, { Children, useEffect, useState } from 'react';
import styles from './GamePromptPanel.module.css';
import { instructions } from '../../../../shared/src/definitions/instructions';

function GamePromptPanel({ step }) {
  return (
    <div className={styles.gamePromptPanelWrapper}>
      <h2 className={styles.gamePromptPanelTitle}>Instruções</h2>
      <div className={styles.gamePromptPanel}>
        <p className={styles.gamePromptPanelText}>
          {instructions()[step]?.description?.pt}
        </p>
      </div>
    </div>
  );
}

export default GamePromptPanel;
