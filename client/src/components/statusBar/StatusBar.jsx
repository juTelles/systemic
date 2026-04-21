// eslint-disable-next-line no-unused-vars
import styles from './StatusBar.module.css';
import SystemStatesPanel from '../systemStatesPanel/SystemStatesPanel';
import GamePromptPanel from '../instructionsPanel/InstructionsPanel.jsx';
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
  return (
    <div className={styles.statusBarContainer}>
      <div className={styles.systemStatesPanelWraper}>
        <SystemStatesPanel
          txt={statusBarTxt.systemStatesPanelTxt}
          systemHealth={roomState?.system?.healthState}
        />
      </div>
      <div className={styles.gamePromptPanelWraper}>
        <GamePromptPanel
          roomState={roomState}
          instructionKey={instructionKey}
          step={roomState?.flow?.step?.name || ''}
          txt={statusBarTxt.gamePromptPanelTxt}
        />
      </div>
      <div className={styles.playersPanelWraper}>
        {isPreGame ? (
          <PlayersPanelPreGame
            players={roomState?.players}
            localPlayerId={localPlayerId}
            roomId={roomId}
            txt={statusBarTxt.playersPanelPreGameTxt}
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
          />
        )}
      </div>
    </div>
  );
}

export default StatusBar;
