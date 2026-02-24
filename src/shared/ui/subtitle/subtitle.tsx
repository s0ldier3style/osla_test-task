import type { FC } from 'react';
import styles from './subtitle.module.scss';

interface SubtittleProps {
  subtitle: string;
  required?: boolean;
}

const Subtitle: FC<SubtittleProps> = ({ subtitle, required }) => {
  return (
    <div className={styles.subtitle}>
      {required ? '*' : ''}
      {subtitle}
    </div>
  );
};

export default Subtitle;
