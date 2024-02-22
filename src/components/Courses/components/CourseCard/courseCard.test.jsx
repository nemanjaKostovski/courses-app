import { render, screen } from '@testing-library/react';
import CourseCard from './CourseCard';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import getCourseDuration from '../../../../helpers/getCourseDuration';
import store from '../../../../store';

const sampleCourse = {
  title: 'The Lord of the Rings',
  text: 'Extended Trilogy',
  author: ['123'],
  duration: '11:22 hours',
  date: '26/12/2003',
  onClick: jest.fn(),
  onRemoveClick: jest.fn(),
  onEditClick: jest.fn(),
};
const sampleAuthors = [
  { name: 'Peter Jackson', id: '123' },
  { name: 'Another Author', id: '456' },
];

const displayedAuthorNames = sampleCourse.author.map(
  (authorId) => sampleAuthors.find((author) => author.id === authorId)?.name
);

const durationRegex = /^\d{2}:\d{2}\s(hour|hours)$/;
const formattedDuration = getCourseDuration(682);
const formattedDate = sampleCourse.date.split('/').join('.');

describe('CourseCard Component', () => {
  test('renders title', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CourseCard {...sampleCourse} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      sampleCourse.title
    );
  });
  test('renders description', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CourseCard {...sampleCourse} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(sampleCourse.text)).toBeInTheDocument();
  });
  test('renders duration in correct format', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CourseCard {...sampleCourse} />
        </Provider>
      </MemoryRouter>
    );
    expect(durationRegex.test(formattedDuration)).toBe(true);
  });
  test('renders a list of authors', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CourseCard {...sampleCourse} author={displayedAuthorNames} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Peter Jackson')).toBeInTheDocument();
  });
  test('renders created date in correct format', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CourseCard {...sampleCourse} date={formattedDate} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('26.12.2003')).toBeInTheDocument();
  });
});
