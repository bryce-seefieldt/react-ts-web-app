// About Section Component
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-hero">
          <h2 className="about-hero-title">Seven:30 Entertainment</h2>
          <div className="about-hero-tagline">
            Empowering Artists. Shaping Culture. Delivering Results.
          </div>
          <div className="about-hero-underline" />
        </div>
        <div className="about-columns">
          <div className="about-left">
            <h3 className="about-section-heading">Company History & Mission</h3>
            <p>
              <strong>Founded in 1999 in Toronto</strong>, Seven:30 Entertainment is a boutique
              music and entertainment consulting and marketing firm with a legacy of over two
              decades at the forefront of Canadian music, media, and cultural entrepreneurship.
            </p>
            <p>
              Launched by veteran executive Bryce Seefieldt, Seven:30 was built on creativity,
              strategic thinking, and a deep understanding of the evolving entertainment landscape.
              Our mission:{' '}
              <em>
                Empower artists and creators through tailored strategies, authentic connections, and
                thoughtful execution
              </em>
              .
            </p>
            <h3 className="about-section-heading">Legacy & Impact</h3>
            <p>
              Seven:30 has driven the rise of successful songwriters, musicians, and performing
              artists through hands-on creative development, project management, and strategic
              marketing. We’ve delivered chart-topping releases, award-nominated projects, and
              culturally resonant campaigns.
            </p>
            <div className="about-highlight-cards">
              <div className="about-card">
                <div className="about-card-title">Notable Clients</div>
                <div className="about-card-list">
                  Marco Polo, Shawn Desman, Kira Isabella, Neverest
                </div>
              </div>
              <div className="about-card">
                <div className="about-card-title">Major Partnerships</div>
                <div className="about-card-list">
                  VicPark Group, Rawkus Records, Red Bull Music Academy, Offshoot Communications,
                  CKLN 88.1FM, AOL Canada
                </div>
              </div>
            </div>
          </div>
          <div className="about-right">
            <h3 className="about-section-heading">Founder Profile</h3>
            <div className="about-founder">
              <div className="about-founder-name">Bryce Seefieldt</div>
              <div className="about-founder-role">Founder & Publishing Administrator</div>
              <ul className="about-founder-credentials">
                <li>25+ years in music & entertainment</li>
                <li>Juno nominations</li>
                <li>Canadian Radio Music Award wins</li>
                <li>Certified gold records</li>
                <li>#1 national radio hits</li>
              </ul>
              <div className="about-founder-companies">
                <strong>Key Roles:</strong>
                <ul>
                  <li>Warner/Chappell Music Publishing</li>
                  <li>Fat Beats Records (NYC)</li>
                  <li>Hydra Records & Mirror Image Recorders (NYC)</li>
                </ul>
              </div>
            </div>
            <div className="about-right-cards">
              <div className="about-card">
                <div className="about-card-title">Awards & Recognition</div>
                <div className="about-card-list">Juno nominations, Gold records, #1 radio hits</div>
              </div>
              <div className="about-card">
                <div className="about-card-title">Industry Experience</div>
                <div className="about-card-list">
                  Publishing, A&R, Engineering, Event Production, Marketing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
