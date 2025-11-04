import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock fetch
window.fetch = vi.fn() as typeof fetch;

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (window.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
    } as Response);
  });

  it('renders contact section with form', () => {
    render(<Contact />);

    expect(screen.getByText(/Let's Work Together/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to take your career to the next level/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell us about your project/i)).toBeInTheDocument();
  });

  it('updates form fields on input change', () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/Your Email/i) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      /Tell us about your project/i,
    ) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(messageInput.value).toBe('Test message');
  });

  it('submits form successfully', async () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const messageInput = screen.getByPlaceholderText(/Tell us about your project/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    // Button should be disabled while submitting
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText(/Thank you! Your message has been sent successfully/i),
      ).toBeInTheDocument();
    });

    // Verify fetch was called
    expect(window.fetch).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );

    // Form should be reset
    const nameInputAfter = screen.getByPlaceholderText(/Your Name/i) as HTMLInputElement;
    expect(nameInputAfter.value).toBe('');
  });

  it('displays error message on failed submission', async () => {
    (window.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
    } as Response);

    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const messageInput = screen.getByPlaceholderText(/Tell us about your project/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('handles network error on submission', async () => {
    (window.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const messageInput = screen.getByPlaceholderText(/Tell us about your project/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('re-enables submit button after submission completes', async () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const messageInput = screen.getByPlaceholderText(/Tell us about your project/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    // Should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Should be enabled after completion
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
