import { type FC, useState, useRef, useEffect } from 'react';
import styles from './options-button.module.scss';
import optionsIcon from '../../../assets/icons/dots-vert.svg';
import closeIcon from '../../../assets/icons/close_blue.svg';

const OptionsButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleTransfer = () => {
    console.log('Передать задачу');
    setIsOpen(false);
  };

  const handleEdit = () => {
    console.log('Редактировать задачу');
    setIsOpen(false);
  };

  return (
    <div className={styles.menu} ref={menuRef}>
      <button
        className={`${styles.menu_button} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        {isOpen ? (
          <img src={closeIcon} className={styles.icon} />
        ) : (
          <img src={optionsIcon} />
        )}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <button className={styles.menu_item} onClick={handleTransfer}>
            Редактировать задачу
          </button>
          <button className={styles.menu_item} onClick={handleEdit}>
            Передать задачу
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionsButton;
