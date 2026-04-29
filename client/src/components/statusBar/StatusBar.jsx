import styles from './StatusBar.module.css';
import SystemHealthStatesPanel from '../systemHealthStatesPanel/SystemHealthStatesPanel.jsx';
import InstructionsPanel from '../instructionsPanel/InstructionsPanel.jsx';
import PlayersPanel from '../playersPanel/PlayersPanel';
import PlayersPanelPreGame from '../playersPanelPreGame/PlayersPanelPreGame';
import { statusBarTxt } from '../../texts/statusBarTxt.js';

function StatusBar({
  roomState,
  isPreGame,
  localPlayerId,
  roomId,
  selectedDecisionUIId,
  isReadOnly,
  instructionKey,
  handleDecisionSubmit,
}) {
  const inputMode =
    !isReadOnly &&
    (selectedDecisionUIId === 'HOLD_POINTS' ||
      selectedDecisionUIId === 'DONATE_POINTS');
  return (
    <div className={styles.statusBarContainer}>
      <div className={styles.systemStatesPanelWraper}>
        <SystemHealthStatesPanel
          txt={statusBarTxt.systemStatesPanelTxt}
          systemHealth={roomState?.system?.healthState}
          crisisRound={roomState?.system?.isCrisisRound}
        />
      </div>
      <div className={`${styles.instructionsPanelWraper} ${inputMode ? styles.inputMode : ''}`}>
        <InstructionsPanel
          roomState={roomState}
          instructionKey={instructionKey}
          step={roomState?.flow?.step?.name || ''}
          txt={statusBarTxt.gamePromptPanelTxt}
          isReadOnly={isReadOnly}
          decisionUIId={selectedDecisionUIId}
        />
      </div>
      <div className={`${styles.playersPanelWraper} ${inputMode ? styles.inputMode : ''}`}>
        {isPreGame ? (
          <PlayersPanelPreGame
            players={roomState?.players}
            localPlayerId={localPlayerId}
            roomId={roomId}
            txt={statusBarTxt.playersPanelPreGameTxt}
            gameConfigId={roomState?.gameConfig.id}
          />
        ) : (
          <PlayersPanel
            players={roomState?.players}
            localPlayerId={localPlayerId}
            selectedDecisionUIId={selectedDecisionUIId}
            roomState={roomState}
            isReadOnly={isReadOnly}
            txt={statusBarTxt.playersPanelTxt}
            handleDecisionSubmit={handleDecisionSubmit}
            inputMode={inputMode}
          />
        )}
      </div>
    </div>
  );
}

export default StatusBar;
