import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
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

  useEffect(() => {
    // Set CSS variables untuk pointer position
    if (cardRef.current) {
      cardRef.current.style.setProperty('--pointer-x', mousePosition.x);
      cardRef.current.style.setProperty('--pointer-y', mousePosition.y);
    }
  }, [mousePosition]);

  useEffect(() => {
    // Run reveal after 500ms like Galvin Card
    setTimeout(() => {
      setIsActive(true);
      
      // Glare animation
      const glare = document.querySelector('.glare');
      if (glare) {
        glare.style.transition = 'transform 0.65s ease-in-out';
        glare.style.transform = 'translateX(-100%)';
      }
    }, 500);

    const updatePointer = (e) => {
      if (!cardRef.current) return;
      
      const bounds = cardRef.current.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const posX = x - bounds.left;
      const posY = y - bounds.top;
      const ratioX = posX / bounds.width - 0.5;
      const ratioY = posY / bounds.height - 0.5;
      const pointerX = Math.min(1, Math.max(-1, ratioX * 2)).toFixed(2);
      const pointerY = Math.min(1, Math.max(-1, ratioY * 2)).toFixed(2);
      
      setMousePosition({ x: pointerX, y: pointerY });
    };

    document.body.addEventListener('pointermove', updatePointer);

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
      document.body.removeEventListener('pointermove', updatePointer);
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

          {/* GALVIN CARD - STRUKTUR DAN CLASS PERSIS DARI HTML */}
          <div className="scene" style={{ perspective: '1000px', transform: 'translate3d(0,0,100vmin)' }}>
            <article 
              ref={cardRef}
              className="card" 
              data-active={isActive ? 'true' : 'false'}
              style={{
                '--border': '8cqi',
                '--border-color': 'hsl(0 0% 25%)',
                '--pointer-x': mousePosition.x,
                '--pointer-y': mousePosition.y,
                aspectRatio: '5/7',
                width: '350px',
                position: 'relative',
                perspective: '1600px'
              }}
            >
              <div className="card__content" style={{ transformStyle: 'preserve-3d', height: '100%' }}>
                {/* CARD REAR */}
                <div className="card__rear card__face" style={{ 
                  transform: 'rotateY(180deg) translate3d(0,0,1px)',
                  clipPath: 'inset(0 0 0 0 round 8cqi)',
                  position: 'absolute',
                  inset: 0
                }}>
                  <div className="card__emboss" style={{ filter: 'url(#lighting)' }}>
                    <div className="spotlight"></div>
                  </div>
                </div>

                {/* CARD FRONT */}
                <div className="card__front" style={{ 
                  position: 'absolute', 
                  inset: 0,
                  backfaceVisibility: 'hidden'
                }}>
                  {/* Image */}
                  <div className="img" style={{ position: 'absolute', inset: 0 }}>
                    <img 
                      src="/profile.png" 
                      alt="Galvin Alfito D" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        scale: '1.1',
                        filter: 'brightness(0.85)'
                      }}
                    />
                  </div>

                  {/* Debug Layer */}
                  <div className="debug" style={{ position: 'absolute', inset: 0 }}>
                    <div className="refraction refraction--debug"></div>
                    <div className="refraction refraction--debug"></div>
                  </div>

                  {/* Pattern */}
                  <div className="pattern" style={{
                    position: 'absolute',
                    inset: 0,
                    mask: 'url(https://assets.codepen.io/605876/figma-texture.png) 50% 50% / 4cqi 4cqi',
                    opacity: 0.4,
                    mixBlendMode: 'multiply'
                  }}>
                    <div className="refraction"></div>
                    <div className="refraction"></div>
                  </div>

                  {/* Watermark */}
                  <div className="watermark" style={{
                    position: 'absolute',
                    inset: 0,
                    mask: 'url(https://assets.codepen.io/605876/shopify-pattern.svg) 50% 50% / 14cqi 14cqi repeat',
                    opacity: 1,
                    mixBlendMode: 'hard-light'
                  }}>
                    <div className="refraction"></div>
                    <div className="refraction"></div>
                  </div>

                  {/* Card Frame dengan Nama */}
                  <div className="card__frame card__emboss" style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    filter: 'url(#lighting)'
                  }}>
                    <h3 style={{
                      margin: 0,
                      top: 'var(--border)',
                      right: 'var(--border)',
                      textAlign: 'right',
                      fontWeight: 1000,
                      lineHeight: 1,
                      position: 'absolute',
                      zIndex: 100,
                      opacity: isActive ? 1 : 0
                    }}>
                      <span style={{ fontSize: '10cqi', filter: 'url(#sticker)' }}>Galvin Alfito D</span>
                      <br />
                      <span style={{ fontSize: '5cqi', filter: 'url(#sticker)' }}>Web Development</span>
                    </h3>
                    
                    {/* Signature SVG */}
                    <svg className="signature" width="164" height="103" viewBox="0 0 164 103" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                      position: 'absolute',
                      zIndex: 100,
                      width: '38cqi',
                      bottom: 'calc(var(--border) * 1.1)',
                      right: 'calc(var(--border) * 0.6)',
                      rotate: '20deg',
                      color: 'hsl(45 20% 60%)'
                    }}>
                      <path d="M20.8118 35.4001C20.2838 35.4001 18.4278 35.4001 15.3679 35.928C12.2011 36.4745 10.4198 39.392 9.21983 41.12C6.82971 44.5617 8.01184 56.904 10.5319 64.852C12.2657 70.3203 21.0519 70.328 32.2359 70.336C38.1127 70.3402 41.3239 63.16 43.7398 58.352C44.352 57.1337 44.0118 55.432 44.1438 55.54C49.6992 60.0857 47.2119 71.64 47.8758 76.712C48.7471 83.3673 44.0279 88.168 39.3639 92.188C35.2856 95.7031 29.3718 96.984 22.5719 99.392C16.3947 101.58 10.4439 101.8 5.24785 101.272C3.16298 101.06 2.42787 99.688 1.88786 98.352C0.7529 95.544 0.81183 92.216 1.47183 88.892C3.13944 80.4934 13.0519 78.344 21.8318 75.412C37.2525 70.2625 44.2359 71.672 53.1799 69.808C60.1725 68.3507 66.3798 66.072 71.0639 63.412C75.0885 61.1265 77.0679 55.96 79.7358 49.16C80.9863 45.9728 81.3398 42.088 80.0279 40.868C68.7423 30.3737 64.0279 55.112 61.8839 64.82C61.1612 68.0922 61.6119 72.12 62.0079 74.688C62.4039 77.256 63.1959 78.312 64.9238 78.856C75.1555 82.0772 85.0519 68.7601 88.0039 63.552C88.6555 62.4023 89.0679 61.288 89.3399 62.724C89.6119 64.16 89.6119 68.12 90.1399 70.556C90.6679 72.992 91.7238 73.784 93.1918 73.928C99.8265 74.5788 102.668 66.888 107.328 63.804C108.895 62.7669 109.604 67.392 111.464 68.46C113.535 69.6491 116.004 69.256 118.26 70.064C122.043 71.4189 125.068 65.544 126.8 64.868C129.053 63.9888 128.804 70.584 130.4 72.588C131.421 73.8699 133.076 70.344 134.136 69.8C134.978 69.3678 136.252 72.424 137.856 73.38C139.46 74.336 141.308 74.072 142.656 73.276C145.247 71.7457 146.404 68.744 148.264 67.144C149.172 66.3624 150.652 66.6 151.596 67.128C152.54 67.656 153.068 68.712 153.868 69.256C154.668 69.8 155.724 69.8 156.268 69.14C159.802 64.8523 158.412 57.288 159.208 49.964C159.954 43.1013 161.34 38.36 161.48 31.416C160.812 43.848 161.076 62.32 161.476 65.772C161.612 67.904 161.612 70.808 162.412 73.8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M52.0118 93.8C62.0918 89.816 77.5638 86.072 88.6358 82.748C99.4777 79.4931 106.924 76.744 117.832 74.74C126.571 73.1344 133.564 72.744 144.508 70.872C147.724 70.6 151.188 69.808 155.844 68.608C158.124 68.2 160.236 68.2 162.412 68.2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M130.412 1C119.308 1 97.8998 1.52799 92.9638 1.93199C88.0854 2.33128 83.4999 6.056 79.4959 9.516C76.0931 12.4564 73.8839 15.92 72.9518 18.448C72.1353 20.6628 72.0118 23.648 72.9359 26.976C74.8293 33.7958 83.4518 32.728 92.1118 34.992C98.2262 36.5906 115.34 36.2 125.86 35.404C131.77 34.9569 138.108 31.96 147.312 27.016C153.375 23.759 157.604 21.544 158.54 19.416C160.39 15.2095 152.556 11.688 147.236 8.34399C141.69 4.85793 135.772 5 130.432 4.33598C125.092 3.93599 118.716 3.39999 113.496 2.736C112.292 2.60001 110.972 2.60001 109.612 2.60001" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M105.612 20.2H111.212" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Spotlight */}
                  <div className="spotlight" style={{
                    position: 'absolute',
                    inset: 0,
                    mixBlendMode: 'overlay',
                    zIndex: 9999999,
                    clipPath: 'inset(0 0 0 0 round var(--border))'
                  }}>
                    <div className="spotlight__inner"></div>
                  </div>

                  {/* Glare */}
                  <div className="glare-container" style={{ position: 'absolute', inset: 0 }}>
                    <div className="glare" style={{
                      position: 'absolute',
                      opacity: 0.5,
                      inset: 0,
                      background: 'linear-gradient(-65deg, transparent 0 40%, white 40% 50%, transparent 30% 50%, transparent 50% 55%, white 55% 60%, transparent 60% 100%)'
                    }}></div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
            <i className="bx bx-code-alt text-white text-xl"></i>
          </div>

          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <i className="bx bx-heart text-white text-xl"></i>
          </div>

          <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl animate-bounce">
            <i className="bx bx-star text-white text-lg"></i>
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

      {/* SVG Filters */}
      <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="lighting">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"></feGaussianBlur>
            <feSpecularLighting result="lighting" in="blur" surfaceScale="8" specularConstant="12" specularExponent="120" lightingColor="hsl(0 0% 6%)">
              <fePointLight x="50" y="50" z="300"></fePointLight>
            </feSpecularLighting>
            <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite"></feComposite>
            <feComposite in="SourceGraphic" in2="composite" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"></feComposite>
          </filter>
          <filter id="sticker">
            <feMorphology in="SourceAlpha" result="dilate" operator="dilate" radius="2"></feMorphology>
            <feFlood floodColor="hsl(0 0% 100%)" result="outlinecolor"></feFlood>
            <feComposite in="outlinecolor" in2="dilate" operator="in" result="outlineflat"></feComposite>
            <feMerge result="merged">
              <feMergeNode in="outlineflat"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default About;
