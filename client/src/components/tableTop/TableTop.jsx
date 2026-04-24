// eslint-disable-next-line no-unused-vars
import styles from './TableTop.module.css';
import Board from '../board/Board';

function TableTop({
  roomState,
  isPreGame,
  handleDecisionSubmit,
  selectedDecisionUIId,
  isReadOnly
}) {

  return (
    <div className={styles.tableTopContainer}>
      <Board
        roomState={roomState}
        isPreGame={isPreGame}
        handleDecisionSubmit={handleDecisionSubmit}
        selectedDecisionUIId={selectedDecisionUIId}
        isReadOnly={isReadOnly}
      />
    </div>
  );
}

export default TableTop;
