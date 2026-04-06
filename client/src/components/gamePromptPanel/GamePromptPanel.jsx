// eslint-disable-next-line no-unused-vars
import styles from './GamePromptPanel.module.css';
import { instructions } from '../../../../shared/src/definitions/instructions';

function GamePromptPanel({ step, instructionKey, roomState, txt }) {
  const gameInstructions = instructions(roomState?? null);
  const currentInstruction = instructionKey
    ? gameInstructions[step]?.additionalDescriptions?.[instructionKey]?.pt
    : gameInstructions[step]?.description?.pt;
  return (
    <div className={styles.gamePromptPanelContainer}>
      <h2 className={styles.gamePromptPanelTitle}>Instruções</h2>
      <div className={styles.gamePromptPanel}>
        <p className={styles.gamePromptPanelText}>{currentInstruction}</p>
      </div>
    </div>
  );
}

export default GamePromptPanel;
