import type { FC, ChangeEvent } from 'react';
import styles from './option.module.scss';

interface Option {
  value: string;
  label: string;
}

interface OptionProps {
  options: Option[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const Option: FC<OptionProps> = ({
  options,
  name,
  selectedValue,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.option}>
      {options.map((option) => (
        <label key={option.value} className={styles.option_label}>
          <input
            type='radio'
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            className={styles.input}
          />
          <span className={styles.custom_radio}></span>
          <span className={styles.label_text}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default Option;
