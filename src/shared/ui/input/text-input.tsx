import type { FC } from 'react';
import styles from './text-input.module.scss';

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  name?: string;
  id?: string;
}

const TextInput: FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className={styles.text_input_container}>
      <input
        className={styles.text_input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
