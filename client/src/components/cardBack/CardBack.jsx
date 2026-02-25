// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import styles from './CardBack.module.css';

function CardBack() {
  return (
    <div className={styles.deckContainer}>
      <div className={styles.cardBackShadow}></div>
      <div className={styles.cardBackShadow}></div>
      <div className={styles.cardBackMain}>
        <h2 className={styles.logoText}>Systemic</h2>
        <span className={styles.cardIcon}>{'{#}'}</span>
      </div>
    </div>
  );
}

export default CardBack;
