import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const testElement = screen.getByText(/Hello Reward Gateway TS/i);
  expect(testElement).toBeInTheDocument();
});
