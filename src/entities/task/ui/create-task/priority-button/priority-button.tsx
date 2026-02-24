import type { FC } from 'react';
import styles from './priority-button.module.scss';

interface PriorityButtonProps {
  priority: 'low' | 'lower_medium' | 'medium' | 'upper_medium' | 'high';
  onClick: () => void;
  selected: boolean;
}

const PriorityButton: FC<PriorityButtonProps> = ({
  priority,
  onClick,
  selected,
}) => {
  const getPriorityNumber = (priority: string) => {
    switch (priority) {
      case 'low':
        return '1';
      case 'lower_medium':
        return '2';
      case 'medium':
        return '3';
      case 'upper_medium':
        return '4';
      case 'high':
        return '5';
      default:
        return '3';
    }
  };

  return (
    <button
      className={`${styles.priority_button} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {getPriorityNumber(priority)}
    </button>
  );
};

export default PriorityButton;
