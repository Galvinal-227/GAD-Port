import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef([]);
  const toolsRef = useRef([]);
  const statsRef = useRef([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    { name: "React.js / Next.js", icon: "bx bxl-react", color: "text-blue-400", level: 90 },
    { name: "JavaScript / TypeScript", icon: "bx bxl-javascript", color: "text-yellow-400", level: 85 },
    { name: "GSAP Animations", icon: "bx bx-slider-alt", color: "text-purple-400", level: 80 },
    { name: "Tailwind CSS", icon: "bx bxl-tailwind-css", color: "text-cyan-400", level: 95 },
    { name: "Three.js / 3D", icon: "bx bx-cube", color: "text-green-400", level: 75 },
    { name: "Node.js / Express", icon: "bx bxl-nodejs", color: "text-green-500", level: 70 },
  ];

  const tools = [
    { name: "Git / GitHub", icon: "bx bxl-git", color: "text-orange-400" },
    { name: "VS Code", icon: "bx bx-code-alt", color: "text-green-400" },
    { name: "Figma", icon: "bx bxl-figma", color: "text-purple-400" },
    { name: "Netlify / Vercel", icon: "bx bx-cloud-upload", color: "text-blue-300" },
  ];

  // Mouse move handler untuk 3D effect
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - top) / height - 0.5) * 2; // -1 to 1
    
    setMousePosition({ x, y });
  };

  // Add to ref arrays
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
    // Add mouse move event listener
    if (imageContainerRef.current) {
      imageContainerRef.current.addEventListener('mousemove', handleMouseMove);
      imageContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(sectionRef.current,
        { 
          opacity: 0,
          y: 100
        },
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

      // 3D Image Animation - Initial entrance
      gsap.fromTo(imageRef.current,
        {
          rotationY: -30,
          rotationX: 15,
          scale: 0.8,
          opacity: 0,
          z: -100
        },
        {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          z: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text content animation
      gsap.fromTo(textRef.current,
        {
          x: -100,
          opacity: 0
        },
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

      // Skills animation dengan efek 3D
      skillsRef.current.forEach((skill, index) => {
        gsap.fromTo(skill,
          {
            rotationY: 45,
            rotationX: 10,
            y: 50,
            opacity: 0,
            scale: 0.8
          },
          {
            rotationY: 0,
            rotationX: 0,
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

        // Progress bar animation
        const progressBar = skill.querySelector('.progress-bar');
        const skillLevel = skills[index].level;
        
        gsap.fromTo(progressBar,
          { width: 0 },
          {
            width: `${skillLevel}%`,
            duration: 1.5,
            delay: 0.5 + (index * 0.1),
            ease: "power2.out",
            scrollTrigger: {
              trigger: skill,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover effect untuk skills
        skill.addEventListener('mouseenter', () => {
          gsap.to(skill, {
            rotationY: 5,
            rotationX: 2,
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        skill.addEventListener('mouseleave', () => {
          gsap.to(skill, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Tools animation
      toolsRef.current.forEach((tool, index) => {
        gsap.fromTo(tool,
          {
            rotationY: -30,
            y: 30,
            opacity: 0,
            scale: 0
          },
          {
            rotationY: 0,
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

        // Hover effect untuk tools
        tool.addEventListener('mouseenter', () => {
          gsap.to(tool, {
            rotationY: 10,
            y: -8,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        tool.addEventListener('mouseleave', () => {
          gsap.to(tool, {
            rotationY: 0,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(stat,
          {
            rotationY: 20,
            rotationX: 10,
            y: 50,
            opacity: 0,
            scale: 0.5
          },
          {
            rotationY: 0,
            rotationX: 0,
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

        // Hover effect untuk stats
        stat.addEventListener('mouseenter', () => {
          gsap.to(stat, {
            rotationY: 15,
            y: -10,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        stat.addEventListener('mouseleave', () => {
          gsap.to(stat, {
            rotationY: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Floating elements animation
      const floatingElements = sectionRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -20 : 20,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      });

      // Background elements parallax
      const bgElements = sectionRef.current.querySelectorAll('.bg-element');
      bgElements.forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? 50 : -50,
          x: index % 2 === 0 ? -30 : 30,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (imageContainerRef.current) {
        imageContainerRef.current.removeEventListener('mousemove', handleMouseMove);
        imageContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Effect untuk handle 3D cursor follow
  useEffect(() => {
    if (!imageRef.current) return;

    const { x, y } = mousePosition;
    
    // Smooth 3D rotation berdasarkan posisi cursor
    gsap.to(imageRef.current, {
      rotationY: x * 15, // Rotasi horizontal
      rotationX: -y * 10, // Rotasi vertical
      x: x * 10, // Sedikit pergeseran horizontal
      y: y * 10, // Sedikit pergeseran vertical
      duration: 0.8,
      ease: "power2.out"
    });

    // Efek parallax untuk floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        x: x * (20 + index * 5),
        y: y * (20 + index * 5),
        rotation: x * (5 + index * 2),
        duration: 1,
        ease: "power2.out"
      });
    });

  }, [mousePosition]);

  // Reset rotation ketika mouse leave
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });

    // Reset floating elements juga
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element) => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    });
  };

  return (
    <section ref={sectionRef}  id="about" className="py-20 px-4 lg:px-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-10"></div>
        <div className="bg-element absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences with code, creativity, and cutting-edge technology
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div ref={textRef} className="flex-1">
            <h3 className="text-3xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Creative Full-Stack Developer
            </h3>
            
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Passionate developer with <span className="text-purple-400 font-semibold">3+ years</span> of experience 
              creating immersive web experiences. I specialize in modern JavaScript frameworks, 
              interactive animations, and responsive design.
            </p>

            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or creating tutorial content.
            </p>

            {/* Skills & Tools Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-10">
              {/* Skills */}
              <div>
                <h4 className="text-2xl font-bold mb-6 tracking-tight flex items-center gap-3">
                  <i className="bx bx-code-block text-purple-400"></i>
                  Technical Skills
                </h4>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      ref={addToSkillsRefs}
                      className="skill-item group cursor-pointer transform-style-3d"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <i className={`${skill.icon} ${skill.color} text-xl`}></i>
                          <span className="text-gray-300 font-medium">{skill.name}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="progress-bar h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 relative overflow-hidden"
                          style={{ width: '0%' }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-2xl font-bold mb-6 tracking-tight flex items-center gap-3">
                  <i className="bx bx-cog text-cyan-400"></i>
                  Tools & Technologies
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {tools.map((tool, index) => (
                    <div
                      key={tool.name}
                      ref={addToToolsRefs}
                      className="tool-item flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 cursor-pointer transform-style-3d"
                    >
                      <i className={`${tool.icon} ${tool.color} text-xl`}></i>
                      <span className="text-gray-300 text-sm font-medium">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <a
                href="#contact"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-3"
              >
                <span>Get In Touch</span>
                <i className="bx bx-chat text-xl"></i>
              </a>
              
              <a
                href="#projects"
                className="border-2 border-gray-700 text-gray-300 py-4 px-8 rounded-2xl font-semibold tracking-wider transition-all duration-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10 flex items-center gap-3"
              >
                <span>View Projects</span>
                <i className="bx bx-folder-open text-xl"></i>
              </a>
            </div>
          </div>

          {/* Profile Image dengan 3D Cursor Follow */}
          <div 
            ref={imageContainerRef}
            className="relative cursor-pointer"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-xl opacity-20"></div>
            
            {/* Main Image Container */}
            <div 
              ref={imageRef}
              className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-purple-500 to-cyan-500 p-1 transform-style-3d"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
                <img 
                  src="/profile.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 pointer-events-none"></div>
            </div>

            {/* Floating Elements yang ikut cursor */}
            <div className="floating-element absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-code-alt text-white text-2xl"></i>
            </div>

            <div className="floating-element absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-heart text-white text-2xl"></i>
            </div>

            {/* Additional floating elements */}
            <div className="floating-element absolute -top-8 left-8 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-star text-white text-xl"></i>
            </div>

            <div className="floating-element absolute bottom-4 -right-8 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-rocket text-white text-xl"></i>
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-full text-sm font-bold shadow-2xl transform-style-3d">
              <div className="flex items-center gap-2">
                <i className="bx bx-award"></i>
                <span>3+ Years Exp</span>
              </div>
            </div>

            {/* Hover Instruction */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <i className="bx bx-mouse text-cyan-400"></i>
                Hover for 3D effect
              </p>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">
          {[
            { number: "10+", label: "Projects Completed", icon: "bx bx-check-circle" },
            { number: "3+", label: "Years Experience", icon: "bx bx-calendar" },
            { number: "5+", label: "Tech Stacks", icon: "bx bxl-react" },
            { number: "24/7", label: "Code Enthusiast", icon: "bx bx-coffee" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              ref={addToStatsRefs}
              className="text-center group cursor-pointer transform-style-3d"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                <i className={`${stat.icon} text-2xl text-cyan-400`}></i>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{stat.number}</h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        /* Smooth transitions untuk semua transform */
        .floating-element,
        .skill-item,
        .tool-item {
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default About;
