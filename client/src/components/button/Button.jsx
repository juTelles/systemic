import styles from './Button.module.css';
import { Tooltip } from 'react-tooltip';

function Button({
  label,
  width,
  height,
  padding,
  margin,
  onClick,
  inverted,
  borderRadius,
  fontSize,
  disabled,
  border,
  color,
  title,
}) {
  return (
    <button
      style={{
        width: width,
        height: height,
        margin: margin,
        padding: padding,
        borderRadius: borderRadius,
        fontSize: fontSize,
        border: border,
        '--btn-color': color
      }}
      className={inverted ? styles.invertedButton : styles.button}
      onClick={onClick}
      disabled={disabled}
      title={title}
      data-tooltip-id="button"
    >
      {label}
      <Tooltip id="button" place="top" variant="light" />
    </button>
  );
}

export default Button;
