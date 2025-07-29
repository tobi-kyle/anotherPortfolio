import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/Contact';

// ✅ MOCK FETCH
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ email: "test@example.com" }]),
  })
);

test('renders contact email', async () => {
  render(<Contact />);
  expect(await screen.findByText(/email/i)).toBeInTheDocument();
});
