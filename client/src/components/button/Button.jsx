// eslint-disable-next-line no-unused-vars
import react from 'react';
import styles from './Button.module.css';

function Button({ label, width, height, padding, margin, onClick, inverted, borderRadius, fontSize, disabled }) {
  return (
    <button
      style={{ width: width, height: height, margin: margin, padding: padding, borderRadius: borderRadius, fontSize: fontSize }}
      className={inverted ? styles.invertedButton : styles.button}
      onClick={onClick} disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
