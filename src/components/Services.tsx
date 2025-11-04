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
    title: 'Artist Management',
    description:
      'Comprehensive career guidance, strategic planning, and day-to-day management to elevate your artistic journey.',
    icon: '🎭',
    color: '#9dd44f',
  },
  {
    title: 'Brand Development',
    description:
      'Craft a compelling brand identity that resonates with your audience and stands out in the industry.',
    icon: '✨',
    color: '#133337',
  },
  {
    title: 'Strategic Consulting',
    description:
      'Expert insights on market positioning, growth strategies, and navigating the evolving creative landscape.',
    icon: '📊',
    color: '#9dd44f',
  },
  {
    title: 'Partnership & Deals',
    description:
      'Negotiate partnerships, sponsorships, and collaborations that align with your artistic vision and goals.',
    icon: '🤝',
    color: '#133337',
  },
  {
    title: 'Digital Presence',
    description:
      'Build and optimize your online presence across platforms to maximize reach and engagement.',
    icon: '🌐',
    color: '#9dd44f',
  },
  {
    title: 'Career Development',
    description:
      'Long-term planning and milestone strategies to build a sustainable and thriving artistic career.',
    icon: '🚀',
    color: '#133337',
  },
];

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Tailored solutions to amplify your creative vision and business success
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
