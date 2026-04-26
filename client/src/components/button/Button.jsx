import styles from './Button.module.css';

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
  color
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
    >
      {label}
    </button>
  );
}

export default Button;
