// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './StatusBar.module.css';
import SystemStatesPanel from '../systemStatesPanel/SystemStatesPanel';
import GamePromptPanel from '../gamePromptPanel/GamePromptPanel';
import PlayersPanel from '../playersPanel/PlayersPanel';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import CardBack from '../cardBack/CardBack';

function StatusBar({ roomState, isPreGame, localPlayerId, roomId }) {

  return (
    // console.log('TopBar renderizado com roomState:', roomState),
    <div className={styles.statusBarContainer}>
      <div className={styles.systemStatesPanelWraper}>
      <SystemStatesPanel />
      </div>
      <div className={styles.gamePromptPanelWraper}>
      <GamePromptPanel step={roomState?.flow?.step?.name || ''}/>
      </div>
      <div className={styles.playersPanelWraper}>
      <PlayersPanel
        players={roomState?.players}
        isPreGame={isPreGame}
        localPlayerId={localPlayerId}
        roomId={roomId}
      />
      </div>
    </div>
  );
}

export default StatusBar;
