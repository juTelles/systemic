import styles from './CardFace.module.css';
import { getCardText } from '../../../texts/cardsTxt';

function CardFace({ currentCard }) {
  const { type, effect } = currentCard || {};

  const color = `var(--${type})`;

  const cardType = type === 'POINTS' ? `POINTS${effect.amount}` : type;

  const getImageUrl = (type) => {
    return new URL(`../../../assets/${type}.png`, import.meta.url).href;
  };

  const title = getCardText(currentCard, 'title', 'pt');
  const description = getCardText(currentCard, 'description', 'pt');

  return (
    <div
      className={`${styles.cardWrapper} ${styles[type]}`}
      style={{ '--card-color': color }}
    >
      <span className={`${styles.cardTitle} ${styles[type]}`}>{title}</span>
      {type !== 'EVENT' ? (
        <div className={`${styles.cardImageContainer} ${styles[type]}`}>
          <img
            src={getImageUrl(cardType)}
            alt=""
            className={styles.cardImage}
          />
        </div>
      ) : null}
      <span
        className={`${styles.cardDescription} ${styles[type]}`}
        data-type={type}
      >
        {description}
      </span>
    </div>
  );
}

export default CardFace;
