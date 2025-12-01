import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce website with modern UI and smooth animations. Features include cart system, payment integration, and admin dashboard.",
      image: "/projects/ecommerce.jpg", // Ganti dengan path gambar kamu
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live"
    },
    {
      id: 2,
      title: "Portfolio Website", 
      description: "Modern portfolio with 3D elements, interactive design and smooth scroll animations. Built with cutting-edge web technologies.",
      image: "/projects/portfolio.jpg", // Ganti dengan path gambar kamu
      technologies: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Productivity application with real-time updates, team collaboration, and advanced task tracking features.",
      image: "/projects/taskapp.jpg", // Ganti dengan path gambar kamu
      technologies: ["React", "Firebase", "Material UI", "PWA"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live"
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description: "Real-time analytics dashboard for social media management with interactive charts and data visualization.",
      image: "/projects/dashboard.jpg", // Ganti dengan path gambar kamu
      technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      status: "In Progress"
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      description: "Mobile-first fitness application with workout plans, progress tracking, and social features.",
      image: "/projects/fitness.jpg", // Ganti dengan path gambar kamu
      technologies: ["React Native", "Firebase", "GraphQL", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live"
    },
    {
      id: 6,
      title: "Galcalbu",
      description: "Intelligent chatbot with natural language processing and machine learning capabilities.",
      image: "/projects/ai.jpg", // Ganti dengan path gambar kamu
      technologies: ["Python"],
      liveUrl: "",
      githubUrl: "https://github.com/galvinal-227",
      status: "Live"
    }
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  // Add to ref arrays
  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 lg:px-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Featured <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            A collection of my recent work showcasing modern web technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToCardsRefs}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-purple-500 to-cyan-500 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                </div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none'; // Sembunyikan kalau error
                  }}
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === "Live" 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons - INI TOMBOLNYA */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Live Demo
                  </button>
                  
                  <button 
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-gray-700 text-gray-300 hover:border-purple-500 hover:text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;