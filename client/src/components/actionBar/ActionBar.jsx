// eslint-disable-next-line no-unused-vars
import styles from './ActionBar.module.css';
import DecisionsPanel from '../decisionsPanel/DecisionsPanel';

function ActionBar({
  roomState,
  isPreGame,
  localPlayerId,
  handleDecisionMade,
  selectedDecisionUIId,
  isReadOnly
}) {
  return (
    <div className={styles.actionBarContainer}>
      <DecisionsPanel
        roomState={roomState}
        isPreGame={isPreGame}
        localPlayerId={localPlayerId}
        handleDecisionMade={handleDecisionMade}
        selectedDecisionUIId={selectedDecisionUIId}
        isReadOnly={isReadOnly}
      />
    </div>
  );
}

export default ActionBar;
