import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonState, setButtonState] = useState('default'); // 'default', 'sending', 'sent'

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const formContainerRef = useRef(null);
  const infoRef = useRef(null);
  const contactItemsRef = useRef([]);
  const socialLinksRef = useRef([]);
  const inputRefs = useRef([]);
  const submitBtnRef = useRef(null);

  const socialLinks = [
    { 
      name: "GitHub", 
      icon: "bx bxl-github", 
      url: "https://github.com/galvinalfito",
      color: "hover:bg-gray-800 hover:border-gray-600"
    },
    { 
      name: "LinkedIn", 
      icon: "bx bxl-linkedin", 
      url: "https://linkedin.com/in/galvinalfito",
      color: "hover:bg-yellow-700 hover:border-yellow-600"
    },
    { 
      name: "Instagram", 
      icon: "bx bxl-instagram", 
      url: "https://instagram.com/galvinalfito",
      color: "hover:bg-orange-600 hover:border-orange-500"
    },
    { 
      name: "Twitter", 
      icon: "bx bxl-twitter", 
      url: "https://twitter.com/galvinalfito",
      color: "hover:bg-amber-500 hover:border-amber-400"
    }
  ];

  const contactInfo = [
    {
      icon: "bx bx-envelope",
      label: "Email",
      value: "galvinalfito@gmail.com",
      link: "mailto:galvinalfito@gmail.com",
      color: "text-orange-400"
    },
    {
      icon: "bx bx-phone",
      label: "Phone",
      value: "+62 856-4752-7381",
      link: "https://wa.me/6285647527381",
      color: "text-yellow-400"
    },
    {
      icon: "bx bx-map",
      label: "Location",
      value: "Nganjuk, Jawa Timur",
      link: "https://maps.google.com/?q=Nganjuk,Jawa+Timur",
      color: "text-amber-400"
    }
  ];

  // Mouse move handler untuk 3D effect
  const handleMouseMove = (e) => {
    if (!formContainerRef.current) return;
    
    const { left, top, width, height } = formContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - top) / height - 0.5) * 2; // -1 to 1
    
    setMousePosition({ x, y });
  };

  // Reset mouse position
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Add to ref arrays
  const addToContactItemsRefs = (el) => {
    if (el && !contactItemsRef.current.includes(el)) {
      contactItemsRef.current.push(el);
    }
  };

  const addToSocialLinksRefs = (el) => {
    if (el && !socialLinksRef.current.includes(el)) {
      socialLinksRef.current.push(el);
    }
  };

  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Helper untuk membaca CSS variable
  const getVar = (variable) => {
    if (!submitBtnRef.current) return '';
    return getComputedStyle(submitBtnRef.current).getPropertyValue(variable).trim();
  };

  const animateButton = async () => {
    if (!submitBtnRef.current) return;

    setButtonState('sending');

    // Timeline untuk animasi wing transformations
    gsap.to(submitBtnRef.current, {
      keyframes: [
        {
          '--left-wing-first-x': 50,
          '--left-wing-first-y': 100,
          '--right-wing-second-x': 50,
          '--right-wing-second-y': 100,
          duration: 0.2,
          onComplete() {
            gsap.set(submitBtnRef.current, {
              '--left-wing-first-y': 0,
              '--left-wing-second-x': 40,
              '--left-wing-second-y': 100,
              '--left-wing-third-x': 0,
              '--left-wing-third-y': 100,
              '--left-body-third-x': 40,
              '--right-wing-first-x': 50,
              '--right-wing-first-y': 0,
              '--right-wing-second-x': 60,
              '--right-wing-second-y': 100,
              '--right-wing-third-x': 100,
              '--right-wing-third-y': 100,
              '--right-body-third-x': 60
            });
          }
        },
        {
          '--left-wing-third-x': 20,
          '--left-wing-third-y': 90,
          '--left-wing-second-y': 90,
          '--left-body-third-y': 90,
          '--right-wing-third-x': 80,
          '--right-wing-third-y': 90,
          '--right-body-third-y': 90,
          '--right-wing-second-y': 90,
          duration: 0.2
        },
        {
          '--rotate': 50,
          '--left-wing-third-y': 95,
          '--left-wing-third-x': 27,
          '--right-body-third-x': 45,
          '--right-wing-second-x': 45,
          '--right-wing-third-x': 60,
          '--right-wing-third-y': 83,
          duration: 0.25
        },
        {
          '--rotate': 55,
          '--plane-x': -8,
          '--plane-y': 24,
          duration: 0.2
        },
        {
          '--rotate': 40,
          '--plane-x': 45,
          '--plane-y': -180,
          '--plane-opacity': 0,
          duration: 0.3
        }
      ]
    });

    // Timeline untuk text & colors
    gsap.to(submitBtnRef.current, {
      keyframes: [
        {
          '--text-opacity': 0,
          '--border-radius': 0,
          '--left-wing-background': '#133FC0',
          '--right-wing-background': '#133FC0',
          duration: 0.1
        },
        {
          '--left-wing-background': '#275EFE',
          '--right-wing-background': '#275EFE',
          duration: 0.1
        },
        {
          '--left-body-background': '#2055EE',
          '--right-body-background': '#133FC0',
          duration: 0.4
        },
        {
          '--success-opacity': 1,
          '--success-scale': 1,
          duration: 0.25,
          delay: 0.25,
          onComplete: () => {
            setButtonState('sent');
          }
        }
      ]
    });
  };

  const resetButton = () => {
    if (!submitBtnRef.current) return;

    // Reset semua inline styles
    submitBtnRef.current.removeAttribute('style');
    
    // Fade in lagi
    gsap.fromTo(submitBtnRef.current, 
      { opacity: 0, y: -8 },
      { 
        opacity: 1, 
        y: 0, 
        clearProps: true, 
        duration: 0.3,
        onComplete: () => {
          setButtonState('default');
          // Pastikan tidak ada stale inline vars
          submitBtnRef.current.removeAttribute('style');
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (buttonState !== 'default') return;
    
    setIsSubmitting(true);

    // EmailJS configuration
    const serviceID = 'service_njv03cr';
    const templateID = 'template_jk6dacb';
    const userID = 'HOWiXGN-zDmo063ZS';

    try {
      // Animasi submit untuk form
      const formElements = formRef.current.querySelectorAll('.input-field');
      
      // Shrink animation
      gsap.to(formRef.current, {
        scale: 0.95,
        duration: 0.3,
        ease: "power2.out"
      });

      // Loading animation untuk semua input
      gsap.to(formElements, {
        y: 10,
        opacity: 0.7,
        duration: 0.3,
        stagger: 0.1
      });

      // Jalankan animasi tombol
      await animateButton();

      // Kirim email via EmailJS
      await emailjs.send(serviceID, templateID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Galvin Alfito'
      }, userID);

      // Success animation untuk form
      gsap.to(formRef.current, {
        rotationY: 360,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(formRef.current, {
        scale: 1,
        y: -20,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: () => {
          setTimeout(() => {
            setIsSubmitting(false);
            alert("🎉 Message sent successfully! I'll get back to you soon!");
            setFormData({ name: "", email: "", message: "" });
            
            // Reset form position
            gsap.to(formRef.current, {
              y: 0,
              duration: 0.3
            });

            // Reset button setelah 2 detik
            setTimeout(() => {
              resetButton();
            }, 2000);
          }, 1000);
        }
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      setButtonState('default');
      
      // Error animation
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(formRef.current, {
            x: 0,
            duration: 0.3,
            onComplete: () => {
              setIsSubmitting(false);
              alert("❌ Failed to send message. Please try again or contact me directly.");
            }
          });
        }
      });
    }
  };

  // Effect untuk 3D cursor follow
  useEffect(() => {
    if (!formRef.current) return;

    const { x, y } = mousePosition;
    
    // Extreme 3D rotation berdasarkan cursor
    gsap.to(formRef.current, {
      rotationY: x * 25,
      rotationX: -y * 20,
      x: x * 20,
      y: y * 15,
      duration: 0.5,
      ease: "power2.out"
    });

    // Floating elements ikut cursor dengan parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        x: x * (30 + index * 8),
        y: y * (25 + index * 6),
        rotation: x * (15 + index * 3),
        duration: 0.8,
        ease: "power2.out"
      });
    });

  }, [mousePosition]);

  useEffect(() => {
    // Add mouse move event listener
    if (formContainerRef.current) {
      formContainerRef.current.addEventListener('mousemove', handleMouseMove);
      formContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    const ctx = gsap.context(() => {
      // Section entrance dengan efek 3D yang lebih dramatis
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
          y: 150,
          rotationX: 15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form 3D animation yang lebih extreme
      gsap.fromTo(formRef.current,
        {
          rotationY: -45,
          rotationX: 25,
          y: 80,
          opacity: 0,
          scale: 0.8,
          z: -200
        },
        {
          rotationY: 0,
          rotationX: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          z: 0,
          duration: 2,
          delay: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Info section animation dengan 3D
      gsap.fromTo(infoRef.current,
        {
          rotationY: 30,
          x: -80,
          opacity: 0,
          scale: 0.9
        },
        {
          rotationY: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact items animation dengan efek 3D yang lebih kuat
      contactItemsRef.current.forEach((item, index) => {
        gsap.fromTo(item,
          {
            rotationY: 45,
            rotationX: 10,
            x: -50,
            opacity: 0,
            scale: 0.7
          },
          {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover effect yang lebih extreme
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            rotationY: 15,
            rotationX: 8,
            x: 15,
            y: -5,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Social links animation dengan 3D flip
      socialLinksRef.current.forEach((link, index) => {
        gsap.fromTo(link,
          {
            rotationY: -90,
            rotationX: 20,
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
            duration: 0.8,
            delay: 0.6 + (index * 0.15),
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: link,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover effect dengan flip 3D
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            rotationY: 25,
            rotationX: 10,
            y: -12,
            scale: 1.15,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Input fields animation dengan efek typewriter
      inputRefs.current.forEach((input, index) => {
        gsap.fromTo(input,
          {
            y: 40,
            opacity: 0,
            scale: 0.8,
            rotationX: 45
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            delay: 1 + (index * 0.15),
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: input,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Focus animation yang lebih dramatis
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.03,
            y: -3,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Floating elements animation yang lebih dinamis
      const floatingElements = sectionRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -25 : 25,
          rotation: index % 2 === 0 ? 20 : -20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.7
        });
      });

      // Background elements parallax yang lebih extreme
      const bgElements = sectionRef.current.querySelectorAll('.bg-element');
      bgElements.forEach((element, index) => {
        gsap.to(element, {
          x: index % 2 === 0 ? 60 : -60,
          y: index % 2 === 0 ? -60 : 60,
          rotation: index % 2 === 0 ? 180 : -180,
          duration: 30,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Particle effect
      const particles = sectionRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          rotation: `random(-360, 360)`,
          duration: `random(3, 8)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: `random(0, 2)`
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (formContainerRef.current) {
        formContainerRef.current.removeEventListener('mousemove', handleMouseMove);
        formContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 lg:px-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden min-h-screen">
      {/* Background Elements - Warna oranye */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute -top-40 -left-40 w-80 h-80 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
        <div className="bg-element absolute -bottom-40 -right-40 w-80 h-80 bg-amber-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-900 rounded-full blur-3xl opacity-10"></div>
        
        {/* Particles - Warna oranye */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-20" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Get In <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Let's create something amazing together. I'm always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8 transform-style-3d">
            <div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Let's Connect 🌟
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                I'm always interested in new opportunities, collaborations, and creative projects. 
                Whether you have a question or just want to say hello, I'll get back to you as soon as possible!
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  ref={addToContactItemsRefs}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group cursor-pointer transform-style-3d"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${info.color}`}>
                    <i className={`${info.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium">{info.label}</p>
                    <p className="text-white font-semibold">{info.value}</p>
                  </div>
                  <i className="bx bx-chevron-right text-gray-400 text-xl group-hover:text-orange-400 transition-colors"></i>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-gray-300">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    ref={addToSocialLinksRefs}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link p-4 border-2 border-gray-700 rounded-2xl transition-all duration-300 ${social.color} group relative overflow-hidden transform-style-3d`}
                  >
                    <i className={`${social.icon} text-2xl text-gray-300 group-hover:text-white transition-colors`}></i>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              {[
                { number: "Anytime", label: "Response Time" },
                { number: "100%", label: "Availability" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center transform-style-3d">
                  <div className="text-lg font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form dengan 3D Cursor Follow */}
          <div 
            ref={formContainerRef}
            className="relative cursor-pointer"
          >
            <div 
              ref={formRef}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl transform-style-3d relative overflow-hidden"
            >
              {/* Form Glow Effect - Warna oranye */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Send Message 💌</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="relative">
                  <label className="block text-gray-300 mb-3 font-medium">Your Name</label>
                  <input 
                    ref={addToInputRefs}
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-gray-600 transition-all duration-300 transform-style-3d"
                    placeholder="Enter your name"
                  />
                  <i className="bx bx-user absolute right-4 top-11 text-gray-400"></i>
                </div>

                <div className="relative">
                  <label className="block text-gray-300 mb-3 font-medium">Email Address</label>
                  <input 
                    ref={addToInputRefs}
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-gray-600 transition-all duration-300 transform-style-3d"
                    placeholder="your.email@example.com"
                  />
                  <i className="bx bx-envelope absolute right-4 top-11 text-gray-400"></i>
                </div>

                <div className="relative">
                  <label className="block text-gray-300 mb-3 font-medium">Your Message</label>
                  <textarea 
                    ref={addToInputRefs}
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input-field w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-gray-600 transition-all duration-300 resize-none transform-style-3d"
                    placeholder="Tell me about your project or just say hello..."
                  ></textarea>
                  <i className="bx bx-message-dots absolute right-4 top-11 text-gray-400"></i>
                </div>

                <button 
                  ref={submitBtnRef}
                  type="submit"
                  disabled={isSubmitting || buttonState !== 'default'}
                  className="send-button w-full text-white py-4 px-8 rounded-xl font-bold text-lg tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform-style-3d relative overflow-hidden group"
                  style={{
                    '--primary': '#275EFE',
                    '--primary-dark': '#2055EE',
                    '--primary-darkest': '#133FC0',
                    '--text': '#FFFFFF',
                    '--text-opacity': 1,
                    '--success': '#2B3044',
                    '--success-scale': 0.2,
                    '--success-opacity': 0,
                    '--border-radius': 7,
                    '--overflow': 'hidden',
                    '--rotate': 0,
                    '--plane-x': 0,
                    '--plane-y': 0,
                    '--plane-opacity': 1,
                    '--left-wing-background': 'var(--primary)',
                    '--left-wing-first-x': 0,
                    '--left-wing-first-y': 0,
                    '--left-wing-second-x': 50,
                    '--left-wing-second-y': 0,
                    '--left-wing-third-x': 0,
                    '--left-wing-third-y': 100,
                    '--left-body-background': 'var(--primary)',
                    '--left-body-first-x': 50,
                    '--left-body-first-y': 0,
                    '--left-body-second-x': 50,
                    '--left-body-second-y': 100,
                    '--left-body-third-x': 0,
                    '--left-body-third-y': 100,
                    '--right-wing-background': 'var(--primary)',
                    '--right-wing-first-x': 50,
                    '--right-wing-first-y': 0,
                    '--right-wing-second-x': 100,
                    '--right-wing-second-y': 0,
                    '--right-wing-third-x': 100,
                    '--right-wing-third-y': 100,
                    '--right-body-background': 'var(--primary)',
                    '--right-body-first-x': 50,
                    '--right-body-first-y': 0,
                    '--right-body-second-x': 50,
                    '--right-body-second-y': 100,
                    '--right-body-third-x': 100,
                    '--right-body-third-y': 100,
                  }}
                >
                  <span className="default" style={{ 
                    display: 'block',
                    position: 'relative',
                    zIndex: 4,
                    opacity: 'var(--text-opacity)'
                  }}>
                    Send Message
                    <i className="bx bx-paper-plane text-xl ml-2"></i>
                  </span>
                  <span className="success" style={{
                    zIndex: 0,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '8px',
                    transform: 'rotate(calc(var(--rotate) * -1deg)) scale(var(--success-scale)) translateZ(0)',
                    opacity: 'var(--success-opacity)',
                    color: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    Sent!
                    <i className="bx bx-check-circle text-xl"></i>
                  </span>
                  <div className="left" style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 'var(--plane-opacity)',
                    transform: 'translate(calc(var(--plane-x) * 1px), calc(var(--plane-y) * 1px)) translateZ(0)'
                  }}>
                    <div className="wing-left" style={{
                      content: '',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'calc(var(--border-radius) * 1px)',
                      transform: 'translate(0.4%, 0) translateZ(0)',
                      zIndex: 2,
                      background: 'var(--left-wing-background)',
                      clipPath: 'polygon(calc(var(--left-wing-first-x) * 1%) calc(var(--left-wing-first-y) * 1%), calc(var(--left-wing-second-x) * 1%) calc(var(--left-wing-second-y) * 1%), calc(var(--left-wing-third-x) * 1%) calc(var(--left-wing-third-y) * 1%))'
                    }}></div>
                    <div className="body-left" style={{
                      content: '',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'calc(var(--border-radius) * 1px)',
                      transform: 'translate(0, 0) translateZ(0)',
                      zIndex: 1,
                      background: 'var(--left-body-background)',
                      clipPath: 'polygon(calc(var(--left-body-first-x) * 1%) calc(var(--left-body-first-y) * 1%), calc(var(--left-body-second-x) * 1%) calc(var(--left-body-second-y) * 1%), calc(var(--left-body-third-x) * 1%) calc(var(--left-body-third-y) * 1%))'
                    }}></div>
                  </div>
                  <div className="right" style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 'var(--plane-opacity)',
                    transform: 'translate(calc(var(--plane-x) * 1px), calc(var(--plane-y) * 1px)) translateZ(0)'
                  }}>
                    <div className="wing-right" style={{
                      content: '',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'calc(var(--border-radius) * 1px)',
                      transform: 'translate(-0.4%, 0) translateZ(0)',
                      zIndex: 2,
                      background: 'var(--right-wing-background)',
                      clipPath: 'polygon(calc(var(--right-wing-first-x) * 1%) calc(var(--right-wing-first-y) * 1%), calc(var(--right-wing-second-x) * 1%) calc(var(--right-wing-second-y) * 1%), calc(var(--right-wing-third-x) * 1%) calc(var(--right-wing-third-y) * 1%))'
                    }}></div>
                    <div className="body-right" style={{
                      content: '',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'calc(var(--border-radius) * 1px)',
                      transform: 'translate(0, 0) translateZ(0)',
                      zIndex: 1,
                      background: 'var(--right-body-background)',
                      clipPath: 'polygon(calc(var(--right-body-first-x) * 1%) calc(var(--right-body-first-y) * 1%), calc(var(--right-body-second-x) * 1%) calc(var(--right-body-second-y) * 1%), calc(var(--right-body-third-x) * 1%) calc(var(--right-body-third-y) * 1%))'
                    }}></div>
                  </div>
                </button>
              </form>

              {/* Form Footer */}
              <div className="text-center mt-6 pt-6 border-t border-gray-700 relative z-10">
                <p className="text-gray-400 text-sm">
                  💫 I typically respond within a few hours
                </p>
              </div>
            </div>

            {/* Floating Elements - Warna oranye */}
            <div className="floating-element absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-message-alt text-white text-lg"></i>
            </div>

            <div className="floating-element absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-rocket text-white text-sm"></i>
            </div>

            <div className="floating-element absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
              <i className="bx bx-star text-white text-xs"></i>
            </div>

            {/* Hover Instruction */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <i className="bx bx-mouse text-yellow-400"></i>
                Move cursor for 3D effect
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        /* Enhanced 3D effects */
        .contact-item, .social-link, .input-field {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Depth effect untuk form */
        .shadow-2xl {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* Send button styles */
        .send-button {
          display: block;
          cursor: pointer;
          position: relative;
          border: 0;
          padding: 8px 0;
          min-width: 100px;
          text-align: center;
          margin: 0;
          line-height: 24px;
          font-family: inherit;
          font-weight: 500;
          font-size: 14px;
          background: none;
          outline: none;
          color: var(--text);
          transform: rotate(calc(var(--rotate) * 1deg)) translateZ(0);
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }

        .send-button .left,
        .send-button .right {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: var(--plane-opacity);
          transform: translate(calc(var(--plane-x) * 1px), calc(var(--plane-y) * 1px)) translateZ(0);
        }

        .send-button .left .wing-left,
        .send-button .left .body-left,
        .send-button .right .wing-right,
        .send-button .right .body-right {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          border-radius: calc(var(--border-radius) * 1px);
          transform: translate(var(--x, 0.4%), var(--y, 0)) translateZ(0);
          z-index: var(--z-index, 2);
          background: var(--background, var(--left-wing-background));
        }

        .send-button span {
          display: block;
          position: relative;
          z-index: 4;
          opacity: var(--text-opacity);
        }

        .send-button span.success {
          z-index: 0;
          position: absolute;
          left: 0;
          right: 0;
          top: 8px;
          transform: rotate(calc(var(--rotate) * -1deg)) scale(var(--success-scale)) translateZ(0);
          opacity: var(--success-opacity);
          color: var(--success);
        }
      `}</style>
    </section>
  );
};

export default Contact;
