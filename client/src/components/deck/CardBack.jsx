import styles from './Deck.module.css';

function CardBack({ isFlipped, isFlipperBackCard }) {
  return (
    <div className={isFlipperBackCard ? styles.cardBackFlipper : styles.cardBackMain} data-status={isFlipped}>
      <h2 className={styles.logoText}>Systemic</h2>
      <span className={styles.cardIcon}>{'{#}'}</span>
    </div>
  );
}

export default CardBack;
