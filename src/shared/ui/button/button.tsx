import { type FC } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  color: 'blue' | 'white';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ color, onClick, children }) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
