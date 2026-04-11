// eslint-disable-next-line no-unused-vars
import styles from './TableTop.module.css';
import Board from '../board/Board';

function TableTop({
  roomState,
  isPreGame,
  handleDecisionSubmit,
  selectedDecisionUIId,
}) {

  return (
    <div className={styles.tableTopContainer}>
      <Board
        roomState={roomState}
        isPreGame={isPreGame}
        handleDecisionSubmit={handleDecisionSubmit}
        selectedDecisionUIId={selectedDecisionUIId}
      />
    </div>
  );
}

export default TableTop;
