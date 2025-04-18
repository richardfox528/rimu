import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '../Features';

describe('Features Component', () => {
  test('renders feature sections', () => {
    render(<Features />);

    // Verificar el título principal
    expect(screen.getByRole('heading', { name: /main features/i })).toBeInTheDocument();

    // Verificar que se muestran las características principales
    const features = [
      'Advanced Security',
      'Instant Verification',
      'Universal Access',
      'Simplified Management'
    ];

    features.forEach(feature => {
      expect(screen.getByRole('heading', { name: new RegExp(feature, 'i') })).toBeInTheDocument();
    });
  });

  test('renders feature descriptions', () => {
    render(<Features />);

    // Verificar que se muestran las descripciones de las características
    const descriptions = [
      'Your documents are protected with bank-level encryption and blockchain technology for immutable verification',
      'Employers can verify your work history and credentials instantly with a simple and secure verification process',
      'Access your professional documents from any device, anywhere in the world, at any time',
      'Organize and manage all your work documentation in one place with an intuitive and easy-to-use interface'
    ];

    descriptions.forEach(description => {
      expect(screen.getByText(new RegExp(description, 'i'))).toBeInTheDocument();
    });
  });

  test('renders feature details', () => {
    render(<Features />);

    // Verificar que se muestran los detalles de las características
    const details = [
      'End-to-end encryption',
      'Blockchain verification',
      'Two-factor authentication',
      'Real-time validation',
      'Secure document sharing',
      'Digital time stamps',
      'Cross-platform compatibility',
      'Cloud synchronization',
      'Offline access',
      'Automatic organization',
      'Smart search',
      'Update reminders'
    ];

    details.forEach(detail => {
      expect(screen.getByText(new RegExp(detail, 'i'))).toBeInTheDocument();
    });
  });
}); 