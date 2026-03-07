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
        
        {/* Liquid Ripple Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Ripple 1 */}
          <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-orange-400/5 animate-ripple"></div>
          
          {/* Ripple 2 */}
          <div className="absolute top-40 -left-10 w-80 h-80 rounded-full bg-orange-500/5 animate-ripple animation-delay-1000"></div>
          
          {/* Ripple 3 */}
          <div className="absolute bottom-0 right-20 w-64 h-64 rounded-full bg-orange-300/5 animate-ripple animation-delay-2000"></div>
          
          {/* Ripple 4 */}
          <div className="absolute top-60 left-40 w-72 h-72 rounded-full bg-orange-400/5 animate-ripple animation-delay-3000"></div>
          
          {/* Ripple 5 */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-orange-600/5 animate-ripple animation-delay-1500"></div>
        </div>

        {/* Liquid Wave Effect */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 Q 25 30, 50 50 T 100 50" stroke="#f97316" fill="none" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="d" 
                    values="M0 50 Q 25 30, 50 50 T 100 50; 
                            M0 50 Q 25 70, 50 50 T 100 50; 
                            M0 50 Q 25 30, 50 50 T 100 50" 
                    dur="8s" repeatCount="indefinite"/>
                </path>
                <path d="M0 60 Q 25 40, 50 60 T 100 60" stroke="#f97316" strokeWidth="0.5" opacity="0.2">
                  <animate attributeName="d" 
                    values="M0 60 Q 25 40, 50 60 T 100 60; 
                            M0 60 Q 25 80, 50 60 T 100 60; 
                            M0 60 Q 25 40, 50 60 T 100 60" 
                    dur="7s" repeatCount="indefinite"/>
                </path>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#wave)"/>
          </svg>
        </div>

        {/* Floating Blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-20 w-32 h-32 bg-orange-400/10 rounded-full filter blur-xl animate-floatBlob"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full filter blur-xl animate-floatBlob animation-delay-2000"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-orange-300/10 rounded-full filter blur-xl animate-floatBlob animation-delay-4000"></div>
        </div>

        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8 animate-slideInLeft relative">
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent relative z-10">
              GALVIN ALFITO D.
            </span>
            {/* Text Shadow Effect */}
            <span className="absolute top-1 left-1 -z-10 blur-lg opacity-30 bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              GALVIN ALFITO D.
            </span>
          </h1>
        </div>

        <div className="h-20 md:h-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider mb-4">
            <span className="text-white">{typedText}</span>
            <span className="animate-pulse text-3xl text-orange-300">|</span>
          </h2>
        </div>

        <p className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem] mb-6 animate-fadeInUp relative">
          Passionate web developer with expertise in modern web technologies. I create responsive, user-friendly websites and applications that deliver exceptional user experiences.
          
          {/* Accent Line */}
          <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-300 to-orange-500 rounded-full opacity-50"></span>
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
          className="flex flex-col items-center text-gray-400 hover:text-orange-300 transition-colors duration-300 group"
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
            className="text-gray-400 hover:text-orange-300 transition-colors duration-300 hover:scale-110 transform"
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

