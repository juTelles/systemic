// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import styles from './GamePromptPanel.module.css';

function GamePromptPanel({ text }) {
  return (
    <div className={styles.gamePromptPanelWrapper}>
      <h2 className={styles.gamePromptPanelTitle}>Instruções</h2>
      <div className={styles.gamePromptPanel}>
        <p className={styles.gamePromptPanelText}>{text}</p>
      </div>
    </div>
  );
}

export default GamePromptPanel;
