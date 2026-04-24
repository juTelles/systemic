// eslint-disable-next-line no-unused-vars
import SystemStateItem from './systemStateHealthItem/SystemStateHealthItem.jsx';
import styles from './SystemHealthStatesPanel.module.css';
import { SYSTEM_HEALTH_STATES as systemStates } from '../../../../shared/src/constants/gameEnums.js';

function SystemHealthStatesPanel({ txt, systemHealth, crisisRound }) {
  const active = systemHealth;

  return (
    <div
      className={`${styles.systemHealthStatesPanelWrapper} ${crisisRound ? styles.crisisRound : ''}`}
    >
      <h2 className={styles.systemHealthStatesPanelTitle}>
        {txt.systemStateTitle['pt']}
      </h2>
      <div className={styles.systemHealthStateItemsContainer}>
        {Object.values(systemStates).map((state) => (
          <SystemStateItem
            key={state}
            level={state}
            label={txt?.systemStateLevelLabel?.[state]?.pt}
            active={state === active}
          />
        ))}
      </div>
    </div>
  );
}

export default SystemHealthStatesPanel;
