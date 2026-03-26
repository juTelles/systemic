// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import AbsorbedBugItem from '../absorbedBugItem/AbsorbedBugItem';
import styles from './AbsorbedBugsPanel.module.css';

function AbsorbedBugsPanel() {
  const preventedBugs = [
    { component: 'Interface', count: 10, id: 1 },
    { component: 'Interação', count: 20, id: 2 },
    { component: 'Frontend', count: 15, id: 3 },
    { component: 'Req de Aplicação', count: 5, id: 4 },
    { component: 'Lógica', count: 5, id: 5 },
    { component: 'Integrações', count: 5, id: 6 },
    { component: 'Integrações', count: 5, id: 7 },
    { component: 'Integrações', count: 5, id: 8 },
    { component: 'Req de Dados', count: 5, id: 9 },
    { component: 'Banco de Dados', count: 5, id: 10 },
    { component: 'Dados', count: 5, id: 11 },
    { component: 'Estrutura', count: 5, id: 12 },
  ];

  return (
    <div className={styles.absorbedBugsPanelWrapper}>
      <h2 className={styles.absorbedBugsPanelTitle}>Bugs absorvidos</h2>
      <div className={styles.absorbedBugsContainer}>
        {preventedBugs.map((bug) => (
          <AbsorbedBugItem
            key={bug.id}
            component={bug.component}
            count={bug.count}
          />
        ))}
      </div>
    </div>
  );
}

export default AbsorbedBugsPanel;
