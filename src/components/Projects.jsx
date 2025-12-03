import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const projectsRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "Website toko online modern dengan sistem keranjang, checkout dan pembayaran otomatis. Dibuat menggunakan HTML, CSS, JavaScript, dan backend terintegrasi.",
      tags: ["JavaScript", "CSS3", "HTML5", "Responsive", "Node.js", "MongoDB", "Stripe"],
      category: "web",
      link: "#",
      demoUrl: "#",
      type: "web",
      status: "Completed",
      github: "https://github.com",
      screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Galcalbu App",
      description: "Aplikasi perhitungan cepat yang dirancang dengan tampilan simpel dan responsif. Cocok untuk kebutuhan Pebisnis.",
      tags: ["Python", "Tkinter", "Desktop", "Windows", "EXE"],
      category: "desktop",
      type: "desktop",
      link: "#download",
      status: "Completed",
      downloadLinks: {
      windows: "https://drive.google.com/file/d/1HzlFRS-AHCEpcTJs_p0dMxCvdbZT0Grk/view?usp=sharing",
      direct: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID",
      source: "https://github.com/galvinal-227/galcalbu"
      },
      fileSize: "2.5 MB",
      features: [
        "Kalkulator Bisnis Untuk Para Pebisnis",
        "Mode scientific",
        "Riwayat perhitungan",
        "Tampilan minimalis",
        "Keyboard support"
      ],
      screenshot: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w-800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Gaming Top-Up Website",
      description: "Website top up diamond game dengan sistem otomatis dan login user. Mendukung transaksi Free Fire, Mobile Legends, dan Valorant.",
      tags: ["JavaScript", "CSS3", "HTML5", "PHP", "MySQL"],
      category: "web",
      link: "#",
      demoUrl: "#",
      type: "web",
      status: "Completed",
      github: "https://github.com",
      screenshot: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Website portfolio modern dengan animasi smooth dan responsif design.",
      tags: ["React", "CSS3", "GSAP", "Responsive"],
      category: "web",
      link: "#",
      demoUrl: "#",
      type: "web",
      status: "Completed",
      github: "https://github.com",
      screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Task Manager Pro",
      description: "Aplikasi desktop untuk manajemen tugas dengan fitur drag & drop, reminder, dan export data. Dibuat dengan Python dan Tkinter.",
      tags: ["Python", "Tkinter", "SQLite", "Desktop", "EXE"],
      category: "desktop",
      type: "desktop",
      link: "#download",
      status: "Completed",
      downloadLinks: {
      windows: "https://drive.google.com/file/d/1VQp5uazZGWbn3wwto3vggWGDNO5Ys4rg/view?usp=sharing",
      direct: "https://drive.google.com/uc?export=download&id=YOUR_TASKMANAGER_FILE_ID",
      source: "https://github.com/galvinal-227/taskmanager"
      },
      fileSize: "3.8 MB",
      features: [
        "Manajemen tugas dengan drag & drop",
        "Reminder dan notifikasi",
        "Export ke Excel/PDF",
        "Backup otomatis",
        "Multiple user support"
      ],
      screenshot: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "Dashboard cuaca dengan forecast 7 hari dan multiple location support.",
      tags: ["JavaScript", "API", "CSS3", "Chart.js"],
      category: "web",
      link: "https://galvinal-227.github.io/WeatherDashboard/",
      demoUrl: "#",
      type: "web",
      status: "Completed",
      github: "https://github.com",
      screenshot: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'desktop', label: 'Desktop Apps' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleDownloadClick = (project) => {
    setActiveProject(project);
    setShowDownloadModal(true);
  };

  const handleDownload = (link) => {
    window.open(link, '_blank');
    setShowDownloadModal(false);
  };

  // GSAP Animations
  useEffect(() => {
    // Section entrance animation
    gsap.from(projectsRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animate filter buttons
    gsap.fromTo(".filter-btn",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }
    );

  }, [filteredProjects]);

  // Update cards ref when filtered projects change
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, filteredProjects.length);
  }, [filteredProjects]);

  return (
    <section id="projects" className="projects-section" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <div className="title-wrapper">
            <span className="section-label">PORTFOLIO</span>
            <h2 className="section-title">
              Featured <span className="highlight">Projects</span>
            </h2>
            <div className="title-line"></div>
          </div>
          <p className="section-subtitle">
            Showcasing my latest work and creative solutions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                {activeCategory === category.id && (
                  <span className="active-indicator"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className="project-card"
              data-category={project.category}
            >
              <div className="card-header">
                <div className="project-type-badge">
                  {project.type === 'desktop' ? (
                    <>
                      <svg className="desktop-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
                      </svg>
                      Desktop App
                    </>
                  ) : (
                    <>
                      <svg className="web-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      Web App
                    </>
                  )}
                </div>
                <div className="project-status">
                  <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="project-title">{project.title}</h3>
              </div>
              
              <div className="card-body">
                {/* Project Preview */}
                <div className="project-preview">
                  <div className="preview-image" style={{ backgroundImage: `url(${project.screenshot})` }}>
                    <div className="preview-overlay">
                      {project.type === 'desktop' ? (
                        <button 
                          className="preview-btn download-btn"
                          onClick={() => handleDownloadClick(project)}
                        >
                          <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                          </svg>
                          Download EXE
                        </button>
                      ) : (
                        <a href={project.demoUrl || project.link} className="preview-btn demo-btn">
                          <svg className="demo-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>
                
                <div className="tech-stack">
                  <div className="stack-title">Tech Stack:</div>
                  <div className="tags-container">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="tech-tag"
                        style={{
                          animationDelay: `${tagIndex * 0.05}s`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.type === 'desktop' && project.features && (
                  <div className="project-features">
                    <div className="features-title">Features:</div>
                    <ul className="features-list">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="more-features">+{project.features.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="card-footer">
                {project.type === 'desktop' ? (
                  <div className="desktop-actions">
                    <button 
                      className="view-project-btn download-action-btn"
                      onClick={() => handleDownloadClick(project)}
                    >
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      Download Now
                    </button>
                    {project.downloadLinks?.source && (
                      <a 
                        href={project.downloadLinks.source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="source-link"
                      >
                        View Source
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="web-actions">
                    <a href={project.demoUrl || project.link} className="view-project-btn">
                      View Demo
                      <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="card-corner">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 5L15 15M15 5L5 15"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-container">
          <button className="view-all-btn">
            View All Projects
            <div className="btn-hover-effect"></div>
          </button>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && activeProject && (
        <div className="download-modal-overlay">
          <div className="download-modal">
            <button 
              className="modal-close"
              onClick={() => setShowDownloadModal(false)}
            >
              ×
            </button>
            
            <div className="modal-header">
              <h3>Download {activeProject.title}</h3>
              <p className="modal-subtitle">Choose download option</p>
            </div>

            <div className="modal-content">
              <div className="download-options">
                <div className="download-option">
                  <div className="option-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <div className="option-info">
                    <h4>Windows Executable</h4>
                    <p className="option-description">
                      Standalone .exe file for Windows 10/11
                    </p>
                    <div className="option-details">
                      <span className="detail">Size: {activeProject.fileSize}</span>
                      <span className="detail">Format: .exe</span>
                    </div>
                  </div>
                  <button 
                    className="option-download-btn"
                    onClick={() => handleDownload(activeProject.downloadLinks.windows)}
                  >
                    Download
                  </button>
                </div>

                {activeProject.downloadLinks?.source && (
                  <div className="download-option source-option">
                    <div className="option-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                      </svg>
                    </div>
                    <div className="option-info">
                      <h4>Source Code</h4>
                      <p className="option-description">
                        Full Python source code with documentation
                      </p>
                      <div className="option-details">
                        <span className="detail">Language: Python</span>
                        <span className="detail">License: MIT</span>
                      </div>
                    </div>
                    <a 
                      href={activeProject.downloadLinks.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="option-source-btn"
                    >
                      View Source
                    </a>
                  </div>
                )}
              </div>

              <div className="modal-features">
                <h4>Features Included:</h4>
                <ul>
                  {activeProject.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-instructions">
                <h4>Installation Instructions:</h4>
                <ol>
                  <li>Download the .exe file</li>
                  <li>Run the installer (Windows SmartScreen may warn you - click "More info" then "Run anyway")</li>
                  <li>Follow the installation wizard</li>
                  <li>Launch from Start Menu or Desktop shortcut</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;

