import { saveNewCourse } from '../../services';
import coursesSlice from './coursesSlice';

describe('Reducer', () => {
  test('returns the initial state', () => {
    expect(coursesSlice(undefined, {})).toEqual({
      loading: false,
      courses: [],
      error: '',
    });
  });
  test('handles saving a new course', () => {
    const initialState = {
      loading: false,
      courses: [],
      error: '',
    };

    const newCourse = {
      title: 'New Course',
      description: 'Description of the new course',
      duration: 60,
      authors: ['Author 1', 'Author 2'],
    };

    const action = saveNewCourse.fulfilled(newCourse, '');

    const newState = coursesSlice(initialState, action);

    expect(newState.courses.length).toBe(1);
    expect(newState.courses[0]).toEqual(newCourse);
  });
});
