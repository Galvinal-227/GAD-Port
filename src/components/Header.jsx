import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    // ScrollTrigger animations for sections
    const sections = ['home', 'about', 'contact'].map(id => document.getElementById(id));
    
    sections.forEach((section, index) => {
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            // Highlight nav item when section enters viewport
            gsap.to(navItemsRef.current[index], {
              color: '#ffffff',
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out'
            });
          },
          onLeave: () => {
            // Reset nav item when section leaves viewport
            gsap.to(navItemsRef.current[index], {
              color: '#ffffff',
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          },
          onEnterBack: () => {
            // Highlight nav item when section enters viewport from bottom
            gsap.to(navItemsRef.current[index], {
              color: '#ffffff',
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out'
            });
          },
          onLeaveBack: () => {
            // Reset nav item when section leaves viewport from top
            gsap.to(navItemsRef.current[index], {
              color: '#ffffff',
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      }
    });

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

  return (
    <header 
      ref={headerRef}
      className="flex justify-between items-center py-6 px-4 lg:px-20 fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 transition-all duration-300"
      style={{ opacity: 0 }}
    >
      {/* Logo */}
      <h1 
        ref={logoRef}
        className="text-2xl md:text-3xl font-light text-white cursor-pointer transition-all duration-300"
        style={{ opacity: 0 }}
        onClick={() => handleNavClick({ preventDefault: () => {} }, 'home')}
      >
        ALDEV
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {[
          { name: 'Home', id: 'home' },
          { name: 'About Me', id: 'about' },
          { name: 'Contact', id: 'contact' }
        ].map((item, index) => (
          <a
            key={item.id}
            ref={addToNavRefs}
            className="text-white hover:text-gray-300 transition-all duration-300 text-sm relative group cursor-pointer"
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            style={{ opacity: 0 }}
          >
            {item.name}
            {/* Hover underline effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
          </a>
        ))}
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
          <h1 className="text-2xl text-white">ALDEV</h1>
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
            { name: 'Home', id: 'home' },
            { name: 'About Me', id: 'about' },
            { name: 'Contact', id: 'contact' }
          ].map((item, index) => (
            <a
              key={item.id}
              ref={addToMobileNavRefs}
              className="text-white text-lg hover:bg-gray-900 transition-colors py-4 px-6 border-b border-gray-800 cursor-pointer bg-black"
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              style={{ opacity: 0, transform: 'translateX(50px)' }}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
