import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQ from '../FAQ';

describe('FAQ Component', () => {
  test('renders FAQ section title', () => {
    render(<FAQ />);
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
  });

  test('renders FAQ items', () => {
    render(<FAQ />);

    // Verificar que se muestran las preguntas frecuentes
    const questions = [
      'How does blockchain verification work?',
      'Is my personal information safe?',
      'How can companies verify my history?',
      'Can I access my documents from any device?',
      'What types of documents can I store?',
      'How do I start using the platform?'
    ];

    questions.forEach(question => {
      expect(screen.getByText(new RegExp(question, 'i'))).toBeInTheDocument();
    });
  });

  test('expands and collapses FAQ items on click', () => {
    render(<FAQ />);

    // Obtener el primer elemento FAQ
    const firstQuestion = screen.getByText(/how does blockchain verification work/i);
    const firstAnswer = screen.getByText(/our platform uses blockchain technology/i);

    // Verificar que la respuesta está oculta inicialmente
    expect(firstAnswer.parentElement.parentElement).toHaveClass('max-h-0 opacity-0');

    // Hacer clic en la pregunta
    fireEvent.click(firstQuestion);

    // Verificar que la respuesta es visible
    expect(firstAnswer.parentElement.parentElement).toHaveClass('max-h-96 opacity-100');

    // Hacer clic nuevamente
    fireEvent.click(firstQuestion);

    // Verificar que la respuesta está oculta nuevamente
    expect(firstAnswer.parentElement.parentElement).toHaveClass('max-h-0 opacity-0');
  });

  test('only one FAQ item can be expanded at a time', () => {
    render(<FAQ />);

    // Obtener dos preguntas
    const firstQuestion = screen.getByText(/how does blockchain verification work/i);
    const secondQuestion = screen.getByText(/is my personal information safe/i);

    // Expandir la primera pregunta
    fireEvent.click(firstQuestion);
    expect(screen.getByText(/our platform uses blockchain technology/i).parentElement.parentElement).toHaveClass('max-h-96 opacity-100');

    // Expandir la segunda pregunta
    fireEvent.click(secondQuestion);
    
    // Verificar que la primera pregunta se ha colapsado
    expect(screen.getByText(/our platform uses blockchain technology/i).parentElement.parentElement).toHaveClass('max-h-0 opacity-0');
    expect(screen.getByText(/we implement bank-level encryption/i).parentElement.parentElement).toHaveClass('max-h-96 opacity-100');
  });
}); 