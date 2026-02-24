import type { FC } from 'react';
import styles from './attachments.module.scss';
import type { Attachment } from '../../types/attachments';
import { getFileIcon } from '../../utils/fileicon';
import closeIcon from '../../../assets/icons/close-fill_round.svg';

interface AttachmentsProps {
  attachment: Attachment;
  onRemove?: () => void;
}

const AttachmentItem: FC<AttachmentsProps> = ({ attachment, onRemove }) => {
  const icon = getFileIcon(attachment.name);
  return (
    <div className={styles.attachment_item}>
      <div className={styles.attachment}>
        {icon && (
          <img
            src={icon}
            alt='иконка файла'
            className={styles.attachment_icon}
          />
        )}
        <span>{attachment.name}</span>
      </div>
      {onRemove && (
        <button
          className={styles.remove_button}
          onClick={onRemove}
          aria-label='Удалить'
        >
          <img src={closeIcon} alt='' />
        </button>
      )}
    </div>
  );
};

export default AttachmentItem;
