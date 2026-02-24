import React from 'react';
import Status from '../../../../shared/ui/status/status';
import styles from './task-card.module.scss';
import type { TStatus } from '../../../../shared/types/status';
import type { TPriority } from '../../../../shared/types/priority';

import taskIcon from '../../../../assets/icons/task-icon.svg';
import commsIcon from '../../../../assets/icons/comments.svg';
import attachmentsIcon from '../../../../assets/icons/attachments.svg';
import Priority from '../../../../shared/ui/priority/priority';
import type { Comment } from '../../../../shared/types/commets';
import type { Attachment } from '../../../../shared/types/attachments';

interface TaskCardProps {
  title: string;
  status: TStatus;
  priority: TPriority;
  author: string;
  createDate: string;
  assigne: string;
  controller: string;
  planDate: string;
  comments: Comment[];
  attachments: Attachment[];
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  status,
  priority,
  author,
  createDate,
  assigne,
  controller,
  planDate,
  comments,
  attachments,
}) => {
  const statusClass = `${status}`;

  return (
    <div className={`${styles.task_card} ${styles[statusClass]} `}>
      <div className={styles.status_label}>
        <div className={styles.status_title}>
          <img src={taskIcon} className={styles.status_title_icon} />
          Задача
        </div>
        <Status status={status} />
      </div>

      <div className={styles.task_title_label}>
        <div className={styles.task_name}>{title}</div>
        <div className={styles.task_author}>
          <span className={styles.task_author_title}>Автор:</span>
          <span className={styles.task_author_info}>
            <span className={styles.task_author_name}>{author}</span>
            {createDate}
          </span>
        </div>
      </div>

      <div className={styles.priority_label}>
        <div className={styles.assigne}>
          <span className={styles.assigne_text}>Исполнитель:</span>
          <span>{assigne}</span>
        </div>
        <div className={styles.controller}>
          <span className={styles.controller_text}>Контроллер:</span>
          <span>{controller}</span>
        </div>
        <div className={styles.priority}>
          <Priority priority={priority} />
          <div className={styles.priotity_date_comms_attachments}>
            <span className={styles.date}>до {planDate}</span>

            <div className={styles.attachs}>
              <img src={attachmentsIcon} className={styles.attachs_icon} />
              <span>{attachments.length}</span>
            </div>
            <div className={styles.comms}>
              <img src={commsIcon} className={styles.comms_icon} />
              <span>{comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
