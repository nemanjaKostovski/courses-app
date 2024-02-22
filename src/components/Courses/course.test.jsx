import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useAppSelector } from '../../hooks';
import Courses from './Courses';
import { MemoryRouter } from 'react-router-dom';
import { fetchCourses } from '../../services';

const mockToken = 'dummy_token';
beforeEach(() => {
  jest
    .spyOn(window.localStorage.__proto__, 'getItem')
    .mockReturnValue(mockToken);
});

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'), // Use actual implementation for other hooks
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Courses Component', () => {
  it('renders courses when the store has courses', async () => {
    const courses = [
      {
        id: '1',
        title: 'Course 1',
        description: 'Description 1',
        duration: 60,
        authors: ['author1'],
      },
      {
        id: '2',
        title: 'Course 2',
        description: 'Description 2',
        duration: 45,
        authors: ['author2'],
      },
    ];

    useAppSelector.mockReturnValue(courses);
    // Mock the fetchCourses action creator
    jest.spyOn(fetchCourses, 'fulfilled').mockImplementation((courses) => ({
      type: fetchCourses.fulfilled.type,
      payload: courses,
    }));

    // Mock the useSelector hook to return specific courses

    const store = mockStore({
      courses: { courses, loading: false },
      authors: { authors: [] },
      user: { user: { role: 'admin' } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/courses']}>
          <Courses />
        </MemoryRouter>
      </Provider>
    );

    // Check if courses are rendered
    await waitFor(() => {
      courses.forEach((course) => {
        expect(screen.getByText(course.title)).toBeInTheDocument();
        expect(screen.getByText(course.description)).toBeInTheDocument();
        expect(
          screen.getByText(course.duration.toString())
        ).toBeInTheDocument();
      });
    });
  });
});
