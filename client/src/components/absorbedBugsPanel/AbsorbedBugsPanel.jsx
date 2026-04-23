// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import AbsorbedBugItem from './AbsorbedBugItem';
import styles from './AbsorbedBugsPanel.module.css';
import { componentsTxt as txt } from '../../texts/componentsTxt.js';

function AbsorbedBugsPanel({ absorbedBugs}) {

  return (
    <div className={styles.absorbedBugsPanelWrapper}>
      <h2 className={styles.absorbedBugsPanelTitle}>Bugs absorvidos</h2>
      <div className={styles.absorbedBugsContainer}>
        {absorbedBugs?.map((componentId) => (
          <AbsorbedBugItem
            key={componentId}
            component={txt?.[componentId]?.label?.pt}
          />
        ))}
      </div>
    </div>
  );
}

export default AbsorbedBugsPanel;
