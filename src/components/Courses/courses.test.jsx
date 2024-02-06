import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Courses from './Courses';
import { initialState } from './initialState';
import CourseForm from './components/CourseForm/CourseForm';

const mockedStore = {
  getState: () => initialState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

describe('Courses Component', () => {
  test('displays amount of CourseCard equal to the length of the courses array', async () => {
    render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/courses']}>
          <Courses />
        </MemoryRouter>
      </Provider>
    );

    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards).toHaveLength(initialState.courses.length);
  });
  test('shows CourseForm component after clicking "Add new course" button', () => {
    render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/add' element={<CourseForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const addCourseButton = screen.getByText(/add new course/i);
    fireEvent.click(addCourseButton);

    const CourseFormComponent = screen.getByTestId('course-form');
    expect(CourseFormComponent).toBeInTheDocument();
  });
});
