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

  // Data foto untuk floating shapes
  const projectPhotos = [
    {
      id: 1,
      img: "/Screenshot 2026-03-04 134038.png",
      style: { top: '10%', left: '5%', width: '120px', height: '120px', rotate: '-5deg' }
    },
    {
      id: 2,
      img: "/Screenshot 2026-03-04 143657.png",
      style: { top: '15%', right: '8%', width: '150px', height: '150px', rotate: '8deg' }
    },
    {
      id: 3,
      img: "/Screenshot 2026-03-06 050430.png",
      style: { bottom: '20%', left: '12%', width: '130px', height: '130px', rotate: '12deg' }
    },
    {
      id: 4,
      img: "/Screenshot 2026-03-06 051150.png",
      style: { bottom: '25%', right: '15%', width: '140px', height: '140px', rotate: '-8deg' }
    }
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
        
        {/* Floating Photos Background - Seperti di portofolio HTML */}
        <div className="floating-shapes absolute inset-0 pointer-events-none z-0">
          {projectPhotos.map((photo) => (
            <div
              key={photo.id}
              className="shape absolute rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:rotate-0 hover:z-50 hover:shadow-orange-500/30"
              style={{
                ...photo.style,
                animation: `float ${6 + photo.id * 0.5}s ease-in-out infinite`,
                animationDelay: `${photo.id * 0.3}s`,
                filter: 'grayscale(40%) brightness(0.9)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%) brightness(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(40%) brightness(0.9)';
              }}
            >
              <img 
                src={photo.img} 
                alt={`Project ${photo.id}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <span className="text-white text-xs font-semibold">Project {photo.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Liquid Wave Effect - Tetap ada tapi lebih subtle */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 Q 25 30, 50 50 T 100 50" stroke="#f97316" fill="none" strokeWidth="0.5" opacity="0.2">
                  <animate attributeName="d" 
                    values="M0 50 Q 25 30, 50 50 T 100 50; 
                            M0 50 Q 25 70, 50 50 T 100 50; 
                            M0 50 Q 25 30, 50 50 T 100 50" 
                    dur="8s" repeatCount="indefinite"/>
                </path>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#wave)"/>
          </svg>
        </div>

        {/* Konten Text - Dengan z-index lebih tinggi dari foto */}
        <div className="overflow-hidden relative z-20">
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

        <div className="h-20 md:h-24 relative z-20">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider mb-4">
            <span className="text-white">{typedText}</span>
            <span className="animate-pulse text-3xl text-orange-300">|</span>
          </h2>
        </div>

        <p className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem] mb-6 animate-fadeInUp relative z-20">
          Passionate web developer with expertise in modern web technologies. I create responsive, user-friendly websites and applications that deliver exceptional user experiences.
          
          {/* Accent Line */}
          <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-300 to-orange-500 rounded-full opacity-50"></span>
        </p>
      </div>

      <Spline  
        className="
          absolute 
          -z-10
          lg:top-0 
          top-[40%]
          left-0
          lg:left-[25%]
          w-full
          h-[45vh]
          lg:h-full
          pointer-events-none
          animate-float
          opacity-60
        "
        scene="https://prod.spline.design/mHdJc-tphylUCaps/scene.splinecode"
      />

      {/* Animated Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-30 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
      <div className="absolute left-5 bottom-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4 z-30">
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

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotate-start, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotate-mid, 5deg));
          }
        }

        .shape {
          --rotate-start: 0deg;
          --rotate-mid: 5deg;
          animation: float 6s ease-in-out infinite;
          transition: all 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .shape:hover {
          animation-play-state: paused;
          box-shadow: 0 30px 50px -10px rgba(249, 115, 22, 0.5);
        }

        /* Menentukan rotasi awal untuk setiap shape */
        .shape:nth-child(1) { --rotate-start: -5deg; --rotate-mid: 2deg; }
        .shape:nth-child(2) { --rotate-start: 8deg; --rotate-mid: 12deg; }
        .shape:nth-child(3) { --rotate-start: 12deg; --rotate-mid: 15deg; }
        .shape:nth-child(4) { --rotate-start: -8deg; --rotate-mid: -2deg; }
        .shape:nth-child(5) { --rotate-start: 15deg; --rotate-mid: 20deg; }
        .shape:nth-child(6) { --rotate-start: -12deg; --rotate-mid: -5deg; }

        @media (max-width: 768px) {
          .shape {
            opacity: 0.3;
          }
          .shape:hover {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  )
}

export default Hero;

