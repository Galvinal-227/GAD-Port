import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Eye, 
  EyeOff, 
  Gamepad2,
  Move,
  Camera,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  MousePointer2,
  Keyboard,
  Smartphone,
  Maximize2,
  ArrowLeft
} from 'lucide-react';
import './SplineGame.css';

const SplineGame = ({ onExit }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  const gameContainerRef = useRef(null);
  const splineContainerRef = useRef(null);
  const gameAreaRef = useRef(null);
  const scriptRef = useRef(null);
  const splineInstanceRef = useRef(null);

  // Deteksi device mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Spline viewer script dengan cleanup yang benar
  useEffect(() => {
    let mounted = true;
    
    const loadSpline = async () => {
      // Hapus script lama jika ada
      const oldScript = document.querySelector('script[src*="spline-viewer"]');
      if (oldScript) {
        document.head.removeChild(oldScript);
      }

      // Buat script baru
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.60/build/spline-viewer.js';
      scriptRef.current = script;
      
      script.onload = () => {
        if (mounted) {
          setSplineLoaded(true);
        }
      };
      
      document.head.appendChild(script);
    };

    loadSpline();

    // Cleanup function yang komprehensif
    return () => {
      mounted = false;
      
      // Hapus script
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }

      // Hancurkan semua instance Spline dengan benar
      if (splineContainerRef.current) {
        const splineViewers = splineContainerRef.current.querySelectorAll('spline-viewer');
        splineViewers.forEach(viewer => {
          try {
            // Hentikan semua animasi
            if (viewer.shadowRoot) {
              // Hentikan semua audio/video di shadow DOM
              const mediaElements = viewer.shadowRoot.querySelectorAll('audio, video');
              mediaElements.forEach(media => {
                media.pause();
                media.src = '';
                media.load();
              });

              // Hancurkan WebGL context
              const canvases = viewer.shadowRoot.querySelectorAll('canvas');
              canvases.forEach(canvas => {
                const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
                if (gl) {
                  const loseContext = gl.getExtension('WEBGL_lose_context');
                  if (loseContext) loseContext.loseContext();
                }
              });
            }
            
            // Hapus viewer dari DOM
            viewer.remove();
          } catch (e) {
            console.warn('Error cleaning up spline viewer:', e);
          }
        });
      }

      // Bersihkan semua canvas yang mungkin tertinggal
      setTimeout(() => {
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          if (canvas && canvas.parentNode && 
              !canvas.closest('.spline-game-wrapper')) {
            try {
              const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
              if (gl) {
                const loseContext = gl.getExtension('WEBGL_lose_context');
                if (loseContext) loseContext.loseContext();
              }
              canvas.remove();
            } catch (e) {
              // Abaikan error
            }
          }
        });
      }, 100);
    };
  }, []);

  // Handle keyboard controls
  const handleKeyDown = (e) => {
    if (!isGameActive) return;
    
    const key = e.key.toLowerCase();
    
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
      e.preventDefault();
    }
    
    if (key === 'escape') {
      e.preventDefault();
      handleExit();
    }
  };

  useEffect(() => {
    if (isGameActive) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameActive]);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (gameAreaRef.current.requestFullscreen) {
        gameAreaRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const startGame = () => {
    setIsGameActive(true);
    setShowControls(true);
  };

  // Exit game tanpa refresh
  const handleExit = () => {
    console.log('Exiting game...');
    
    // Nonaktifkan game
    setIsGameActive(false);
    
    // Keluar dari fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.warn);
    }
    
    // Hentikan semua media dengan paksa
    const stopAllMedia = () => {
      // Audio elements
      document.querySelectorAll('audio').forEach(audio => {
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.src = '';
          audio.load();
        } catch (e) {}
      });

      // Video elements
      document.querySelectorAll('video').forEach(video => {
        try {
          video.pause();
          video.currentTime = 0;
          video.src = '';
          video.load();
        } catch (e) {}
      });

      // Shadow DOM media
      document.querySelectorAll('spline-viewer').forEach(viewer => {
        if (viewer.shadowRoot) {
          viewer.shadowRoot.querySelectorAll('audio, video').forEach(media => {
            try {
              media.pause();
              media.src = '';
              media.load();
            } catch (e) {}
          });
        }
      });
    };

    stopAllMedia();
    
    // Reset state
    setShowControls(true);
    
    // Panggil onExit
    if (onExit) {
      setTimeout(() => {
        onExit();
      }, 50);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="spline-game-wrapper" ref={gameContainerRef}>
      <button 
        className="exit-game-btn"
        onClick={handleExit}
        title="Keluar Game (ESC)"
      >
        <ArrowLeft size={20} />
        <span className="exit-text">Kembali</span>
        <span className="exit-shortcut">ESC</span>
      </button>

      <div className="game-header">
        <div className="header-left">
          <Gamepad2 className="game-icon" size={24} />
          <h2 className="game-title">3D Mini Game Explorer</h2>
        </div>
        
        <div className="header-controls">
          <button 
            className="control-toggle-btn"
            onClick={toggleControls}
            title={showControls ? "Hide Controls" : "Show Controls"}
          >
            {showControls ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          
          <button 
            className="fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      <div className="game-area" ref={gameAreaRef}>
        {/* Spline Container dengan key unik */}
        <div 
          key={isGameActive ? 'spline-active' : 'spline-inactive'}
          ref={splineContainerRef}
          style={{ width: '100%', height: '100%' }}
        >
          {splineLoaded && (
            <spline-viewer 
              url="https://prod.spline.design/vGKXmWGYvDFjZ7z8/scene.splinecode"
              loading-animation
              className="spline-viewer"
              style={{ 
                opacity: isGameActive ? 1 : 0.5,
                pointerEvents: isGameActive ? 'auto' : 'none'
              }}
            ></spline-viewer>
          )}
        </div>

        {/* Game Overlay */}
        {!isGameActive && (
          <div className="game-overlay">
            <div className="overlay-content">
              <Gamepad2 size={48} className="overlay-icon" />
              <h3>Ready to Explore?</h3>
              <p>Jelajahi dunia 3D dengan kontrol WASD dan mouse</p>
              
              <button 
                className="start-game-btn"
                onClick={startGame}
              >
                <Play size={20} />
                <span>Start Game</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Game HUD */}
        {isGameActive && (
          <div className="game-hud">
            <div className="hud-status">
              <span className="status-dot"></span>
              <span>Game Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls Panel */}
      {showControls && isGameActive && (
        <div className={`controls-panel ${isMobile ? 'mobile' : ''}`}>
          <h4 className="panel-title">
            <Gamepad2 size={18} />
            <span>Game Controls</span>
          </h4>
          
          <div className="controls-grid">
            <div className="control-section">
              <h5 className="section-title">Keyboard</h5>
              <div className="key-bindings">
                <div className="key-group">WASD - Move</div>
                <div className="key-group">ESC - Exit</div>
              </div>
            </div>

            <div className="control-section">
              <h5 className="section-title">Mouse</h5>
              <div className="mouse-controls">
                <div>Drag - Rotate Camera</div>
                <div>Scroll - Zoom</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplineGame;
