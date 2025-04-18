import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from '../ForgotPassword';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('react-toastify');

// Mock del componente BaseLayout
jest.mock('../../components/layout/BaseLayout', () => ({ children }) => <div>{children}</div>);

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock del contexto de autenticación
const mockResetPassword = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    resetPassword: mockResetPassword,
  }),
}));

describe('ForgotPassword Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
  };

  test('renders forgot password form elements', () => {
    renderComponent();

    // Verificar elementos del formulario
    expect(screen.getByText(/recover access to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send instructions/i })).toBeInTheDocument();
    expect(screen.getByText(/did you remember your password/i)).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /log in here/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register here/i })).toBeInTheDocument();
  });

  test('shows validation error for empty email', async () => {
    renderComponent();
    
    // Intentar enviar el formulario vacío
    const submitButton = screen.getByRole('button', { name: /send instructions/i });
    fireEvent.click(submitButton);

    // El campo email es required por HTML5
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toBeRequired();
  });

  test('shows success message on password reset request', async () => {
    mockResetPassword.mockResolvedValueOnce({ success: true });
    
    renderComponent();
    
    // Ingresar email
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /send instructions/i });
    fireEvent.click(submitButton);

    // Verificar mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/reset instructions has been sent/i)).toBeInTheDocument();
    });

    // Verificar redirección
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 4000 });
  });

  test('shows error message on failed password reset request', async () => {
    const errorMessage = 'Email not found';
    mockResetPassword.mockRejectedValueOnce(new Error(errorMessage));
    
    renderComponent();
    
    // Ingresar email
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /send instructions/i });
    fireEvent.click(submitButton);

    // Verificar mensaje de error
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 