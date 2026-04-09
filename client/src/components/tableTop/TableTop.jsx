// eslint-disable-next-line no-unused-vars
import styles from './TableTop.module.css';
import Board from '../board/Board';
import BoardB from '../board/BoardB';

function TableTop({
  roomState,
  isPreGame,
  localPlayerId,
  roomId,
  waitDecisionTarget,
  handleDecisionSubmit,
  selectedDecisionUIId
}) {
  return (
    <div className={styles.tableTopContainer}>
      <BoardB
        roomState={roomState}
        isPreGame={isPreGame}
        localPlayerId={localPlayerId}
        roomId={roomId}
        waitDecisionTarget={waitDecisionTarget}
        handleDecisionSubmit={handleDecisionSubmit}
        selectedDecisionUIId={selectedDecisionUIId}
      />
    </div>
  );
}

export default TableTop;
