import type { FC } from 'react';
import styles from './attach-button.module.scss';
import attachIcon from '../../../assets/icons/icon_PaperClip-Turn.svg';

const AttachButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className={`${styles.attach_button} ${styles.blue}`}
      onClick={onClick}
    >
      <img src={attachIcon} alt='Прикрепить' />
      Прикрепить файл
    </button>
  );
};

export default AttachButton;
