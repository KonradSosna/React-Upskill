import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders material UI button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/React/i);
  expect(buttonElement).toBeInTheDocument();
});
