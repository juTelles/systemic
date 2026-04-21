// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import SystemStateItem from '../systemStateItem/SystemStateItem';
import styles from './SystemStatesPanel.module.css';
import { SYSTEM_HEALTH_STATES as systemStates } from '../../../../shared/src/constants/systemHealthStates.js';

function SystemStatesPanel({ txt, systemHealth }) {
  const active = systemHealth;

  return (
    <div className={styles.systemStatesPanelWrapper}>
      <h2 className={styles.painelTitle}>{txt.systemStateTitle['pt']}</h2>
      <div className={styles.systemStateItemsContainer}>
        {Object.values(systemStates).map((state) => (
          <SystemStateItem
            key={state}
            level={state}
            label={txt?.systemStateLevelLabel[state]?.pt}
            active={state === active}
          />
        ))}
      </div>
    </div>
  );
}

export default SystemStatesPanel;
