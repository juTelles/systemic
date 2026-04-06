// eslint-disable-next-line no-unused-vars
import styles from './StatusBar.module.css';
import SystemStatesPanel from '../systemStatesPanel/SystemStatesPanel';
import GamePromptPanel from '../gamePromptPanel/GamePromptPanel';
import PlayersPanel from '../playersPanel/PlayersPanel';
import PlayersPanelPreGame from '../playersPanelPreGame/PlayersPanelPreGame';
import { statusBarTxt } from '../../texts/statusBarTxt.js';

function StatusBar({
  roomState,
  isPreGame,
  localPlayerId,
  roomId,
  selectedDecisionUIId,
  handleSelectTargetPlayer,
  selectedTargetPlayerId,
  isReadOnly,
  instructionKey,
}) {
  return (
    <div className={styles.statusBarContainer}>
      <div className={styles.systemStatesPanelWraper}>
        <SystemStatesPanel txt={statusBarTxt.systemStatesPanelTxt} />
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
            roomId={roomId}
            selectedDecisionUIId={selectedDecisionUIId}
            handleSelectTargetPlayer={handleSelectTargetPlayer}
            selectedTargetPlayerId={selectedTargetPlayerId}
            roomState={roomState}
            isReadOnly={isReadOnly}
            txt={statusBarTxt.playersPanelTxt}
          />
        )}
      </div>
    </div>
  );
}

export default StatusBar;
