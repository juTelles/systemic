import AbsorbedBugItem from './AbsorbedBugItem';
import styles from './AbsorbedBugsPanel.module.css';
import { componentsTxt } from '../../texts/componentsTxt.js';

function AbsorbedBugsPanel({ absorbedBugs, txt }) {
  return (
    <div className={styles.absorbedBugsPanelWrapper}>
      <h2 className={styles.absorbedBugsPanelTitle}>{txt?.title?.pt}</h2>
      <div className={styles.absorbedBugsContainer}>
        {absorbedBugs?.length === 0 ? (
          <p className={styles.noAbsorbedBugsMessage}>Nenhum bug absorvido</p>
        ) : (
          absorbedBugs?.map((componentId) => (
            <AbsorbedBugItem
              key={componentId}
              component={componentsTxt?.[componentId]?.label?.pt}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AbsorbedBugsPanel;
