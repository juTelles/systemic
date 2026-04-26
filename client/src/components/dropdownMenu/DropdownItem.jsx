// eslint-disable-next-line no-unused-vars
import styles from './DropdownMenu.module.css';
import Button from '../button/Button';
import { useState } from 'react';

function DropdownItem({ title, children, disabled }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownWrapper}>
      <button
        className={styles.dropdownHeader}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {title}
        <span
          className={`${styles.arrow} ${isOpen ? styles.arrowRotated : ''}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`${styles.dropdownContent} ${isOpen ? styles.dropdownOpen : ''}`}
      >
        <div className={styles.dropdownContentInner}>{children}</div>
      </div>
    </div>
  );
}

export default DropdownItem;
