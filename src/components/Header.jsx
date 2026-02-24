import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2 } from 'lucide-react'; // Import icon game

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileNavItemsRef = useRef([]);
  const location = useLocation(); // Hook untuk mengetahui route aktif

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Add nav items to ref array
  const addToNavRefs = (el) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  const addToMobileNavRefs = (el) => {
    if (el && !mobileNavItemsRef.current.includes(el)) {
      mobileNavItemsRef.current.push(el);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header scroll animation
  useEffect(() => {
    if (isScrolled) {
      // Header mengecil saat scroll
      gsap.to(headerRef.current, {
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Logo mengecil
      gsap.to(logoRef.current, {
        fontSize: '1.5rem',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Nav items mengecil
      gsap.to(navItemsRef.current, {
        fontSize: '0.875rem',
        duration: 0.3,
        ease: 'power2.out'
      });

    } else {
      // Kembali ke ukuran normal
      gsap.to(headerRef.current, {
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Logo kembali ke ukuran normal
      gsap.to(logoRef.current, {
        fontSize: '2rem',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Nav items kembali ke ukuran normal
      gsap.to(navItemsRef.current, {
        fontSize: '1rem',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isScrolled]);

  // Initial animations
  useEffect(() => {
    // Header slide down animation
    gsap.fromTo(headerRef.current,
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Logo fade in
    gsap.fromTo(logoRef.current,
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
      }
    );

    // Nav items stagger animation
    gsap.fromTo(navItemsRef.current,
      {
        opacity: 0,
        y: -30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Cleanup ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Mobile menu animations
    if (isMobileMenuOpen) {
      // Open mobile menu
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate mobile nav items
      gsap.fromTo(mobileNavItemsRef.current,
        {
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    } else {
      // Close mobile menu
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        x: "100%",
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isMobileMenuOpen]);

  // Handle nav click
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    closeMobileMenu();
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cek apakah di halaman game
  const isGamePage = location.pathname === '/game';

  return (
    <header 
      ref={headerRef}
      className="flex justify-between items-center py-6 px-4 lg:px-20 fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 transition-all duration-300"
      style={{ opacity: 0 }}
    >
      {/* Logo - Link ke home */}
      <Link 
        to="/"
        ref={logoRef}
        className="text-2xl md:text-3xl font-light text-white cursor-pointer transition-all duration-300 hover:text-gray-300"
        style={{ opacity: 0 }}
      >
        ALDEV
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {[
          { name: 'Home', id: 'home', path: '/' },
          { name: 'About Me', id: 'about', path: '/' },
          { name: 'Contact', id: 'contact', path: '/' }
        ].map((item, index) => (
          <Link
            key={item.id}
            ref={addToNavRefs}
            className={`text-white hover:text-gray-300 transition-all duration-300 text-sm relative group cursor-pointer ${
              !isGamePage && location.hash === `#${item.id}` ? 'text-gray-300' : ''
            }`}
            to={item.path}
            onClick={(e) => handleNavClick(e, item.id)}
            style={{ opacity: 0 }}
          >
            {item.name}
            {/* Hover underline effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
          </Link>
        ))}
        
        {/* Game Link - Desktop */}
        <Link
          to="/game"
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm ${
            isGamePage 
              ? 'bg-[#e99b63] text-black font-semibold' 
              : 'bg-white/10 text-white hover:bg-[#e99b63] hover:text-black border border-white/20'
          }`}
        >
          <Gamepad2 size={16} />
          <span>Play Game</span>
          {!isGamePage && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e99b63] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e99b63]"></span>
            </span>
          )}
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white text-2xl z-60"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-50 md:hidden"
        style={{ 
          opacity: 0,
          transform: 'translateX(100%)'
        }}
      >
        {/* Header Mobile Menu */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-black">
          <Link 
            to="/" 
            className="text-2xl text-white hover:text-gray-300"
            onClick={closeMobileMenu}
          >
            ALDEV
          </Link>
          <button 
            className="text-white text-2xl"
            onClick={closeMobileMenu}
          >
            ✕
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex flex-col gap-0 p-0 bg-black">
          {[
            { name: 'Home', id: 'home', path: '/' },
            { name: 'About Me', id: 'about', path: '/' },
            { name: 'Contact', id: 'contact', path: '/' }
          ].map((item, index) => (
            <Link
              key={item.id}
              ref={addToMobileNavRefs}
              className="text-white text-lg hover:bg-gray-900 transition-colors py-4 px-6 border-b border-gray-800 cursor-pointer bg-black"
              to={item.path}
              onClick={(e) => {
                if (item.path === '/') {
                  e.preventDefault();
                  closeMobileMenu();
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  closeMobileMenu();
                }
              }}
              style={{ opacity: 0, transform: 'translateX(50px)' }}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Game Link - Mobile */}
          <Link
            to="/game"
            className={`flex items-center gap-3 py-4 px-6 border-b border-gray-800 transition-colors ${
              isGamePage 
                ? 'bg-[#e99b63] text-black font-semibold' 
                : 'text-white hover:bg-gray-900'
            }`}
            onClick={closeMobileMenu}
            ref={addToMobileNavRefs}
            style={{ opacity: 0, transform: 'translateX(50px)' }}
          >
            <Gamepad2 size={20} />
            <span>🎮 Play Mini Game</span>
            {!isGamePage && (
              <span className="ml-auto text-xs bg-[#e99b63] text-black px-2 py-1 rounded-full">
                NEW
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
