// eslint-disable-next-line no-unused-vars
import styles from './InstructionsPanel.module.css';
import { resolveInstructionTxt } from '../../texts/instructionsPanelTxt/instructionsResolver.js';
import { resolveInstructionEffect } from '../../helpers/instructionEffectResolver.js';

function InstructionsPanel({
  instructionKey,
  roomState,
  isReadOnly,
  decisionUIId,
}) {
  const currentTitle = resolveInstructionTxt(
    roomState,
    instructionKey,
    'title',
    'pt',
  );
  const currentInstruction = resolveInstructionTxt(
    roomState,
    instructionKey,
    'description',
    'pt',
  );
  const step = roomState?.flow?.step?.name;
  const stepInstructionKey = roomState?.flow?.step?.stepInstructionKey;
  const shine = resolveInstructionEffect({
    step,
    isReadOnly,
    decisionUIId,
    stepInstructionKey,
  });

  return (
    <div className={`${styles.instructionsPanelContainer} ${styles[shine] || ''}`}>
      <div className={styles.instructionsPanelTitleBox}>
        <h2 className={styles.instructionsPanelTitle}>{currentTitle}</h2>
      </div>
      <div className={styles.instructionsPanelTextBox}>
        <p className={styles.instructionsPanelText}>{currentInstruction}</p>
      </div>
    </div>
  );
}

export default InstructionsPanel;
