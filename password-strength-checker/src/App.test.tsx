import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders password strength checker title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Password Strength Checker/i);
  expect(linkElement).toBeInTheDocument();
});
