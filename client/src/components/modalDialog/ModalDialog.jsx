import Button from '../button/Button';
import styles from './ModalDialog.module.css';

function ModalDialog({ title, content, button, onClose }) {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox}>
        <h2>{title}</h2>
        <p>{content}</p>
      {button ? (
        <Button
          label={'OK'}
          width="4rem"
          height="2rem"
          color={'var(--ciano)'}
          onClick={onClose}
        />
      ) : null}
      </div>
    </div>
  );
}

export default ModalDialog;
