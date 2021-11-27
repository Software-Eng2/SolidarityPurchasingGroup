import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LoginForm from '../LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Test LoginForm', () => {
  test('Test login components', async () => {
    render(<LoginForm doLogIn={() => jest.fn()} />);

    const usernameField = screen.getByPlaceholderText('Enter Email');
    const passwordField = screen.getByPlaceholderText('Enter Password');
    const loginButton = screen.getByText('Log In');

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

  });

  test('Test error LoginForm', () => {
    const history = createMemoryHistory();

    // mock push function
    history.push = jest.fn();

    render(
      <MemoryRouter history={history}>
        <LoginForm doLogIn={() => jest.fn} />
      </MemoryRouter>
    );
    //Click on the "Login" button without filling out fields
    act(() => {
      fireEvent.click(screen.getByText('Log In'));
    });
    // Check for error messages
    expect(screen.getByText('Please insert email.'));
    expect(screen.getByText('Please insert password.'));

    // Fill out fields
    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Enter Email'), {
        target: { value: 'mariorossi@gmail.com' },
      });
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
        target: { value: 'mariorossi' },
      });
    });

    //Click on the "Login" button after filling out fields
    act(() => {
      fireEvent.click(screen.getByText('Log In'));
    });
  });
});