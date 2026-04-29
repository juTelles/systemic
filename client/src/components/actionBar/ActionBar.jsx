import styles from './ActionBar.module.css';
import DecisionsPanel from '../decisionsPanel/DecisionsPanel';

function ActionBar({
  roomState,
  isPreGame,
  localPlayerId,
  handleDecisionUISelect,
  selectedDecisionUIId,
  isReadOnly,
  currentPlayerId,
}) {
  return (
    <div className={styles.actionBarContainer}>
      <DecisionsPanel
        roomState={roomState}
        isPreGame={isPreGame}
        localPlayerId={localPlayerId}
        handleDecisionUISelect={handleDecisionUISelect}
        selectedDecisionUIId={selectedDecisionUIId}
        isReadOnly={isReadOnly}
        currentPlayerId={currentPlayerId}
      />
    </div>
  );
}

export default ActionBar;
