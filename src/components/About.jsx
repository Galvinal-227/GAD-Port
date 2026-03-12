import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const cardContentRef = useRef(null);
  const frontImgRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef([]);
  const toolsRef = useRef([]);
  const statsRef = useRef([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isCvLoading, setIsCvLoading] = useState(false);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const projectsUrl = "https://galvinal-227.github.io/ProjectGallery/";
  const cvDriveUrl = "https://drive.google.com/file/d/1ADb9rmnCz_lUvl8aoTz9Pi7sd8hVCGsB/view?usp=drive_link";

  const handleCvClick = () => {
    setIsCvLoading(true);
    setTimeout(() => {
      setIsCvLoading(false);
      window.open(cvDriveUrl, '_blank');
    }, 3000);
  };

  const handleProjectsClick = () => {
    setIsProjectsLoading(true);
    setTimeout(() => {
      setIsProjectsLoading(false);
      window.open(projectsUrl, '_blank');
    }, 3000);
  };

  const skills = [
    { name: "React.js / Next.js", icon: "bx bxl-react" },
    { name: "JavaScript / TypeScript", icon: "bx bxl-javascript" },
    { name: "GSAP Animations", icon: "bx bx-slider-alt" },
    { name: "Tailwind CSS", icon: "bx bxl-tailwind-css" },
    { name: "Three.js / 3D", icon: "bx bx-cube" },
    { name: "Node.js / Express", icon: "bx bxl-nodejs" },
  ];

  const tools = [
    { name: "Git / GitHub", icon: "bx bxl-git", color: "text-orange-400" },
    { name: "VS Code", icon: "bx bx-code-alt", color: "text-orange-300" },
    { name: "Figma", icon: "bx bxl-figma", color: "text-orange-200" },
    { name: "Netlify / Vercel", icon: "bx bx-cloud-upload", color: "text-yellow-400" },
  ];

  const addToSkillsRefs = (el) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  const addToToolsRefs = (el) => {
    if (el && !toolsRef.current.includes(el)) {
      toolsRef.current.push(el);
    }
  };

  const addToStatsRefs = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const bounds = cardRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const posX = x - bounds.left;
    const posY = y - bounds.top;
    const ratioX = posX / bounds.width - 0.5;
    const ratioY = posY / bounds.height - 0.5;
    const pointerX = Math.min(1, Math.max(-1, ratioX * 2));
    const pointerY = Math.min(1, Math.max(-1, ratioY * 2));
    
    setMousePosition({ x: pointerX, y: pointerY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    // Run reveal after 500ms like Galvin Card
    setTimeout(() => {
      setIsActive(true);
      
      // Glare animation
      if (cardRef.current) {
        const glare = cardRef.current.querySelector('.glare');
        if (glare) {
          glare.style.transition = 'transform 0.65s ease-in-out';
          glare.style.transform = 'translateX(-100%)';
        }
      }
    }, 500);

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text animation
      gsap.fromTo(textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills animation
      skillsRef.current.forEach((skill, index) => {
        gsap.fromTo(skill,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skill,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Tools animation
      toolsRef.current.forEach((tool, index) => {
        gsap.fromTo(tool,
          { y: 30, opacity: 0, scale: 0 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tool,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(stat,
          { y: 50, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 lg:px-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden min-h-screen">
      {/* Background Grid Pattern - PERSIS seperti Galvin Card */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          '--size': '45px',
          '--line': 'rgba(255,255,255,0.1)',
          background: `
            linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) calc(var(--size) * 0.36) 50% / var(--size) var(--size),
            linear-gradient(var(--line) 1px, transparent 1px var(--size)) 0% calc(var(--size) * 0.32) / var(--size) var(--size)
          `,
          mask: 'linear-gradient(-20deg, transparent 50%, white)',
          zIndex: -1
        }}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            About <span className="bg-clip-text text-white">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Crafting digital experiences with code, creativity, and cutting-edge technology
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div ref={textRef} className="flex-1">
            <h3 className="text-3xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Creative Full-Stack Developer
            </h3>
            
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Passionate developer with <span className="text-orange-400 font-semibold">2+ years</span> of experience 
              creating immersive web experiences. I specialize in modern JavaScript frameworks, 
              interactive animations, and responsive design.
            </p>

            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or creating tutorial content.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-10">
              <div>
                <h4 className="text-2xl font-bold mb-6 tracking-tight flex items-center gap-3">
                  <i className="bx bx-code-block text-orange-400"></i>
                  Technical Skills
                </h4>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      ref={addToSkillsRefs}
                      className="skill-item group cursor-pointer p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${skill.icon} text-orange-400 text-xl`}></i>
                        <span className="text-gray-300 font-medium text-lg">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-6 tracking-tight flex items-center gap-3">
                  <i className="bx bx-cog text-yellow-400"></i>
                  Tools & Technologies
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {tools.map((tool, index) => (
                    <div
                      key={tool.name}
                      ref={addToToolsRefs}
                      className="tool-item flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 cursor-pointer hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
                    >
                      <i className={`${tool.icon} ${tool.color} text-xl`}></i>
                      <span className="text-gray-300 text-sm font-medium">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <a
                href="#contact"
                className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-4 px-8 rounded-2xl font-semibold tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 flex items-center gap-3 hover:scale-105"
              >
                <span>Get In Touch</span>
                <i className="bx bx-chat text-xl"></i>
              </a>
              
              <button
                onClick={handleProjectsClick}
                disabled={isProjectsLoading}
                className={`border-2 border-gray-700 text-gray-300 py-4 px-8 rounded-2xl font-semibold tracking-wider transition-all duration-300 hover:border-orange-500 hover:text-white hover:bg-orange-500/10 flex items-center gap-3 group ${
                  isProjectsLoading ? 'pointer-events-none opacity-75' : ''
                }`}
              >
                {isProjectsLoading ? (
                  <>
                    <span>Opening Projects...</span>
                    <i className="bx bx-loader-alt animate-spin text-xl"></i>
                  </>
                ) : (
                  <>
                    <span>View Projects</span>
                    <i className="bx bx-folder-open text-xl group-hover:animate-pulse"></i>
                    <i className="bx bx-link-external text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </>
                )}
              </button>
              
              <button
                onClick={handleCvClick}
                disabled={isCvLoading}
                className={`border-2 border-gray-700 text-gray-300 py-4 px-8 rounded-2xl font-semibold tracking-wider transition-all duration-300 hover:border-yellow-500 hover:text-white hover:bg-yellow-500/10 flex items-center gap-3 group ${
                  isCvLoading ? 'pointer-events-none opacity-75' : ''
                }`}
              >
                {isCvLoading ? (
                  <>
                    <span>Opening CV...</span>
                    <i className="bx bx-loader-alt animate-spin text-xl"></i>
                  </>
                ) : (
                  <>
                    <span>Download CV</span>
                    <i className="bx bx-download text-xl group-hover:animate-bounce"></i>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GALVIN CARD - STRUKTUR PERSIS */}
          <div 
            ref={cardRef}
            className="relative w-[350px] lg:w-[400px]"
            style={{
              perspective: '1600px',
              transformStyle: 'preserve-3d'
            }}
            data-active={isActive}
          >
            {/* Card Container */}
            <div 
              ref={cardContentRef}
              className="relative aspect-[5/7] w-full"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.2s',
                transform: isActive && (mousePosition.x !== 0 || mousePosition.y !== 0)
                  ? `rotateX(${mousePosition.y * 25}deg) rotateY(${mousePosition.x * -20}deg)`
                  : 'none'
              }}
            >
              {/* CARD FRONT - PERSIS dengan struktur Galvin Card */}
              <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                {/* Image Layer */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ clipPath: 'inset(0 0 0 0 round 1.5rem)' }}>
                  <img 
                    ref={frontImgRef}
                    src="/profile.png" 
                    alt="Galvin Alfito D" 
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.85)',
                      scale: '1.1',
                      transform: isActive && (mousePosition.x !== 0 || mousePosition.y !== 0)
                        ? `translate(${mousePosition.x * 5}%, ${mousePosition.y * 5}%)`
                        : 'none',
                      transition: 'transform 0.2s'
                    }}
                  />
                </div>

                {/* Pattern Layer - seperti di Galvin Card */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none rounded-3xl"
                  style={{
                    mask: 'url(https://assets.codepen.io/605876/figma-texture.png) 50% 50% / 2rem 2rem',
                    mixBlendMode: 'multiply',
                    background: 'hsl(0 0% 80%)'
                  }}
                />

                {/* Watermark Layer */}
                <div 
                  className="absolute inset-0 opacity-100 pointer-events-none rounded-3xl"
                  style={{
                    mask: 'url(https://assets.codepen.io/605876/shopify-pattern.svg) 50% 50% / 7rem 7rem repeat',
                    mixBlendMode: 'hard-light',
                    background: 'rgba(255,255,255,0.2)'
                  }}
                />

                {/* Refraction Effects - PERSIS seperti di Galvin Card */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
                  style={{ opacity: isActive && (mousePosition.x !== 0 || mousePosition.y !== 0) ? 1 : 0 }}
                >
                  <div 
                    className="absolute w-[500%] aspect-square bottom-0 left-0"
                    style={{
                      background: 'radial-gradient(circle at 0 100%, transparent 10%, hsl(5 100% 80%), hsl(150 100% 60%), hsl(220 90% 70%), transparent 60%)',
                      transformOrigin: '0 100%',
                      scale: Math.min(1, 0.15 + Math.abs(mousePosition.x) * 0.25),
                      translate: `clamp(-10%, -10% + ${mousePosition.x * 10}%, 10%) calc(max(0%, ${-mousePosition.y * 10}%))`,
                      filter: 'saturate(2)'
                    }}
                  />
                  <div 
                    className="absolute w-[500%] aspect-square top-0 right-0"
                    style={{
                      background: 'radial-gradient(circle at 100% 0, transparent 10%, hsl(5 100% 80%), hsl(150 100% 60%), hsl(220 90% 70%), transparent 60%)',
                      transformOrigin: '100% 0',
                      scale: Math.min(1, 0.15 + -mousePosition.x * 0.65),
                      translate: `clamp(-10%, 10% - ${-mousePosition.x * -10}%, 10%) calc(min(0%, ${-mousePosition.y * -10}%))`,
                      filter: 'saturate(2)'
                    }}
                  />
                </div>

                {/* Card Frame dengan Nama - seperti di Galvin Card */}
                <div className="absolute inset-0 z-10 rounded-3xl">
                  <h3 
                    className="absolute m-0 top-4 right-4 text-right font-black leading-none"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    <span className="block text-4xl">Galvin Alfito D</span>
                    <span className="block text-2xl">Web Development</span>
                  </h3>
                </div>

                {/* Spotlight Effect */}
                <div 
                  className="absolute inset-0 mix-blend-overlay pointer-events-none rounded-3xl"
                  style={{
                    zIndex: 9999,
                    opacity: isActive && (mousePosition.x !== 0 || mousePosition.y !== 0) ? 1 : 0
                  }}
                >
                  <div 
                    className="absolute left-1/2 top-1/2 w-[500%] aspect-square"
                    style={{
                      background: 'radial-gradient(rgba(255,255,255,0.4) 0 2%, rgba(0,0,0,0.2) 20%)',
                      filter: 'brightness(1.2) contrast(1.2)',
                      translate: `calc(-50% + ${mousePosition.x * 20}%) calc(-50% + ${mousePosition.y * 20}%)`
                    }}
                  />
                </div>

                {/* Glare Effect */}
                <div 
                  className="glare absolute inset-0 opacity-50 pointer-events-none rounded-3xl"
                  style={{
                    background: 'linear-gradient(-65deg, transparent 0 40%, white 40% 50%, transparent 30% 50%, transparent 50% 55%, white 55% 60%, transparent 60% 100%)',
                    transform: 'translateX(0)'
                  }}
                />
              </div>
            </div>

            {/* Decorative Elements - seperti di Galvin Card */}
            <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
              <i className="bx bx-code-alt text-white text-xl"></i>
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <i className="bx bx-heart text-white text-xl"></i>
            </div>

            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl animate-bounce">
              <i className="bx bx-star text-white text-lg"></i>
            </div>

            <div className="absolute bottom-8 right-8 bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-2 px-4 rounded-full text-sm font-bold shadow-2xl">
              <div className="flex items-center gap-2">
                <i className="bx bx-award"></i>
                <span>2+ Years Exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">
          {[
            { number: "10+", label: "Projects Completed", icon: "bx bx-check-circle" },
            { number: "2+", label: "Years Experience", icon: "bx bx-calendar" },
            { number: "24/7", label: "Code Enthusiast", icon: "bx bx-coffee" },
            { number: "100%", label: "Passion", icon: "bx bx-heart" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              ref={addToStatsRefs}
              className="text-center group cursor-pointer hover:transform hover:scale-110 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all duration-300">
                <i className={`${stat.icon} text-2xl text-yellow-400`}></i>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{stat.number}</h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Filters untuk efek lighting - PERSIS seperti Galvin Card */}
      <svg className="sr-only">
        <defs>
          <filter id="lighting">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting result="lighting" in="blur" surfaceScale="8" specularConstant="12" specularExponent="120" lightingColor="hsl(0 0% 6%)">
              <fePointLight x="50" y="50" z="300" />
            </feSpecularLighting>
            <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
            <feComposite in="SourceGraphic" in2="composite" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default About;
