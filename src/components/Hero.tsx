// Hero Section Component
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Elevate Your <span className="accent">Artistry</span>
        </h1>
        <p className="hero-subtitle">
          Premier artist management and consulting services for the modern creative industry
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary">
            Get Started
          </a>
          <a href="#services" className="btn btn-secondary">
            Our Services
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="color-splash splash-1"></div>
        <div className="color-splash splash-2"></div>
        <div className="color-splash splash-3"></div>
      </div>
    </section>
  );
};

export default Hero;
