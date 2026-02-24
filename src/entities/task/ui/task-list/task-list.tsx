import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { fetchTasks } from '../../../../entities/task/model/tasksSlice';

import TaskCard from '../task-card/task-card';
import styles from './task-list.module.scss';
import ViewTask from '../view-task/view-task';

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCardClick = (taskId: number) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseView = () => {
    setSelectedTaskId(null);
  };

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
    <div>
      <div className={styles.tasks_list}>
        {tasks.map((task) => (
          <div key={task.id} onClick={() => handleCardClick(task.id)}>
            <TaskCard
              title={task.title}
              status={task.status}
              priority={task.priority}
              author={task.setPerson}
              createDate={task.setDate}
              assigne={task.assigne}
              controller={task.controller}
              planDate={task.planDate}
              comments={task.comments}
              attachments={task.attachments}
            />
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className={styles.modal} onClick={handleCloseView}>
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <ViewTask
              taskId={selectedTask.id}
              title={selectedTask.title}
              description={selectedTask.description}
              status={selectedTask.status}
              planDate={selectedTask.planDate}
              priority={selectedTask.priority}
              object={selectedTask.object}
              subject={selectedTask.subject}
              assigne={selectedTask.assigne}
              controller={selectedTask.controller}
              setPerson={selectedTask.setPerson}
              reminder={selectedTask.reminder}
              repeat={selectedTask.repeat}
              onClose={handleCloseView}
              comments={selectedTask.comments}
              attachments={selectedTask.attachments}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
