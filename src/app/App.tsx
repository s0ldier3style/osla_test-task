import { useEffect, useState } from 'react';
import TaskList from '../entities/task/ui/task-list/task-list';
import CreateTask from '../entities/task/ui/create-task/create-task';
import styles from './App.module.scss';
import './styles/global.scss';
import plusIcon from '../assets/icons/plus_add_white .svg';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <button className={styles.theme} onClick={() => setIsDark(!isDark)}>
          {isDark ? 'Светло' : 'Темно'}
        </button>
        <TaskList />
        <button className={styles.add_task_button} onClick={openCreateModal}>
          <img src={plusIcon} />
        </button>

        {isCreateModalOpen && (
          <div className={styles.modal_overlay} onClick={closeCreateModal}>
            <div
              className={styles.modal_content}
              onClick={(e) => e.stopPropagation()}
            >
              <CreateTask onClose={closeCreateModal} />
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
};

export default App;
