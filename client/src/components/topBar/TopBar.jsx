// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './TopBar.module.css';
import SystemStatesPanel from '../systemStatesPanel/SystemStatesPanel';
import GamePromptPanel from '../gamePromptPanel/GamePromptPanel';
import PlayersPanel from '../playersPanel/PlayersPanel';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';

function TopBar() {
  // const {
  // } = props;

  return (
    <div className={styles.topBarWrapper}>
      <SystemStatesPanel />
      <GamePromptPanel text="Vez do Jogador 1" />
      <PlayersPanel />
      <AbsorbedBugsPanel />
    </div>
  );
}

export default TopBar;
