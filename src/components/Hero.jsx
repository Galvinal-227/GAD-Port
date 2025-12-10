import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Sembunyikan scroll indicator setelah di-scroll sedikit
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="home" className="relative z-10 overflow-hidden flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">

      <div className="ml-[5%] mt-24">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
          GALVIN ALFITO D.
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider mb-4">
          Creative Web Developer & Designer
        </h2>

        <p className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem] mb-6">
          Passionate web developer with expertise in modern web technologies. I create responsive, user-friendly websites and applications that deliver exceptional user experiences.
        </p>

        <div className="flex gap-4 mt-8">
          <a
  href="https://drive.google.com/file/d/your-resume-id/view"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider overflow-hidden"
>
  {/* Background layers */}
  <div className="absolute inset-0 bg-[#0a0a0a] transition-all duration-500 group-hover:scale-105"></div>
  
  {/* Animated gradient border */}
  <div className="absolute inset-0 rounded-full p-[1px]">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
  </div>
  
  {/* Content */}
  <div className="relative flex items-center justify-center gap-2 z-10">
    <span className="transition-all duration-300 group-hover:text-white">
      My Resume
    </span>
    <i className="bx bx-link-external text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue-400"></i>
  </div>
  
  {/* Hover effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  {/* Ripple effect */}
  <span className="absolute inset-0 rounded-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>
  
  <style jsx>{`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite linear;
    }
  `}</style>
</a>
        </div>

      </div>

      <Spline  
        className="
          absolute 
          -z-20
          lg:top-0 
          top-[40%]
          left-0
          lg:left-[25%]
          w-full
          h-[45vh]
          lg:h-full
          pointer-events-none
        "
        scene="https://prod.spline.design/mHdJc-tphylUCaps/scene.splinecode"
      />

      {/* Animated Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={scrollToAbout}
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm tracking-wider mb-2">Scroll Down</span>
          <div className="animate-bounce">
            <i className="bx bx-chevron-down text-2xl"></i>
          </div>
        </button>
      </div>

    </main>
  )
}


export default Hero


