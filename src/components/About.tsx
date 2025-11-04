// About Section Component
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title">About Seven30</h2>
          <div className="about-text">
            <p className="lead">
              We are a boutique artist management and consulting firm dedicated to empowering
              creative professionals in the modern entertainment landscape.
            </p>
            <p>
              With deep industry expertise and a passion for innovation, we partner with artists,
              creators, and cultural pioneers to build sustainable careers and amplify their impact.
              Our approach combines strategic thinking with authentic relationship-building to
              create opportunities that align with your artistic vision.
            </p>
            <p>
              From emerging talents to established names, we provide personalized guidance that
              respects your creative integrity while driving commercial success. Our mission is
              simple: elevate artistry, empower creators, and shape the future of entertainment.
            </p>
          </div>

          {/* <div className="stats">
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Artists Managed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Dedicated</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
