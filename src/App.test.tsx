import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders main heading and logos', () => {
    render(<App />);

    // Check main heading
    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();

    // Check logos
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();
  });

  it('renders links with correct attributes', () => {
    render(<App />);

    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    const reactLink = screen.getByRole('link', { name: /react logo/i });

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
    expect(viteLink).toHaveAttribute('target', '_blank');
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
    expect(reactLink).toHaveAttribute('target', '_blank');
  });

  it('handles counter interactions correctly', () => {
    render(<App />);

    // Check initial state
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('count is 0');

    // Test increment
    fireEvent.click(button);
    expect(button).toHaveTextContent('count is 1');

    // Test multiple clicks
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toHaveTextContent('count is 3');
  });

  it('renders HMR instruction text', () => {
    render(<App />);
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/src\/App\.tsx/i)).toBeInTheDocument();
    expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument();
  });

  it('renders help text for logo clicks', () => {
    render(<App />);
    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i),
    ).toBeInTheDocument();
  });

  // Test CSS classes
  it('applies correct CSS classes', () => {
    render(<App />);

    expect(screen.getByAltText('Vite logo')).toHaveClass('logo');
    expect(screen.getByAltText('React logo')).toHaveClass('logo', 'react');
    expect(screen.getByText(/Click on the Vite and React logos/i)).toHaveClass('read-the-docs');
    expect(screen.getByRole('button').parentElement).toHaveClass('card');
  });
});
