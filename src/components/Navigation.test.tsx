import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = vi.fn();
    // Mock getElementById
    document.getElementById = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation logo', () => {
    render(<Navigation />);

    expect(screen.getByText('Seven')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(<Navigation />);

    expect(screen.getByRole('button', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    const navMenu = document.querySelector('.nav-menu');

    // Initially closed
    expect(navMenu).not.toHaveClass('open');

    // Click to open
    fireEvent.click(menuButton);
    expect(navMenu).toHaveClass('open');

    // Click to close
    fireEvent.click(menuButton);
    expect(navMenu).not.toHaveClass('open');
  });

  it('scrolls to top when logo is clicked', () => {
    render(<Navigation />);

    const logo = document.querySelector('.nav-logo') as HTMLElement;
    fireEvent.click(logo);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrolls to section when menu item is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = vi.fn();
    (document.getElementById as ReturnType<typeof vi.fn>).mockReturnValue(mockElement);

    render(<Navigation />);

    const servicesButton = screen.getByRole('button', { name: /services/i });
    fireEvent.click(servicesButton);

    expect(document.getElementById).toHaveBeenCalledWith('services');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to About section when About is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = vi.fn();
    (document.getElementById as ReturnType<typeof vi.fn>).mockReturnValue(mockElement);

    render(<Navigation />);

    const aboutButton = screen.getByRole('button', { name: /about/i });
    fireEvent.click(aboutButton);

    expect(document.getElementById).toHaveBeenCalledWith('about');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to Contact section when Contact is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = vi.fn();
    (document.getElementById as ReturnType<typeof vi.fn>).mockReturnValue(mockElement);

    render(<Navigation />);

    const contactButton = screen.getByRole('button', { name: /contact/i });
    fireEvent.click(contactButton);

    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('closes mobile menu when menu item is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = vi.fn();
    (document.getElementById as ReturnType<typeof vi.fn>).mockReturnValue(mockElement);

    render(<Navigation />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);

    const navMenu = document.querySelector('.nav-menu');
    expect(navMenu).toHaveClass('open');

    // Click a menu item
    const servicesButton = screen.getByRole('button', { name: /services/i });
    fireEvent.click(servicesButton);

    // Menu should close
    expect(navMenu).not.toHaveClass('open');
  });

  it('adds scrolled class when window scrolls past 50px', () => {
    render(<Navigation />);

    const nav = document.querySelector('.navigation') as HTMLElement;

    // Initially not scrolled
    expect(nav).not.toHaveClass('scrolled');

    // Trigger scroll event within React act to flush state updates
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Assert after React has processed the state update
    return waitFor(() => expect(nav).toHaveClass('scrolled'));
  });

  it('removes scrolled class when window scrolls back to top', () => {
    render(<Navigation />);

    const nav = document.querySelector('.navigation') as HTMLElement;

    // Scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Verify scrolled state applied
    return waitFor(async () => {
      expect(nav).toHaveClass('scrolled');

      // Scroll back to top
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(nav).not.toHaveClass('scrolled');
    });
  });

  it('handles missing section element gracefully', () => {
    (document.getElementById as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(<Navigation />);

    const servicesButton = screen.getByRole('button', { name: /services/i });

    // Should not throw error
    expect(() => fireEvent.click(servicesButton)).not.toThrow();
    expect(document.getElementById).toHaveBeenCalledWith('services');
  });
});
