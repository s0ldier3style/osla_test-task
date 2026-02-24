import type { FC } from 'react';
import styles from './priority.module.scss';

import low from '../../../assets/icons/low.svg';
import lower_medium from '../../../assets/icons//lower-medium.svg';
import medium from '../../../assets/icons/medium.svg';
import upper_medium from '../../../assets/icons/upper-medium.svg';
import high from '../../../assets/icons/high.svg';
import type { TPriority } from '../../types/priority';

export interface PriorityProps {
  priority: TPriority;
}

const PriorityLabel: FC<PriorityProps> = ({ priority }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low':
        return <img src={low} className={styles.icon} />;
      case 'lower_medium':
        return <img src={lower_medium} className={styles.icon} />;
      case 'medium':
        return <img src={medium} className={styles.icon} />;
      case 'upper_medium':
        return <img src={upper_medium} className={styles.icon} />;
      case 'high':
        return <img src={high} className={styles.icon} />;
      default:
        return null;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'низкий';
      case 'lower_medium':
        return 'ниже среднего';
      case 'medium':
        return 'средний';
      case 'upper_medium':
        return 'выше среднего';
      case 'high':
        return 'высокий';
      default:
        return 'низкий';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return styles.low;
      case 'lower_medium':
        return styles.lower_medium;
      case 'medium':
        return styles.medium;
      case 'upper_medium':
        return styles.upper_medium;
      case 'high':
        return styles.high;
      default:
        return styles.medium;
    }
  };

  return (
    <div className={`${styles.priority_box} ${getPriorityColor(priority)}`}>
      {getPriorityIcon(priority)}
      {getPriorityText(priority)}
    </div>
  );
};

export default PriorityLabel;
