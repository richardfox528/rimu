import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../Contact'; // Ajusta la ruta si es necesario

// Mock de cualquier componente o hook que Contact pueda necesitar y que no sea relevante para la prueba
jest.mock('../../components/layout/BaseLayout', () => ({ children }) => <div>{children}</div>);

describe('Contact Page', () => {
  test('renders contact form elements', () => {
    render(<Contact />);

    // Verifica que elementos clave del formulario estén presentes
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  // Aquí puedes añadir más pruebas como las sugeridas en el prompt:
  // test('should validate email format', () => {
  //   // ...
  // });
  // test('should submit form successfully', () => {
  //   // ...
  // });
});