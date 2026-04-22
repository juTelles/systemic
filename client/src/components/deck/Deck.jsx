// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import styles from './Deck.module.css';
import CardBack from './CardBack';
import FirstCard from './FirstCard';

function Deck({ roomId, localPlayerId, currentCard, isFlipped, shine }) {
  return (
    <div className={`${styles.deckWrapper}`} data-status={isFlipped}>
      <div
        className={`${styles.cardBackShadow} ${shine ? styles.isDrawingTime : ''}`}
        data-status={isFlipped}
      ></div>
      <div className={styles.cardBackShadow} data-status={isFlipped}></div>
      <CardBack isFlipped={isFlipped} />
      <FirstCard
        currentCard={currentCard}
        isFlipped={isFlipped}
        shine={shine}
      />
    </div>
  );
}

export default Deck;
