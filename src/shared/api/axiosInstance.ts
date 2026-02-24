import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { tasks as initialTasks } from '../data/tasks';
import type { Task } from '../types/task';
import type { Comment } from '../types/commets';
import type { Attachment } from '../types/attachments';

export const apiClient = axios.create({ baseURL: '' });

let tasks: Task[] = initialTasks.map((task) => ({
  ...task,
  comments: task.comments.map((c) => ({ ...c })),
  attachments: task.attachments.map((a) => ({ ...a })),
}));

const mock = new MockAdapter(apiClient, { delayResponse: 500 });

mock.onGet('/tasks').reply(200, tasks);

mock.onPost('/tasks').reply((config) => {
  const newTask = JSON.parse(config.data) as Omit<Task, 'id'>;
  const task: Task = { ...newTask, id: Date.now() };
  tasks.push(task);
  return [201, task];
});

mock.onPatch(/\/tasks\/\d+/).reply((config) => {
  console.log('PATCH mock called', config.url);
  const url = config.url;
  const taskId = parseInt(url!.split('/').pop()!);
  const { status } = JSON.parse(config.data);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return [404, { message: 'Task not found' }];
  }
  task.status = status;
  return [200, task];
});

mock.onPost('/comments').reply((config) => {
  const { taskId, text, author } = JSON.parse(config.data);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return [404, { message: 'Task not found' }];
  }
  const newComment: Comment = {
    id: Date.now(),
    author,
    date: new Date()
      .toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', ''),
    text,
  };
  if (!task.comments) task.comments = [];
  task.comments.push(newComment);
  return [201, newComment];
});

mock.onPost(/\/tasks\/\d+\/attachments/).reply((config) => {
  const url = config.url;
  const taskId = parseInt(url!.split('/')[2]);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return [404, { message: 'Task not found' }];
  }
  const formData = config.data as FormData;
  const file = formData.get('file') as File;
  const newAttachment: Attachment = {
    id: Date.now(),
    name: file.name,
  };
  if (!task.attachments) task.attachments = [];
  task.attachments.push(newAttachment);
  return [201, newAttachment];
});

mock.onDelete(/\/attachments\/\d+/).reply((config) => {
  const url = config.url;
  const attachmentId = parseInt(url!.split('/').pop()!);
  let deleted = false;
  for (const task of tasks) {
    if (task.attachments) {
      const index = task.attachments.findIndex((a) => a.id === attachmentId);
      if (index !== -1) {
        task.attachments.splice(index, 1);
        deleted = true;
        break;
      }
    }
  }
  if (!deleted) {
    return [404, { message: 'Attachment not found' }];
  }
  return [200, { success: true }];
});
