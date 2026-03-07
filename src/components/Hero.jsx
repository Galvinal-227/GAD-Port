import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Creative Web Developer & Designer',
    'Frontend Specialist',
    'UI/UX Enthusiast',
    'React Expert'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(50);
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(200);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed, roles]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="home" className="relative z-10 overflow-hidden flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">

      <div className="ml-[5%] mt-24 relative">
        
        {/* Abstract Background Shapes */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-40 -left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl -z-10 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 -z-10 opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #f97316 1px, transparent 1px),
              linear-gradient(to bottom, #f97316 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-10 right-10 -z-10">
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
                style={{
                  top: `${i * 15}px`,
                  left: `${i * 15}px`,
                  animation: `floatDot ${3 + i}s infinite`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Diagonal Lines */}
        <svg className="absolute top-0 right-0 -z-10 w-64 h-64 opacity-20" viewBox="0 0 100 100">
          <line x1="0" y1="100" x2="100" y2="0" stroke="#f97316" strokeWidth="0.5" />
          <line x1="20" y1="100" x2="100" y2="20" stroke="#f97316" strokeWidth="0.5" />
          <line x1="40" y1="100" x2="100" y2="40" stroke="#f97316" strokeWidth="0.5" />
        </svg>

        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8 animate-slideInLeft relative">
            <span className="bg-clip-text text-white relative z-10">
              GALVIN ALFITO D.
            </span>
            {/* Text Shadow Effect */}
            <span className="absolute top-1 left-1 -z-10 blur-lg opacity-30  bg-clip-text text-white">
              GALVIN ALFITO D.
            </span>
          </h1>
        </div>

        <div className="h-20 md:h-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider mb-4">
            <span className="text-white">{typedText}</span>
            <span className="animate-pulse text-3xl text-orange-400">|</span>
          </h2>
        </div>

        <p className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem] mb-6 animate-fadeInUp relative">
          Passionate web developer with expertise in modern web technologies. I create responsive, user-friendly websites and applications that deliver exceptional user experiences.
          
          {/* Accent Line */}
          <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full opacity-50"></span>
        </p>
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
          animate-float
        "
        scene="https://prod.spline.design/mHdJc-tphylUCaps/scene.splinecode"
      />

      {/* Animated Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={scrollToAbout}
          className="flex flex-col items-center text-gray-400 hover:text-orange-400 transition-colors duration-300 group"
        >
          <span className="text-sm tracking-wider mb-2">Scroll Down</span>
          <div className="animate-bounce group-hover:animate-none">
            <i className="bx bx-chevron-down text-2xl"></i>
          </div>
        </button>
      </div>

      {/* Floating Social Icons */}
      <div className="absolute left-5 bottom-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {['github', 'linkedin', 'twitter', 'instagram'].map((social, index) => (
          <a
            key={social}
            href={`#${social}`}
            className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-110 transform"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <i className={`bx bxl-${social} text-xl animate-slideInLeft`}></i>
          </a>
        ))}
      </div>

    </main>
  )
}

export default Hero;
