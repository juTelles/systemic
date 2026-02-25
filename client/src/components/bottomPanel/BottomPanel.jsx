// eslint-disable-next-line no-unused-vars
import styles from './BottomPanel.module.css';
import DecisionsPanel from '../DecisionsPanel/DecisionsPanel';
import CardBack from '../cardBack/CardBack';

function BottomPanel() {
  return (
    <div className={styles.bottomPanelWrapper}>
      <DecisionsPanel />
      <CardBack />
    </div>
  );
}

export default BottomPanel;
