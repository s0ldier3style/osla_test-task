import type { FC } from 'react';
import styles from './close-button.module.scss';
import closeIcon from '../../../assets/icons/close.svg';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.close_button}
      onClick={onClick}
      aria-label='Закрыть'
    >
      <img src={closeIcon} className={styles.icon} />
    </button>
  );
};

export default CloseButton;
