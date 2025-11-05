// Services Section Component
import './Services.css';

interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const services: Service[] = [
  {
    title: 'Creative Development & A&R',
    description:
      'Hands-on support for artists and creators, including songwriting, production, and career guidance. We help shape your creative vision and connect you with the right collaborators to maximize your potential.',
    icon: '�',
    color: '#9dd44f',
  },
  {
    title: 'Project & Release Management',
    description:
      'Strategic planning and execution for music, media, and entertainment projects. From concept to launch, we oversee timelines, budgets, and deliverables to ensure successful releases.',
    icon: '📅',
    color: '#133337',
  },
  {
    title: 'Brand Strategy & Marketing Campaigns',
    description:
      'Comprehensive branding, marketing, and promotional services to build your audience and drive engagement. We create campaigns that resonate and deliver measurable results.',
    icon: '�',
    color: '#9dd44f',
  },
  {
    title: 'Tour Management & Production Coordination',
    description:
      'Expert management of tours, live events, and production logistics. We handle everything from booking and routing to technical coordination and on-site support.',
    icon: '🎤',
    color: '#133337',
  },
  {
    title: 'Music Publishing Support & Licensing',
    description:
      'Guidance on publishing administration, rights management, and licensing for artists, songwriters, and producers. We help you protect and monetize your creative works.',
    icon: '📝',
    color: '#9dd44f',
  },
  {
    title: 'Event Programming & Promotion',
    description:
      'Curating, producing, and promoting live events, showcases, and cultural experiences. We bring together talent, audiences, and brands for unforgettable moments.',
    icon: '🎟️',
    color: '#133337',
  },
  {
    title: 'Media Content & Editorial Services',
    description:
      'Expert editorial, content creation, and media strategy for blogs, publications, and digital platforms. We help you tell your story and amplify your message.',
    icon: '�',
    color: '#9dd44f',
  },
];

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Seven:30 Entertainment offers a wide spectrum of services designed to support artists,
            brands, and organizations throughout the creative and commercial lifecycle. Whether
            working with independent artists or partnering with global brands, Seven:30 delivers
            bespoke solutions that are rooted in experience, built on relationships, and executed
            with precision.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              style={{ '--accent-color': service.color } as React.CSSProperties}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
