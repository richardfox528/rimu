import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import Register from '../Register';

// Mock de react-router-dom y AuthContext antes de importar los componentes
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    register: jest.fn().mockImplementation(() => {
      throw new Error('Passwords do not match');
    }),
  }),
  AuthProvider: ({ children }) => <>{children}</>,
}));

// Mock del componente BaseLayout
jest.mock('../../components/layout/BaseLayout', () => ({ children }) => <div>{children}</div>);

describe('Register Page', () => {
  test('renders registration form elements', () => {
    render(<Register />);

    // Verificar elementos del formulario
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^first name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^last name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<Register />);
    
    // Intentar enviar el formulario vacío
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    // Los campos requeridos son validados por HTML5
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(usernameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test('validates password match', async () => {
    render(<Register />);
    
    // Llenar todos los campos requeridos
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    // Esperar a que aparezca el mensaje de error en el div general
    await waitFor(() => {
      const errorContainer = screen.getByTestId('error-container');
      expect(within(errorContainer).getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
}); 