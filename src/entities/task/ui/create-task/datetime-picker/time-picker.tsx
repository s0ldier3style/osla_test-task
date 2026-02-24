import { useRef, type FC } from 'react';
import styles from './time-picker.module.scss';
import clockIcon from '../../../../../assets/icons/clock.svg';
import Subtitle from '../../../../../shared/ui/subtitle/subtitle';

interface TimePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const TimePicker: FC<TimePickerProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    onChange(newDate);
  };

  const openPicker = () => {
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className={styles.time_picker}>
      <div className={styles.time_icon_box} onClick={openPicker}>
        <img src={clockIcon} className={styles.icon} />
      </div>
      <div className={styles.time}>
        <Subtitle subtitle='Время' required={false} />
        <input
          ref={inputRef}
          type='time'
          value={value}
          onChange={handleDateChange}
          className={styles.time_input}
          onClick={openPicker}
        />
      </div>
    </div>
  );
};

export default TimePicker;
