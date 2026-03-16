// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './TableTop.module.css';
import Board from '../board/Board';
import CardBack from '../cardBack/CardBack';
import AbsorbedBugsPanel from '../absorbedBugsPanel/AbsorbedBugsPanel';

function TableTop({ roomState, isPreGame, localPlayerId, roomId }) {

  return (
    <div className={styles.topBarWrapper}>
      <Board roomState={roomState} isPreGame={isPreGame} localPlayerId={localPlayerId} roomId={roomId}  />
    </div>
  );
}

export default TableTop;
