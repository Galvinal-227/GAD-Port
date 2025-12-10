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
  className="group border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] hover:border-[#3a3a3a] relative overflow-hidden"
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    My Resume 
    <i className="bx bx-link-external text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
  </span>
  
  {/* Hover effect background */}
  <span className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
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

