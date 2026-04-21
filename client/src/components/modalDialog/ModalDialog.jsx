import { getModalTxt } from '../../texts/modalTxt.js';
import Button from '../button/Button';
import { getErrorMessage } from '../../texts/errorsMessages.js';
import styles from './ModalDialog.module.css';

function ModalDialog({button, onClose, modalType, error}) {

  let title = '';
  let content = '';

  if (modalType === 'ERROR') {
    const errorTitle = error?.title ? getErrorMessage(error.title) : null;
    const errorContent = error?.content ? getErrorMessage(error.content) : null;

    title = errorTitle ? errorTitle : 'Erro';
    content = errorContent ? errorContent : '';
    
  } else {
    title = getModalTxt(modalType, 'title', 'pt');
    content = getModalTxt(modalType, 'content', 'pt');
  }

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
