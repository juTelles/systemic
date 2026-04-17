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
        {/* <div className={styles.cardBackFlipper}>
          <h2 className={styles.logoText}>Systemic</h2>
          <span className={styles.cardIcon}>{'{#}'}</span>
        </div> */}
      </div>
    </div>
  );
}

export default FirstCard;
