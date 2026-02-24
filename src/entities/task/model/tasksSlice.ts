import { apiClient } from './../../../shared/api/axiosInstance';
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { type Task } from '../../../shared/types/task';
import { tasks as initialTasks } from '../../../shared/data/tasks';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: initialTasks,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask: Omit<Task, 'id'>) => {
    const response = await apiClient.post('/tasks', newTask);
    return response.data;
  },
);

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }: { taskId: number; status: Task['status'] }) => {
    const response = await apiClient.patch(`/tasks/${taskId}`, { status });
    return { taskId, status: response.data.status };
  },
);

export const addComment = createAsyncThunk(
  'tasks/addComment',
  async ({
    taskId,
    text,
    author,
  }: {
    taskId: number;
    text: string;
    author: string;
  }) => {
    const newComment = {
      id: Date.now(),
      taskId,
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
    const response = await apiClient.post('/comments', newComment);
    return { taskId, comment: response.data };
  },
);

export const addAttachment = createAsyncThunk(
  'tasks/addAttachment',
  async ({ taskId, file }: { taskId: number; file: File }) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(
      `/tasks/${taskId}/attachments`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return { taskId, attachment: response.data };
  },
);

export const removeAttachment = createAsyncThunk(
  'tasks/removeAttachment',
  async ({
    taskId,
    attachmentId,
  }: {
    taskId: number;
    attachmentId: number;
  }) => {
    await apiClient.delete(`/attachments/${attachmentId}`);
    return { taskId, attachmentId };
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskLocally: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatusLocally: (
      state,
      action: PayloadAction<{ taskId: number; status: Task['status'] }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) task.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.taskId);
        if (task) task.status = action.payload.status;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.comments.push(action.payload.comment);
        }
      })
      .addCase(addAttachment.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.attachments.push(action.payload.attachment);
        }
      })
      .addCase(removeAttachment.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.attachments = task.attachments.filter(
            (a) => a.id !== action.payload.attachmentId,
          );
        }
      });
  },
});

export const { addTaskLocally, updateTaskStatusLocally } = tasksSlice.actions;
export default tasksSlice.reducer;
