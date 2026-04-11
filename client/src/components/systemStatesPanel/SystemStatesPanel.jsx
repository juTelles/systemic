// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import SystemStateItem from '../systemStateItem/SystemStateItem';
import styles from './SystemStatesPanel.module.css';

function SystemStatesPanel({ txt }) {
  const ITEMS = [
    { level: 'healthy', label: 'Saudável', active: true },
    { level: 'warning', label: 'Alerta', active: false },
    { level: 'critical', label: 'Crítico', active: false },
  ];

  return (
    <div className={styles.systemStatesPanelWrapper}>
      <h2 className={styles.painelTitle}>{txt.systemStateTitle['pt']}</h2>
      <div className={styles.systemStateItemsContainer}>
        {ITEMS.map((item) => (
          <SystemStateItem
            key={item.level}
            level={item.level}
            label={item.label}
            active={item.active}
          />
        ))}
      </div>
    </div>
  );
}

export default SystemStatesPanel;
