// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './StatusBar.module.css';
import SystemStatesPanel from '../systemStatesPanel/SystemStatesPanel';
import GamePromptPanel from '../gamePromptPanel/GamePromptPanel';
import PlayersPanel from '../playersPanel/PlayersPanel';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';
import CardBack from '../cardBack/CardBack';

function StatusBar({ roomState, isPreGame, localPlayerId, roomId }) {
  // const {
  // } = props;

  return (
    // console.log('TopBar renderizado com roomState:', roomState),
    <div className={styles.topBarWrapper}>
      <AbsorbedBugsPanel/>
      <SystemStatesPanel />
      <GamePromptPanel step={roomState?.flow?.step?.name || ''}/>
      <PlayersPanel
        players={roomState?.players}
        isPreGame={isPreGame}
        localPlayerId={localPlayerId}
        roomId={roomId}
      />
      <CardBack />

    </div>
  );
}

export default StatusBar;
