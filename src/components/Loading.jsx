import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Loading = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const percentageRef = useRef(null);
  const audioRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    // Inisialisasi audio
    audioRef.current = new Audio('/Backsound Loading.mp3'); 
    audioRef.current.loop = false;
    audioRef.current.volume = 0.5; // Set volume 50%

    // Load audio
    audioRef.current.load();

    // Event listener untuk user interaction (karena browser biasanya memblock autoplay)
    const handleUserInteraction = () => {
      if (audioRef.current && !audioReady) {
        audioRef.current.play()
          .then(() => {
            setAudioReady(true);
            console.log('Audio started playing');
          })
          .catch(error => {
            console.log('Audio autoplay failed:', error);
          });
      }
    };

    // Tambahkan event listeners untuk user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      // Cleanup audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 15);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    // Lighting setup - dimulai dari gelap
    const ambientLight = new THREE.AmbientLight(0x404060, 0);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.PointLight(0xffeedd, 0);
    keyLight.position.set(5, 5, 10);
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.PointLight(0x446688, 0);
    fillLight.position.set(-5, 0, 8);
    scene.add(fillLight);

    // Back light for rim effect
    const backLight = new THREE.PointLight(0xffffff, 0);
    backLight.position.set(0, -2, -8);
    scene.add(backLight);

    // Additional lights for chrome effect
    const light1 = new THREE.PointLight(0xffaa88, 0);
    light1.position.set(3, 4, 6);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x88aaff, 0);
    light2.position.set(-4, 3, 7);
    scene.add(light2);

    // Create text with chrome material
    const loader = new THREE.FontLoader();
    
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
      const textGeometry = new THREE.TextGeometry('ALDEV', {
        font: font,
        size: 2.5,
        height: 0.5,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 12
      });
      
      textGeometry.center();
      textGeometry.computeVertexNormals();

      // Chrome material
      const chromeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x111111,
        roughness: 0.15,
        metalness: 0.95,
        emissiveIntensity: 0,
        envMapIntensity: 1.5
      });

      const textMesh = new THREE.Mesh(textGeometry, chromeMaterial);
      textMesh.position.set(0, 0.5, 0);
      scene.add(textMesh);

      // Add floating particles for sparkle effect
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        positions[i*3] = (Math.random() - 0.5) * 20;
        positions[i*3+1] = (Math.random() - 0.5) * 20;
        positions[i*3+2] = (Math.random() - 0.5) * 20;
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x88aaff,
        size: 0.05,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Animation variables
      let startTime = Date.now();
      const animationDuration = 4000; // 4 seconds
      let time = 0;
      let audioStarted = false;

      // Easing function for smooth fade
      const easeInOutCubic = (x) => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Update percentage display
        if (percentageRef.current) {
          percentageRef.current.textContent = Math.floor(progress * 100) + '%';
        }

        // Start audio when progress reaches 10% (atau bisa disesuaikan)
        if (progress > 0.1 && !audioStarted && audioRef.current) {
          audioStarted = true;
          // Coba play audio (mungkin masih perlu user interaction)
          if (audioReady) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          }
        }
        
        // Fade in lights based on progress
        const lightIntensity = easeInOutCubic(progress) * 2;
        const particleOpacity = easeInOutCubic(progress) * 0.6;
        
        // Update all light intensities
        keyLight.intensity = lightIntensity;
        fillLight.intensity = lightIntensity * 0.5;
        backLight.intensity = lightIntensity * 0.75;
        light1.intensity = lightIntensity * 0.5;
        light2.intensity = lightIntensity * 0.5;
        ambientLight.intensity = lightIntensity * 0.3;
        
        // Update particle opacity
        particleMaterial.opacity = particleOpacity;
        
        // Update chrome emissive
        if (textMesh) {
          textMesh.material.emissiveIntensity = progress * 0.2;
        }
        
        time += 0.01;

        // Rotate text slowly
        if (textMesh) {
          textMesh.rotation.y += 0.005;
          textMesh.rotation.x = Math.sin(time * 0.3) * 0.1;
          textMesh.rotation.z = Math.sin(time * 0.2) * 0.05;
        }

        // Rotate particles
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;

        // Pulsing lights for chrome effect (after fade in)
        if (progress > 0.5) {
          const pulseFactor = 1 + Math.sin(time * 3) * 0.1 * (progress - 0.5) * 2;
          keyLight.intensity = lightIntensity * pulseFactor;
          backLight.intensity = lightIntensity * 0.75 * pulseFactor;
        }

        // Camera slight movement
        camera.position.x = Math.sin(time * 0.1) * 2;
        camera.position.y = 1 + Math.sin(time * 0.2) * 0.3;
        camera.lookAt(0, 0.5, 0);
        
        renderer.render(scene, camera);

        // Call onComplete when animation finishes
        if (progress >= 1 && onComplete) {
          // Fade out audio
          if (audioRef.current) {
            const fadeOut = setInterval(() => {
              if (audioRef.current.volume > 0.1) {
                audioRef.current.volume -= 0.1;
              } else {
                audioRef.current.pause();
                clearInterval(fadeOut);
              }
            }, 100);
          }

          setTimeout(() => {
            onComplete();
          }, 500);
        }
      }

      animate();
    });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      
      // Cleanup audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete, audioReady]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Audio Controls - Optional UI untuk user mengaktifkan audio */}
      <button 
        onClick={() => {
          if (audioRef.current && !audioReady) {
            audioRef.current.play()
              .then(() => setAudioReady(true))
              .catch(e => console.log('Audio play failed:', e));
          }
        }}
        className="absolute top-5 right-5 z-50 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white px-4 py-2 rounded-full text-xs transition-all backdrop-blur-sm border border-white/10"
      >
        {audioReady ? '🔊 Audio On' : '🔈 Click to Enable Audio'}
      </button>
      
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-50 pointer-events-none w-[300px]">
        <div className="w-full h-[2px] bg-white/10 mx-auto rounded overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <div className="h-full w-0 bg-gradient-to-r from-white via-gray-400 to-white animate-progress shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
      
      <div 
        ref={percentageRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-[10px] tracking-wider z-50"
      >
        0%
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 text-[180px] font-black whitespace-nowrap tracking-[20px] uppercase z-10 pointer-events-none animate-logoReveal">
        ALDEV
      </div>
    </div>
  );
};

// Add styles
const style = document.createElement('style');
style.textContent = `
  @keyframes progress {
    0% { width: 0%; opacity: 0.3; }
    20% { width: 20%; opacity: 0.6; }
    50% { width: 60%; opacity: 0.8; }
    80% { width: 85%; opacity: 1; }
    100% { width: 100%; opacity: 1; }
  }

  @keyframes logoReveal {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    30% { opacity: 0.05; transform: translate(-50%, -50%) scale(1.2); }
    60% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.1); }
    100% { opacity: 0.03; transform: translate(-50%, -50%) scale(1); }
  }

  .animate-progress {
    animation: progress 4s ease-in-out forwards;
  }

  .animate-logoReveal {
    animation: logoReveal 4s ease-in-out forwards;
  }
`;
document.head.appendChild(style);

export default Loading;
