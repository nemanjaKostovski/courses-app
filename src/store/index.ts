import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { coursesInitialState } from './courses/reducer.js';

const appInitialState = {
  courses: coursesInitialState,
};
const store = configureStore(rootReducer, appInitialState);

export default store;
