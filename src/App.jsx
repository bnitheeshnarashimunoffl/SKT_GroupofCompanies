import { useEffect, useState, useRef } from 'react';
import { siteConfig } from './config/dios-config';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { initRevealAnimations, cleanupAnimations } from './utils/scrollAnimations';
import Image from './components/Image';

/**
 * Smooth-scroll to a section by href (e.g. '#contact').
 * Accounts for fixed navbar height.
 */
function scrollToSection(href) {
  const element = document.querySelector(href);
  if (element) {
    const navHeight = document.querySelector('.nav-wrap')?.offsetHeight || 88;
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/**
 * Navbar Component
 * - Fixed position with mobile toggle
 * - Active link highlighting
 * - Mobile menu open/close
 */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'team', 'services', 'clients', 'milestones', 'branches', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <nav className="nav-wrap">
      <div className="nav">
        <a href="#home" className="nav-brand" aria-label="SKT — home">
          <div className="nav-brand-mark">
            <img src="/assets/logo.webp" alt="SKT Logo" width="40" height="40" />
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">SKT</span>
            <span className="nav-brand-sub">Group</span>
          </div>
        </a>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {['home', 'about', 'team', 'services', 'clients', 'milestones', 'branches', 'contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, `#${item}`)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

/**
 * Hero Section
 * 
 * Full-viewport hero with background image, eyebrow, heading,
 * subtext, CTA buttons, and a scrolling client marquee.
 * Single unified structure — responsive via CSS only.
 */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true"></span>
          {siteConfig.hero.eyebrow}
        </div>
        <h1 className="hero-heading">
          {siteConfig.hero.heading.map((line, i) => (
            <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
          ))}
        </h1>
        <p className="hero-subtext">{siteConfig.hero.subtext}</p>
        <div className="hero-cta-group">
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
          >
            <span>{siteConfig.hero.ctaPrimary.text}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            {[...siteConfig.hero.marqueeClients, ...siteConfig.hero.marqueeClients].map((client, i) => (
              <div className="hero-marquee-item" key={i}>{client}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Credentials Strip
 * - Dark red full-width band between Hero and About
 * - Three blocks: icon, title, subtitle
 */
function Credentials() {
  return (
    <section className="credentials" aria-label="Company credentials">
      <div className="credentials-container">
        {siteConfig.credentials.map((item, i) => (
          <div className="credential" key={i}>
            <div className="credential-icon" aria-hidden="true">{item.icon}</div>
            <div className="credential-text">
              <div className="credential-title">{item.title}</div>
              <div className="credential-subtitle">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * About Section
 * - Image with lazy loading
 * - Growth metrics
 */
function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-heading">
            {siteConfig.about.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-image-wrapper">
            <Image
              src={siteConfig.about.image}
              alt={siteConfig.about.imageAlt}
              aspectRatio="4-3"
              lazy={true}
            />
            <div className="about-image-meta">
              <span className="about-image-location">{siteConfig.about.imageMeta.location}</span>
              <span className="about-image-tag">{siteConfig.about.imageMeta.tag}</span>
            </div>
          </div>
          <div className="about-content">
            <div className="about-growth-tag">
              <span className="about-growth-value">{siteConfig.about.growthTag.value}</span>
            </div>
            {siteConfig.about.paragraphs.map((para, i) => (
              <p className="about-paragraph" key={i}>{para}</p>
            ))}
            <div className="about-metrics">
              {siteConfig.about.metrics.map((metric, i) => (
                <div className="about-metric" key={i}>
                  <div className="about-metric-value">{metric.prefix}{metric.value}{metric.suffix}</div>
                  <div className="about-metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Team Section — Interactive Accordion
 * - One accordion open at a time
 * - Smooth max-height animation
 */
function Team() {
  const [openMember, setOpenMember] = useState(null);

  const toggleMember = (id) => {
    setOpenMember(openMember === id ? null : id);
  };

  return (
    <section className="team" id="team">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-heading">
            {siteConfig.team.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
          <p className="team-description">{siteConfig.team.description}</p>
        </div>
        <div className="team-accordion">
          {siteConfig.team.members.map((member) => (
            <div
              className={`team-member ${openMember === member.id ? 'active' : ''}`}
              key={member.id}
            >
              <div className="team-member-header" onClick={() => toggleMember(member.id)}>
                <div className="team-member-number">{member.number}</div>
                <div className="team-member-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-designation">{member.designation}</p>
                </div>
                <span className="team-member-experience">{member.experience} yrs</span>
                <img src={member.photo} alt={member.name} className="team-member-photo" />
                <div className="team-member-toggle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div className="team-member-content">
                <div className="team-member-body">
                  <div className="team-member-bio">
                    {member.bio.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Services Section
 */
function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-heading">
            {siteConfig.services.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
          <p className="services-description">{siteConfig.services.description}</p>
        </div>
        <div className="services-grid">
          {siteConfig.services.items.map((service) => (
            <div className="service-card" key={service.index}>
              <div className="service-index">{service.index}</div>
              <svg className="service-icon" viewBox="0 0 24 24">
                {service.icon === 'truck' && <path d="M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M1 19h5v2H1z M13 19h5v2h-5z" />}
                {service.icon === 'warehouse' && <path d="M3 21h18M5 21V7l8-4v18M13 3v4a2 2 0 002 2h4" />}
                {service.icon === 'box' && <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />}
              </svg>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="services-featured-grid">
          {siteConfig.services.featured.map((item, idx) => (
            <div className="services-featured" key={idx}>
              <div className="services-featured-tag">{item.tag}</div>
              <h3 className="services-featured-title">{item.title}</h3>
              <p className="services-featured-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Clients Section
 */
function Clients() {
  return (
    <section className="clients" id="clients">
      <div className="clients-container">
        <div className="clients-header">
          <h2 className="clients-heading">
            {siteConfig.clients.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="clients-grid">
          {siteConfig.clients.items.map((client, i) => (
            <a href={client.url} key={i} className="client-card" target="_blank" rel="noopener noreferrer">
              <div className="client-card-content">
                <h3 className="client-name">{client.name}</h3>
                <p className="client-category">{client.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Milestones Section
 */
function Milestones() {
  return (
    <section className="milestones" id="milestones">
      <div className="milestones-container">
        <div className="milestones-header">
          <h2 className="milestones-heading">
            {siteConfig.milestones.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="milestones-grid">
          {siteConfig.milestones.items.map((milestone) => (
            <div className="milestone-card" key={milestone.number}>
              <div className="milestone-number">{milestone.number}</div>
              <h3 className="milestone-title">{milestone.title}</h3>
              <p className="milestone-description">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Branches Section — Interactive Accordion with Region Tabs
 */
function Branches() {
  const [activeRegion, setActiveRegion] = useState('south');
  const [openBranch, setOpenBranch] = useState(null);

  const currentRegion = siteConfig.branches.regions[activeRegion];
  const allBranches = currentRegion ? currentRegion.branches : [];

  const toggleBranch = (index) => {
    setOpenBranch(openBranch === index ? null : index);
  };

  return (
    <section className="branches" id="branches">
      <div className="branches-container">
        <div className="branches-header">
          <h2 className="branches-heading">
            {siteConfig.branches.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
          <p className="branches-description">{siteConfig.branches.description}</p>
        </div>
        <div className="branches-tabs">
          {Object.entries(siteConfig.branches.regions).map(([key, region]) => (
            <button
              key={key}
              className={`branch-tab ${activeRegion === key ? 'active' : ''}`}
              onClick={() => {
                setActiveRegion(key);
                setOpenBranch(null);
              }}
            >
              {region.name} ({region.count})
            </button>
          ))}
        </div>
        <div className="branches-accordion">
          {allBranches.map((branch, i) => (
            <div
              className={`branch-item ${openBranch === i ? 'active' : ''}`}
              key={i}
            >
              <div className="branch-header" onClick={() => toggleBranch(i)}>
                <div className="branch-info">
                  {branch.tag && <span className="branch-tag">{branch.tag}</span>}
                  <h3 className="branch-name">{branch.name}</h3>
                </div>
                <div className="branch-toggle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div className="branch-content">
                <div className="branch-body">
                  <p className="branch-address">{branch.address}</p>
                  {branch.email && (
                    <p className="branch-email">
                      <a href={`mailto:${branch.email}`}>{branch.email}</a>
                    </p>
                  )}
                  {branch.representatives && branch.representatives.length > 0 && (
                    <div className="branch-reps">
                      {branch.representatives.map((rep, j) => (
                        <div className="branch-rep" key={j}>
                          <div>
                            <span className="branch-rep-name">{rep.name}</span>
                            {rep.role && <span className="branch-rep-role"> · {rep.role}</span>}
                          </div>
                          <div className="branch-rep-phones">
                            {rep.phones.map((phone, k) => (
                              <a key={k} href={`tel:${phone}`} className="branch-phone">{phone}</a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Contact Section — Form with Validation & Client Choice
 */
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subject = 'SKT Translines - Contact Form Inquiry';
  const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

  const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.contact.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-heading">
            {siteConfig.contact.heading.map((line, i) => (
              <span key={i} className={i === 1 ? 'accent' : ''}>{line}</span>
            ))}
          </h2>
          <p className="contact-description">{siteConfig.contact.description}</p>
        </div>
        <div className="contact-grid">

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {submitted ? (
              <div className="contact-choice-container">
                <div className="contact-choice-header">
                  <div className="contact-success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3>Message Ready!</h3>
                  <p>How would you like to send this message to our team?</p>
                </div>

                <div className="contact-choice-actions">
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gmail"
                  >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Open in Web Gmail</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="btn-mailto"
                  >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.75a2 2 0 012.22 0l8 4.75A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                    </svg>
                    <span>Open Default Mail Client</span>
                  </a>
                </div>

                <div className="contact-choice-divider">
                  <span>or send manually</span>
                </div>

                <div className="contact-copy-section">
                  <div className="contact-copy-input">
                    <span className="contact-email-text">{siteConfig.contact.email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`contact-copy-btn ${copied ? 'copied' : ''}`}
                      aria-label="Copy email address"
                    >
                      {copied ? 'Copied!' : 'Copy Email'}
                    </button>
                  </div>
                </div>

                <div className="contact-choice-footer">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => setSubmitted(false)}
                  >
                    ← Edit Message
                  </button>
                  <button
                    type="button"
                    className="btn-link text-danger"
                    onClick={() => {
                      setFormData({ name: '', email: '', message: '' });
                      setSubmitted(false);
                    }}
                  >
                    Clear & Restart
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button type="submit" className="form-submit">Send Message</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/**
 * Footer Component
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg-text">Sree Keerthi</div>
      <div className="footer-container">
        <ul className="footer-links">
          {siteConfig.footer.links.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="footer-link">{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="footer-info">
          <p className="footer-copyright">{siteConfig.footer.copyright}</p>
          <div className="footer-designer">
            <a href="https://www.instagram.com/dios__designs/" target="_blank" rel="noopener noreferrer" className="footer-designer-link">
              <span className="designer-text-default">Designed by Dios Designs</span>
              <span className="designer-text-hover">Dream as big as Dionysus</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Main App Component
 */
export default function App() {
  // Initialize smooth scroll (Lenis + GSAP)
  useSmoothScroll();

  // Initialize reveal animations on mount
  useEffect(() => {
    initRevealAnimations();

    // Cleanup on unmount
    return () => {
      cleanupAnimations();
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Credentials />
        <About />
        <Team />
        <Services />
        <Clients />
        <Milestones />
        <Branches />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
