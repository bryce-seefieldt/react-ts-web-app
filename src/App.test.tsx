import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main app structure', () => {
    render(<App />);

    // App container should be present
    const appDiv = document.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
  });

  describe('Navigation', () => {
    it('renders navigation with Seven30 logo', () => {
      render(<App />);

      // Logo appears in both nav and footer, just verify both parts exist
      const sevenElements = screen.getAllByText('Seven');
      const thirtyElements = screen.getAllByText('30');
      expect(sevenElements.length).toBeGreaterThan(0);
      expect(thirtyElements.length).toBeGreaterThan(0);
    });

    it('renders navigation menu items', () => {
      render(<App />);

      expect(screen.getByRole('button', { name: /services/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
    });

    it('has mobile menu button', () => {
      render(<App />);

      const menuButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('renders hero heading with accent', () => {
      render(<App />);

      // "Elevate" appears in hero and footer, use role to be specific
      expect(screen.getByRole('heading', { name: /Elevate Your Artistry/i })).toBeInTheDocument();
    });

    it('renders hero subtitle', () => {
      render(<App />);

      expect(
        screen.getByText(/Premier artist management and consulting services/i),
      ).toBeInTheDocument();
    });

    it('renders CTA buttons', () => {
      render(<App />);

      expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /our services/i })).toBeInTheDocument();
    });
  });

  describe('Services Section', () => {
    it('renders services heading', () => {
      render(<App />);

      // "Our Services" appears in hero CTA and services section, use role to be specific
      expect(screen.getByRole('heading', { name: /Our Services/i })).toBeInTheDocument();
      expect(
        screen.getByText(/Tailored solutions to amplify your creative vision/i),
      ).toBeInTheDocument();
    });

    it('renders all 6 service cards', () => {
      render(<App />);

      // Use getAllByText since these appear in both services section and footer
      expect(screen.getAllByText(/Artist Management/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Brand Development/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Strategic Consulting/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Partnership & Deals/i)).toBeInTheDocument();
      expect(screen.getByText(/Digital Presence/i)).toBeInTheDocument();
      expect(screen.getByText(/Career Development/i)).toBeInTheDocument();
    });

    it('renders service descriptions', () => {
      render(<App />);

      expect(
        screen.getByText(/Comprehensive career guidance, strategic planning/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Craft a compelling brand identity that resonates/i),
      ).toBeInTheDocument();
    });
  });

  describe('About Section', () => {
    it('renders about heading', () => {
      render(<App />);

      expect(screen.getByText(/About Seven30/i)).toBeInTheDocument();
    });

    it('renders about content', () => {
      render(<App />);

      expect(
        screen.getByText(/boutique artist management and consulting firm/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/elevate artistry, empower creators/i)).toBeInTheDocument();
    });

    it('renders statistics', () => {
      render(<App />);

      expect(screen.getByText(/10\+/i)).toBeInTheDocument();
      expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
      expect(screen.getByText(/50\+/i)).toBeInTheDocument();
      expect(screen.getByText(/Artists Managed/i)).toBeInTheDocument();
      expect(screen.getByText(/100%/i)).toBeInTheDocument();

      // "Dedicated" appears in both About section text and stat label, use getAllByText
      const dedicatedElements = screen.getAllByText(/Dedicated/i);
      expect(dedicatedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Contact Section', () => {
    it('renders contact form heading', () => {
      render(<App />);

      expect(screen.getByText(/Let's Work Together/i)).toBeInTheDocument();
      expect(screen.getByText(/Ready to take your career to the next level/i)).toBeInTheDocument();
    });

    it('renders contact form fields', () => {
      render(<App />);

      expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Tell us about your project/i)).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<App />);

      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('validates required fields', async () => {
      render(<App />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitButton);

      // Form should not submit without required fields
      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/Your Name/i) as HTMLInputElement;
        expect(nameInput.validity.valid).toBe(false);
      });
    });
  });

  describe('Footer', () => {
    it('renders footer with Seven30 logo', () => {
      render(<App />);

      // Footer has the logo text
      const footerSection = document.querySelector('.footer');
      expect(footerSection).toBeInTheDocument();
      expect(footerSection?.textContent).toContain('Seven30');
    });

    it('renders footer tagline', () => {
      render(<App />);

      expect(screen.getByText(/Elevating artistry, empowering creators/i)).toBeInTheDocument();
    });

    it('renders footer links', () => {
      render(<App />);

      // Footer should have links to services - use getAllByText since text appears multiple times
      const artistMgmtLinks = screen.getAllByText(/Artist Management/i);
      expect(artistMgmtLinks.length).toBeGreaterThan(0);

      const brandDevLinks = screen.getAllByText(/Brand Development/i);
      expect(brandDevLinks.length).toBeGreaterThan(0);

      const consultingLinks = screen.getAllByText(/Strategic Consulting/i);
      expect(consultingLinks.length).toBeGreaterThan(0);
    });

    it('renders copyright with current year', () => {
      render(<App />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`${currentYear} Seven30`))).toBeInTheDocument();
    });

    it('renders legal links', () => {
      render(<App />);

      expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
      expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('renders all sections in correct order', () => {
      render(<App />);

      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(4); // hero, services, about, contact
    });

    it('has proper section ids for navigation', () => {
      render(<App />);

      expect(document.getElementById('services')).toBeInTheDocument();
      expect(document.getElementById('about')).toBeInTheDocument();
      expect(document.getElementById('contact')).toBeInTheDocument();
    });
  });
});
