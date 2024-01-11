import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCourses,
  saveNewCourse,
  deleteCourse,
  updateCourse,
} from '../../services';

type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

type initialState = {
  loading: boolean;
  courses: CourseType[];
  error: string;
};

const initialState: initialState = {
  loading: false,
  courses: [],
  error: '',
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCourses.fulfilled,
      (state, action: PayloadAction<CourseType[]>) => {
        state.loading = false;
        state.courses = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.courses = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(
      saveNewCourse.fulfilled,
      (state, action: PayloadAction<CourseType>) => {
        state.courses.push(action.payload);
        state.loading = false;
        state.error = '';
      }
    );
    builder.addCase(
      deleteCourse.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
        state.loading = false;
        state.error = '';
      }
    );
    builder.addCase(
      updateCourse.fulfilled,
      (state, action: PayloadAction<CourseType>) => {
        state.courses = state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course
        );
        state.loading = false;
        state.error = '';
      }
    );
  },
});

export default coursesSlice.reducer;
