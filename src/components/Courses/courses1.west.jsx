// import React from 'react';
// import { http, HttpResponse, delay } from 'msw';
// import { setupServer } from 'msw/node';
// import { screen } from '@testing-library/react';
// // We're using our own custom render function and not RTL's render.
// import { renderWithProviders } from '../../helpers/test-utils';
// import Courses from './Courses';
// import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';

// // We use msw to intercept the network request during the test,
// // and return the response 'John Smith' after 150ms
// // when receiving a get request to the `/api/user` endpoint
// export const handlers = [
//   http.get('/api/courses', async () => {
//     await delay(150);
//     return HttpResponse.json([
//       {
//         title: 'The Lord of the Rings',
//         text: 'Extended Trilogy',
//         author: ['123'],
//         duration: '11:22 hours',
//         date: '26/12/2003',
//         onClick: jest.fn(),
//         onRemoveClick: jest.fn(),
//         onEditClick: jest.fn(),
//       },
//       {
//         title: 'Sample',
//         text: 'Sample description',
//         author: ['456'],
//         duration: '10:30 hours',
//         date: '26/12/2023',
//         onClick: jest.fn(),
//         onRemoveClick: jest.fn(),
//         onEditClick: jest.fn(),
//       },
//     ]);
//   }),
// ];

// const server = setupServer(...handlers);

// // Enable API mocking before tests.
// beforeAll(() => server.listen());

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers());

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());

// test('displays amount of CourseCard equal to the length of the courses array', async () => {
//   renderWithProviders(
//     <MemoryRouter>
//       <Provider>
//         <Courses />
//       </Provider>
//     </MemoryRouter>
//   );

//   await screen.findByText('Extended Trilogy');

//   const courseCards = screen.getAllByTestId('course-card');

//   expect(courseCards.length).toBe(handlers[0].response.body.length);
// });

//    jest.mock('react-redux', () => ({
//      ...jest.requireActual('react-redux'),
//      useSelector: () => ({
//        // mocked selectors' data
//      }),
//    }));
