// eslint-disable-next-line no-unused-vars
import styles from './GameScreen.module.css';
import Header from '../../components/header/Header';
import BottomPanel from '../../components/bottomPanel/BottomPanel';
import Board from '../../components/board/Board';
import TopBar from '../../components/topBar/TopBar';

function GameScreen() {
  // const {
  // } = props;

  return (
    <div className={styles.pageContainer}>
    <Header title="Systemic" />
    <TopBar />
    <Board />
    <BottomPanel />
  </div>
  );
}

export default GameScreen;
