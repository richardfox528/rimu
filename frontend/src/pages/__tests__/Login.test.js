import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import Login from '../Login';

// Mock del componente BaseLayout
jest.mock('../../components/layout/BaseLayout', () => ({ children }) => <div>{children}</div>);

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock del contexto de autenticación
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn().mockRejectedValue(new Error('Invalid credentials')),
  }),
  AuthProvider: ({ children }) => <>{children}</>,
}));

describe('Login Page', () => {
  test('renders login form elements', () => {
    render(<Login />);

    // Verificar elementos del formulario
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register here/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<Login />);
    
    // Intentar enviar el formulario vacío
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    // Los campos son required por HTML5, así que no hay mensajes de error específicos
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test('shows error message on failed login', async () => {
    render(<Login />);
    
    // Ingresar credenciales inválidas
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'invalid-user' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    // Verificar mensaje de error
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});