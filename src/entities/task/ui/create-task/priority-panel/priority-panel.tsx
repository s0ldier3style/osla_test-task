import { type FC } from 'react';
import {
  PRIORITIES,
  type Priority,
} from '../../../../../shared/data/priorityData';
import styles from './priority-panel.module.scss';
import PriorityButton from '../priority-button/priority-button';

interface PriorityPanelProps {
  selectedPriority: Priority;
  onPriorityChange: (priority: Priority) => void;
}

const PriorityPanel: FC<PriorityPanelProps> = ({
  selectedPriority,
  onPriorityChange,
}) => {
  const priorities = Object.keys(PRIORITIES) as Priority[];

  return (
    <div className={styles.priority_panel}>
      {priorities.map((priority, index) => (
        <PriorityButton
          key={index}
          priority={priority}
          onClick={() => onPriorityChange(priority)}
          selected={selectedPriority === priority}
        />
      ))}
    </div>
  );
};

export default PriorityPanel;
