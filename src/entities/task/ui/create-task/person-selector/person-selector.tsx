import { type FC, useEffect, useRef, useState } from 'react';
import styles from './person-selector.module.scss';
import { getInitials } from '../../../../../shared/utils/formatName';
import { persons } from '../../../../../shared/data/persons';
import plusIcon from '../../../../../assets/icons/Plus_add.svg';
import closeIcon from '../../../../../assets/icons/close-fill_round.svg';
import personIcon from '../../../../../assets/icons/person-fill.svg';

interface PersonSelectorProps {
  placeholder: string;
  onSelect: (person: string) => void;
  onClear: () => void;
  value: string;
}

const PersonSelector: FC<PersonSelectorProps> = ({
  placeholder,
  onSelect,
  onClear,
  value,
}) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedPerson(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (person: string) => {
    setSelectedPerson(person);
    setShowDropdown(false);
    onSelect(person);
  };

  const handleClear = () => {
    setSelectedPerson(null);
    onClear();
    setShowDropdown(false);
  };

  return (
    <div className={styles.selector_container} ref={containerRef}>
      <div className={styles.selector} tabIndex={0}>
        <div>
          {selectedPerson ? (
            <span className={styles.initials}>
              {getInitials(selectedPerson)}
            </span>
          ) : (
            <span>
              <img src={personIcon} className={styles.icon} />
            </span>
          )}
        </div>
        <input
          className={styles.input}
          value={selectedPerson ? selectedPerson : ''}
          placeholder={placeholder}
          readOnly
          onFocus={() => setShowDropdown(true)}
        />
        {selectedPerson ? (
          <span onClick={handleClear}>
            <img src={closeIcon} />
          </span>
        ) : (
          <span onClick={() => setShowDropdown(true)}>
            <img src={plusIcon} />
          </span>
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          {persons.map((person) => (
            <div
              key={person.id}
              className={styles.dropdown_item}
              onClick={() => handleSelect(person.name)}
            >
              {person.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonSelector;
