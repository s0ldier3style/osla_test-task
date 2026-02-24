import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../../entities/task/model/tasksSlice';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});
