import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

test("Header should have logo and user's name", () => {
  // Mock necessary Redux store and actions if needed
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  // Assert that logo is present
  expect(screen.getByAltText('logo')).toBeInTheDocument();

  // Retrieve user's name from the rendered output
  const userName = screen.getByTestId('user-name').textContent;

  // Assert that user's name is displayed
  expect(screen.getByText(userName, { selector: '.p-2' })).toBeInTheDocument();
});
