import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

describe('Header Component', () => {
  test('renders logo', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });

  test("renders user's name", () => {
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
