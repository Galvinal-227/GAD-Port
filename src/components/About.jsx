import { useRef, useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash'; // atau buat custom debounce
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef([]);
  const toolsRef = useRef([]);
  const statsRef = useRef([]);
  const profileRef = useRef(null);
  const cursorRef = useRef(null); // Ref untuk cursor element
  
  const [isCvLoading, setIsCvLoading] = useState(false);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  
  // Gunakan ref untuk cursor position (tidak trigger re-render)
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

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

  // Optimasi dengan requestAnimationFrame
  const updateCursorPosition = useCallback((e) => {
    if (profileRef.current && cursorRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      cursorPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Apply transform langsung ke DOM element tanpa re-render
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosRef.current.x - 40}px, ${cursorPosRef.current.y - 40}px)`;
      }
    }
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      updateCursorPosition(e);
    });
  }, [updateCursorPosition]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 lg:px-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden min-h-screen">
      {/* Background Grid Pattern */}
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

            <div className="flex gap-4 flex-wrap items-center">
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

          {/* Profile Image dengan Custom Cursor - Foto Wok Saja - OPTIMIZED */}
          <div 
            ref={profileRef}
            className="relative group"
            onMouseEnter={() => setIsHoveringProfile(true)}
            onMouseLeave={() => {
              setIsHoveringProfile(false);
              // Reset cursor position when leaving
              if (cursorRef.current) {
                cursorRef.current.style.transform = 'translate(-9999px, -9999px)';
              }
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Custom Cursor - Hanya Foto Wok - Sekarang menggunakan transform langsung */}
            <div 
              ref={cursorRef}
              className={`absolute pointer-events-none z-50 transition-opacity duration-150 ${
                isHoveringProfile ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: '60px',
                height: '60px',
                transform: 'translate(-9999px, -9999px)',
                willChange: 'transform',
                transition: 'opacity 0.15s ease', // tambah ini
                backfaceVisibility: 'hidden', // tambah ini
                WebkitFontSmoothing: 'antialiased' // tambah ini
              }}
            >
              <img 
                src="/Cursorr.jpg" 
                alt="wok cursor"
                className="w-full h-full object-cover rounded-full shadow-2xl"
                loading="eager" // Load immediately
              />
            </div>

            <div className="relative w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] overflow-hidden rounded-3xl border-4 border-gray-700 group-hover:border-orange-500 transition-all duration-300 shadow-2xl">
              <img 
                src="/profile.png" 
                alt="Galvin Alfito D - Web Developer" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="eager"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
              <i className="bx bx-code-alt text-white text-xl"></i>
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <i className="bx bx-heart text-white text-xl"></i>
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
    </section>
  );
};

export default About;
