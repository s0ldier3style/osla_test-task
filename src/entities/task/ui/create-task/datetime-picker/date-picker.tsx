import { useRef, type FC } from 'react';
import styles from './date-picker.module.scss';
import calendarIcon from '../../../../../assets/icons/calendar_event-fill.svg';
import Subtitle from '../../../../../shared/ui/subtitle/subtitle';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
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
    <div className={styles.date_picker}>
      <div className={styles.date_icon_box} onClick={openPicker}>
        <img src={calendarIcon} className={styles.icon} />
      </div>
      <div className={styles.date}>
        <Subtitle subtitle='Контрольная дата' required={true} />
        <input
          ref={inputRef}
          type='date'
          value={value}
          onChange={handleDateChange}
          className={styles.date_input}
          onClick={openPicker}
        />
      </div>
    </div>
  );
};

export default DatePicker;
