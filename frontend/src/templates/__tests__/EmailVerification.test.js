import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import EmailVerification from '../EmailVerification';

// Mock dependencies
jest.mock('axios');
jest.mock('react-toastify');
jest.mock('js-cookie');

// Mock ReCAPTCHA component
jest.mock('react-google-recaptcha', () => {
  return function MockReCAPTCHA({ onChange }) {
    return (
      <button 
        data-testid="mock-recaptcha"
        onClick={() => onChange('mock-captcha-token')}
      >
        Verify CAPTCHA
      </button>
    );
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '',
    pathname: '/verify-email'
  })
}));

describe('EmailVerification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.get.mockImplementation((key) => {
      if (key === 'verificationEmail') return 'test@example.com';
      return null;
    });
  });

  describe('Manual Code Verification', () => {
    it('should show error for invalid code format', async () => {
      render(
        <BrowserRouter>
          <EmailVerification />
        </BrowserRouter>
      );

      // Wait for loading state to finish
      await waitFor(() => {
        expect(screen.queryByText('Verifying your email...')).not.toBeInTheDocument();
      });

      // Find and fill the code input with invalid code
      const codeInput = screen.getByPlaceholderText('Enter verification code');
      fireEvent.change(codeInput, { target: { value: '12345' } });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /verify/i });
      fireEvent.click(submitButton);

      // Should show validation error
      expect(screen.getByText('Code must be 6 numeric digits')).toBeInTheDocument();
    });
  });
}); 