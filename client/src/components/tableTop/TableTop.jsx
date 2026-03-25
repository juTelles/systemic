// eslint-disable-next-line no-unused-vars
import styles from './TableTop.module.css';
import Board from '../board/Board';

function TableTop({
  roomState,
  isPreGame,
  localPlayerId,
  roomId,
  waitDecisionTarget,
  handleTargetSelected
}) {
  return (
    <div className={styles.tableTopContainer}>
      <Board
        roomState={roomState}
        isPreGame={isPreGame}
        localPlayerId={localPlayerId}
        roomId={roomId}
        waitDecisionTarget={waitDecisionTarget}
        handleTargetSelected={handleTargetSelected}
      />
    </div>
  );
}

export default TableTop;
