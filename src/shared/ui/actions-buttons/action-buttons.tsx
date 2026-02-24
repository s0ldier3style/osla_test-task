import type { FC } from 'react';
import Button from '../button/button';
import type { TStatus } from '../status/status';
import styles from './action-buttons.module.scss';

interface ActionsButtonsProps {
  status: TStatus;
  onSendToReview?: () => void;
  onProgress?: () => void;
  onComplete?: () => void;
}

const ActionsButtons: FC<ActionsButtonsProps> = ({
  status,
  onSendToReview,
  onProgress,
  onComplete,
}) => {
  switch (status) {
    case 'in_progress':
      return (
        <div className={styles.action_buttons}>
          <Button color='blue' onClick={onSendToReview || (() => {})}>
            Отправить на проверку
          </Button>
        </div>
      );
    case 'expired':
      return (
        <div className={styles.action_buttons}>
          <Button color='blue' onClick={onSendToReview || (() => {})}>
            Отправить на проверку
          </Button>
        </div>
      );
    case 'on_review':
      return (
        <div className={styles.action_buttons}>
          <Button color='blue' onClick={onComplete || (() => {})}>
            Отметить завершенной
          </Button>
          <Button color='white' onClick={onProgress || (() => {})}>
            На доработку
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default ActionsButtons;
