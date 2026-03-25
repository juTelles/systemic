// eslint-disable-next-line no-unused-vars
import styles from './ActionBar.module.css';
import DecisionsPanel from '../decisionsPanel/DecisionsPanel';
import CardBack from '../cardBack/CardBack';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import { useState } from 'react';

function ActionBar({roomState, isPreGame, localPlayerId}) {
  const [decisionId, setDecisionId] = useState(null);

  const handleChooseDecision = (decisionId) => {
    setDecisionId(decisionId);
  }

  return (
    <div className={styles.actionBarContainer}>
      <DecisionsPanel roomState={roomState} isPreGame={isPreGame} localPlayerId={localPlayerId} />
    </div>
  );
}

export default ActionBar;
