import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import coursesReducer from './features/courses/coursesSlice';
import authorsReducer from './features/authors/authorsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    authors: authorsReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  authors: authorsReducer,
});

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
