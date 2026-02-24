import type { FC } from 'react';
import styles from './status.module.scss';

import progressIcon from '../../../assets/icons/progress-icon.svg';
import compeletedIcon from '../../../assets/icons/completed-icon.svg';
import expiredIcon from '../../../assets/icons/expired-icon.svg';
import reviewIcon from '../../../assets/icons/review-icon.svg';

export type TStatus = 'in_progress' | 'completed' | 'expired' | 'on_review';

export interface StatusProps {
  status: TStatus;
}

const StatusLabel: FC<StatusProps> = ({ status }) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'В работе';
      case 'completed':
        return 'Завершена';
      case 'expired':
        return 'Просрочена';
      case 'on_review':
        return 'Выполнена';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <img src={progressIcon} className={styles.status_icon} />;
      case 'completed':
        return <img src={compeletedIcon} className={styles.status_icon} />;
      case 'expired':
        return <img src={expiredIcon} className={styles.status_icon} />;
      case 'on_review':
        return <img src={reviewIcon} className={styles.status_icon} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return styles.in_progress;
      case 'completed':
        return styles.completed;
      case 'expired':
        return styles.expired;
      case 'on_review':
        return styles.on_review;
    }
  };

  return (
    <div className={`${styles.status} ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      {getStatusText(status)}
    </div>
  );
};

export default StatusLabel;
