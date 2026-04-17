// eslint-disable-next-line no-unused-vars
import styles from './Deck.module.css';
import CardFace from './cardFace/CardFace';
import CardBack from './CardBack';

function FirstCard({ roomId, localPlayerId, currentCard, isFlipped }) {
  return (
    <div className={styles.firstCardContainer}>
      <div
        className={`${styles.firstCardWrapper} ${isFlipped ? styles.isFlipped : ''}`}
      >
        <div className={styles.cardFront}>
          {currentCard !== null ? <CardFace currentCard={currentCard} /> : null}
        </div>
        <CardBack isFlipped={isFlipped} isFlipperBackCard={true} />
      </div>
    </div>
  );
}

export default FirstCard;
