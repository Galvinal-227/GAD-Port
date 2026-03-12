import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef([]);
  const toolsRef = useRef([]);
  const statsRef = useRef([]);
  
  const [isCvLoading, setIsCvLoading] = useState(false);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const projectsUrl = "https://galvinal-227.github.io/ProjectGallery/";
  const cvDriveUrl = "https://drive.google.com/file/d/1ADb9rmnCz_lUvl8aoTz9Pi7sd8hVCGsB/view?usp=drive_link";
  const galvinCardUrl = "https://github.com/Galvinal-227/ME-"; 
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

  const handleMeClick = () => {
    window.open(galvinCardUrl, '_blank');
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

              {/* TOMBOL ME? DENGAN SVG */}
              <button
                onClick={handleMeClick}
                className="group relative hover:scale-110 transition-transform duration-300"
                title="Check out my interactive card"
              >
                <svg width="78" height="39" viewBox="0 0 78 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                  <g filter="url(#filter0_d_7_3)">
                    <path d="M18.44 24.48L16.64 23.4L15.96 21.92L13.36 19.24L13.08 18.64L11.6 16.72L11.36 16L11.28 16.28C11.2533 16.3867 11.24 16.6267 11.24 17C11.2667 17.3733 11.2 17.64 11.04 17.8C10.96 17.9067 10.8667 18.12 10.76 18.44C10.6533 18.7333 10.5867 18.9333 10.56 19.04L10.44 20.44C10.4667 20.4933 10.4933 20.5333 10.52 20.56C10.5733 20.5867 10.6133 20.6533 10.64 20.76C10.6667 20.8667 10.68 21.04 10.68 21.28C10.68 21.4933 10.64 21.8133 10.56 22.24C10.4 23.0667 10.3333 23.7067 10.36 24.16C10.4133 24.5867 10.44 24.8267 10.44 24.88C10.44 24.9867 10.4533 25.2 10.48 25.52C10.5333 25.8133 10.5067 26.2267 10.4 26.76C10.2667 27.7733 10.24 28.5867 10.32 29.2L9.88 29.44C9.77333 29.4133 9.61333 29.4 9.4 29.4C9.18667 29.4 8.94667 29.4133 8.68 29.44C8.44 29.44 8.18667 29.4533 7.92 29.48C7.65333 29.48 7.42667 29.48 7.24 29.48H6.72L5.04 29.88L4 29.32C4 28.8933 4.05333 28.4133 4.16 27.88C4.24 27.3467 4.30667 26.88 4.36 26.48C4.41333 26.08 4.44 25.7733 4.44 25.56C4.44 25.5067 4.41333 25.3867 4.36 25.2C4.30667 24.9867 4.26667 24.84 4.24 24.76L4.52 18.72C4.6 18.72 4.65333 18.6267 4.68 18.44C4.70667 18.2533 4.72 18.0533 4.72 17.84C4.72 17.6267 4.70667 17.4267 4.68 17.24C4.65333 17.0267 4.62667 16.8933 4.6 16.84C4.57333 16.8133 4.58667 16.7067 4.64 16.52C4.72 16.3333 4.81333 16.1333 4.92 15.92L5.2 15.32C5.25333 15.2133 5.29333 15.1467 5.32 15.12C5.37333 15.0667 5.41333 15.0267 5.44 15C5.49333 14.84 5.50667 14.7067 5.48 14.6C5.45333 14.4933 5.41333 14.3733 5.36 14.24C5.33333 14.1067 5.30667 13.92 5.28 13.68C5.25333 13.44 5.26667 13.0933 5.32 12.64C5.42667 11.7333 5.50667 10.9867 5.56 10.4C5.64 9.78667 5.68 9.4 5.68 9.24V8.32C5.62667 8.08 5.6 7.85334 5.6 7.64C5.62667 7.4 5.52 7.21334 5.28 7.08L5.32 6.56C5.42667 6.32 5.84 6.2 6.56 6.2H8.68C8.84 6.2 9.04 6.12 9.28 5.96C9.54667 5.8 9.84 5.70667 10.16 5.68C10.2933 5.62667 10.4533 5.56 10.64 5.48C10.8267 5.37334 10.96 5.32 11.04 5.32C11.1467 5.32 11.28 5.34667 11.44 5.4C11.6267 5.45334 11.8133 5.56 12 5.72V6.56L14.16 10.84L14.8 14.2L16.16 16.4L17.44 19.2L18.04 19.36L19.36 18.16C19.4133 18.0267 19.4667 17.88 19.52 17.72C19.6 17.56 19.6933 17.4133 19.8 17.28C19.96 17.0133 20.1467 16.72 20.36 16.4C20.6 16.08 20.88 15.7333 21.2 15.36C22.48 13.9733 23.04 13.0267 22.88 12.52L24.6 9.72C25.0533 9.90667 25.4267 9.86667 25.72 9.6C26.04 9.30667 26.2667 8.65334 26.4 7.64C26.4 7.58667 26.3867 7.50667 26.36 7.4C26.3333 7.26667 26.2933 7.14667 26.24 7.04C26.5867 6.88 26.7867 6.72 26.84 6.56C26.8933 6.4 26.92 6.16 26.92 5.84C27.24 5.70667 27.52 5.62667 27.76 5.6C28.0267 5.54667 28.3067 5.48 28.6 5.4L31.32 7.04C31.2933 7.28 31.2667 7.53334 31.24 7.8C31.2133 8.06667 31.1733 8.34667 31.12 8.64C31.0667 9.01334 31.0133 9.41334 30.96 9.84C30.9067 10.24 30.8533 10.64 30.8 11.04C30.7733 11.4133 30.7333 11.76 30.68 12.08C30.6533 12.4 30.6267 12.6533 30.6 12.84C30.5467 13.1067 30.4933 13.5733 30.44 14.24C30.3867 14.88 30.32 15.76 30.24 16.88C30.16 19.0933 30.44 20.3733 31.08 20.72C31.08 20.9067 31.0667 21.32 31.04 21.96C31.04 22.6 31.0267 23.52 31 24.72C30.9733 25.3067 30.96 25.8267 30.96 26.28C30.96 26.7333 30.96 27.1333 30.96 27.48V28.72C30.24 28.9067 29.48 29.08 28.68 29.24C27.9067 29.4 27.2933 29.48 26.84 29.48C26.6533 29.48 26.4667 29.4133 26.28 29.28C26.0933 29.1467 25.9733 28.9333 25.92 28.64C26.1067 28.48 26.2 28.4 26.2 28.4C26.2267 28.4 26.1733 28.3333 26.04 28.2V23.48L26.32 22.84H26.04V21C26.04 20.7067 26.0267 20.3067 26 19.8C25.9733 19.2933 25.9333 18.6533 25.88 17.88C25.8 17.1067 25.7467 16.52 25.72 16.12C25.6933 15.6933 25.68 15.4533 25.68 15.4C25.68 15.32 25.7467 15.1467 25.88 14.88C26.04 14.5867 26.1867 14.3467 26.32 14.16C26.3733 14.0267 26.3867 13.8933 26.36 13.76C26.36 13.6 26.3733 13.4667 26.4 13.36C26.4 13.2533 26.4533 13.16 26.56 13.08C26.6933 12.9733 26.7867 12.8933 26.84 12.84C26.7867 12.68 26.72 12.5067 26.64 12.32C26.5867 12.1333 26.56 12.0133 26.56 11.96C25.28 11.3733 24.8933 11.8133 25.4 13.28L24.48 15.28L21.72 19.36L19.24 24.12L18.44 24.48ZM52.3922 20.76C51.8055 20.68 51.2855 20.7867 50.8322 21.08C50.6722 21.16 50.5122 21.24 50.3522 21.32C50.1922 21.3733 50.0322 21.4267 49.8722 21.48C49.7922 21.5067 49.7122 21.5333 49.6322 21.56C49.5522 21.5867 49.4855 21.6133 49.4322 21.64L43.8722 23.32C42.3255 22.9733 41.7789 23.2267 42.2322 24.08C42.3122 24.2667 42.4189 24.5467 42.5522 24.92C42.6855 25.2933 42.7922 25.56 42.8722 25.72C43.2189 25.8533 43.5789 26.0667 43.9522 26.36C44.3255 26.6267 44.6722 26.7867 44.9922 26.84L45.7122 26.76C45.8989 26.76 46.1522 26.7467 46.4722 26.72C46.8189 26.6933 47.1522 26.6533 47.4722 26.6C47.8189 26.52 48.1255 26.4267 48.3922 26.32C48.6855 26.2133 48.8855 26.08 48.9922 25.92C49.0722 25.7867 49.1922 25.6933 49.3522 25.64C49.5122 25.56 49.6722 25.4933 49.8322 25.44C49.9389 25.4133 50.0322 25.4 50.1122 25.4C50.2189 25.3733 50.3389 25.3467 50.4722 25.32L50.9122 26.88L50.4322 27.8C50.4055 27.8533 50.3122 27.92 50.1522 28C50.0189 28.0533 49.8589 28.1333 49.6722 28.24C49.4855 28.3467 49.2989 28.4533 49.1122 28.56C48.9522 28.64 48.8322 28.72 48.7522 28.8C48.6989 28.8533 48.5522 28.88 48.3122 28.88C48.0989 28.88 47.8455 28.88 47.5522 28.88C47.2855 28.88 47.0055 28.8933 46.7122 28.92C46.4189 28.9467 46.1922 29 46.0322 29.08C45.6589 29.2667 45.3655 29.3867 45.1522 29.44C44.9655 29.4933 44.8055 29.5333 44.6722 29.56C44.5389 29.6133 44.4455 29.6 44.3922 29.52C44.3389 29.4933 44.2455 29.48 44.1122 29.48C44.0322 29.48 43.9255 29.48 43.7922 29.48C43.6589 29.48 43.5255 29.4667 43.3922 29.44C43.0455 29.4133 42.7655 29.4 42.5522 29.4C42.3389 29.3733 42.2055 29.36 42.1522 29.36L38.3122 27.48C38.2322 26.68 37.8589 26.28 37.1922 26.28C37.0589 26.28 36.8989 26.1733 36.7122 25.96C36.5255 25.72 36.3655 25.4667 36.2322 25.2C36.1255 25.0667 36.0322 24.92 35.9522 24.76C35.8722 24.5733 35.7922 24.3733 35.7122 24.16L35.3522 19.6L35.7122 16.92C35.7389 16.8133 35.8189 16.68 35.9522 16.52C36.1122 16.2533 36.3122 15.8533 36.5522 15.32C36.6589 15.08 36.8722 14.8533 37.1922 14.64C37.5122 14.4267 37.8455 14.24 38.1922 14.08C38.5655 13.8933 38.9122 13.7333 39.2322 13.6C39.5789 13.44 39.8322 13.3067 39.9922 13.2C40.3122 13.2533 40.7789 12.9067 41.3922 12.16C41.5522 11.9733 41.7522 11.8267 41.9922 11.72C42.2322 11.5867 42.4722 11.48 42.7122 11.4C42.8455 11.3467 42.9922 11.3067 43.1522 11.28C43.3122 11.2533 43.4589 11.2267 43.5922 11.2L48.2722 11.8C48.5389 11.8533 48.8189 11.9333 49.1122 12.04C49.3255 12.1467 49.5389 12.28 49.7522 12.44C49.9655 12.6 50.1389 12.7867 50.2722 13C50.4589 13.4533 50.7255 13.8267 51.0722 14.12C51.4189 14.3867 51.6989 14.5733 51.9122 14.68L53.3922 17.32L53.0722 19.92L52.3922 20.76ZM46.4722 19.4L46.7922 19.16C46.8722 19.1067 46.9522 19.0533 47.0322 19C47.1122 18.92 47.1789 18.8667 47.2322 18.84C47.4189 18.7867 47.6322 18.68 47.8722 18.52C48.1122 18.36 48.2055 18.16 48.1522 17.92C48.1522 17.4667 47.9122 16.96 47.4322 16.4C46.9522 15.84 46.3255 15.44 45.5522 15.2C45.1789 15.0667 44.8189 15 44.4722 15C44.1255 15 43.7922 15.0267 43.4722 15.08C43.1789 15.1067 42.8989 15.1467 42.6322 15.2C42.3922 15.2533 42.1922 15.28 42.0322 15.28C41.4189 15.1467 41.0722 15.4267 40.9922 16.12C40.5922 16.7333 40.3922 17.4133 40.3922 18.16C40.4189 18.88 40.4989 19.5733 40.6322 20.24C40.6322 20.6133 40.6989 20.92 40.8322 21.16C40.9922 21.4 41.1789 21.5467 41.3922 21.6C41.6055 21.6533 41.8189 21.6133 42.0322 21.48C42.2722 21.32 42.4722 21.04 42.6322 20.64L46.4722 19.4ZM61.6256 20.44L62.5056 14.92C62.5323 14.84 62.599 14.72 62.7056 14.56C62.759 14.4533 62.839 14.3333 62.9456 14.2C63.0523 14.0667 63.199 13.9333 63.3856 13.8C64.0256 13.3733 64.3456 12.8 64.3456 12.08C64.9056 11.6 65.3323 11.1067 65.6256 10.6C65.9456 10.0933 66.1723 9.61334 66.3056 9.16C66.439 8.70667 66.519 8.29334 66.5456 7.92C66.599 7.54667 66.639 7.25334 66.6656 7.04L65.9056 5.48C65.4523 5.10667 64.9723 4.85334 64.4656 4.72C63.9856 4.56 63.759 4.48 63.7856 4.48C63.5723 4.50667 63.3856 4.54667 63.2256 4.6C63.0923 4.62667 62.9723 4.53334 62.8656 4.32C62.759 4.10667 62.6123 4.02667 62.4256 4.08C62.239 4.13334 62.039 4.16 61.8256 4.16C61.479 4.16 61.1456 4.18667 60.8256 4.24C60.5323 4.26667 60.3456 4.28 60.2656 4.28C60.1323 4.28 60.0256 4.29334 59.9456 4.32C59.839 4.34667 59.7056 4.37334 59.5456 4.4C59.4123 4.42667 59.2523 4.45334 59.0656 4.48C58.559 4.61333 58.1323 4.70667 57.7856 4.76L57.2256 4.56L56.9856 2.88L57.2656 2.2C57.399 2.12 57.559 2.04 57.7456 1.96C57.959 1.88 58.1723 1.78667 58.3856 1.68C58.5456 1.65334 58.7456 1.62667 58.9856 1.6C59.2256 1.57334 59.4923 1.56 59.7856 1.56C60.4523 1.56 60.7856 1.25334 60.7856 0.640003C61.159 0.640003 61.639 0.58667 62.2256 0.480003C62.839 0.373336 63.4656 0.280002 64.1056 0.200002C64.7456 0.120003 65.3723 0.0666693 65.9856 0.0400014C66.6256 0.0133351 67.159 0.0800017 67.5856 0.240001C67.7456 0.400002 67.959 0.560003 68.2256 0.720002C68.4923 0.880002 68.759 1.02667 69.0256 1.16C69.319 1.26667 69.5856 1.36 69.8256 1.44C70.0923 1.52 70.2923 1.56 70.4256 1.56L71.5056 2.28C71.4523 2.73334 71.4656 3.04 71.5456 3.2C71.6256 3.36 71.7323 3.46667 71.8656 3.52C72.0256 3.57334 72.199 3.61334 72.3856 3.64C72.599 3.64 72.7856 3.69334 72.9456 3.8L73.4256 6.4L72.7056 11.28L68.3456 15.12L67.3856 15.56L66.3456 17.96L65.5456 19.44L64.8256 20.64L62.2656 21.24L61.6256 20.44ZM64.2656 24.64C64.6123 24.6933 64.8123 24.6933 64.8656 24.64C65.1056 24.4 65.2923 24.3467 65.4256 24.48C65.5856 24.6133 65.7056 24.8 65.7856 25.04C65.8656 25.28 65.919 25.5067 65.9456 25.72C65.999 25.9067 66.0256 25.96 66.0256 25.88L66.3456 27.56L65.9056 28.96L65.5456 29.08C65.2523 29.2133 65.0123 29.3733 64.8256 29.56C64.559 29.7467 64.2923 29.8933 64.0256 30C63.7856 30.1067 63.6523 30.16 63.6256 30.16C63.599 30.16 63.439 30.0933 63.1456 29.96C62.879 29.8267 62.4923 29.6533 61.9856 29.44C60.919 28.9333 60.319 28.5867 60.1856 28.4C60.2923 28.08 60.3723 27.7467 60.4256 27.4C60.5056 27.0267 60.559 26.6533 60.5856 26.28C60.6123 26.0933 60.6256 25.9333 60.6256 25.8C60.6256 25.64 60.639 25.5067 60.6656 25.4C60.6656 25.2667 60.679 25.1733 60.7056 25.12C60.8923 25.04 61.1323 24.9467 61.4256 24.84C61.7456 24.7333 62.0923 24.5333 62.4656 24.24L64.2656 24.64Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_7_3" x="0" y="0" width="77.4256" height="38.16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="4"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_3"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_3" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative cursor-pointer group">
            <div className="relative w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] overflow-hidden rounded-3xl border-4 border-gray-700 group-hover:border-orange-500 transition-all duration-300 shadow-2xl">
              <img 
                src="/profile.png" 
                alt="Galvin Alfito D - Web Developer" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
