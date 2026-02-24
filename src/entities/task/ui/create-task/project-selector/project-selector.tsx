import { type FC, useEffect, useRef, useState } from 'react';
import styles from './project-selector.module.scss';
import closeIcon from '../../../../../assets/icons/close-fill_round.svg';
import dropIcon from '../../../../../assets/icons/droparrow-down.svg';
import { projects } from '../../../../../shared/data/projects';

interface ProjectSelectorProps {
  placeholder: string;
  onSelect: (value: string) => void;
  onClear: () => void;
  value: string;
}

const ProjectSelector: FC<ProjectSelectorProps> = ({
  placeholder,
  onSelect,
  onClear,
  value,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelected(value);
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

  const handleSelect = (project: string) => {
    setSelected(project);
    setShowDropdown(false);
    onSelect(project);
  };

  const handleClear = () => {
    setSelected(null);
    onClear();
    setShowDropdown(false);
  };

  return (
    <div className={styles.selectorContainer} ref={containerRef}>
      <div className={styles.selector}>
        <input
          className={styles.input}
          value={selected ? selected : ''}
          placeholder={placeholder}
          readOnly
          onFocus={() => setShowDropdown(true)}
        />
        {selected ? (
          <span onClick={handleClear}>
            <img src={closeIcon} />
          </span>
        ) : (
          <span onClick={() => setShowDropdown(true)}>
            <img src={dropIcon} />
          </span>
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={styles.dropdownItem}
              onClick={() => handleSelect(project.name)}
            >
              {project.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
