import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

describe('Header Component', () => {
  test('should have logo', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test("should have user's name", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    const userName = screen.getByTestId('user-name').textContent;

    expect(
      screen.getByText(userName, { selector: '.p-2' })
    ).toBeInTheDocument();
  });
});
