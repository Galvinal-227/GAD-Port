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
  const gameContainerRef = useRef(null);
  const splineViewerRef = useRef(null);
  const gameAreaRef = useRef(null);
  const scriptRef = useRef(null);

  // Deteksi device mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Spline viewer script dengan cleanup yang lebih baik
  useEffect(() => {
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
    document.head.appendChild(script);

    // Cleanup function yang komprehensif
    return () => {
      console.log('Cleaning up SplineGame...');
      
      // 1. Hapus script
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }

      // 2. Hapus semua instance spline-viewer
      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach(viewer => {
        if (viewer && viewer.parentNode) {
          // Hentikan semua animasi dan audio di dalam viewer
          if (viewer.shadowRoot) {
            const videos = viewer.shadowRoot.querySelectorAll('video');
            videos.forEach(video => {
              video.pause();
              video.src = '';
              video.load();
            });
            
            const audios = viewer.shadowRoot.querySelectorAll('audio');
            audios.forEach(audio => {
              audio.pause();
              audio.src = '';
              audio.load();
            });
          }
          
          viewer.remove(); // Hapus dari DOM
        }
      });

      // 3. Hapus semua canvas yang mungkin dibuat oleh Spline
      const canvases = document.querySelectorAll('canvas');
      canvases.forEach(canvas => {
        if (canvas && canvas.parentNode && 
            !canvas.closest('.spline-game-wrapper')) {
          // Hanya hapus canvas yang bukan bagian dari komponen lain
          const context = canvas.getContext('webgl') || canvas.getContext('2d');
          if (context) {
            // Bersihkan context
            const gl = context;
            if (gl && gl.getExtension) {
              const loseContext = gl.getExtension('WEBGL_lose_context');
              if (loseContext) loseContext.loseContext();
            }
          }
          canvas.remove();
        }
      });

      // 4. Hentikan semua audio di document
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
      });

      // 5. Hentikan semua video
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.src = '';
        video.load();
      });

      // 6. Bersihkan event listeners
      window.removeEventListener('keydown', handleKeyDown);
      
      console.log('SplineGame cleanup complete');
    };
  }, []); // Empty dependency array

  // Handle keyboard controls
  const handleKeyDown = (e) => {
    if (!isGameActive) return;
    
    const key = e.key.toLowerCase();
    
    // WASD controls untuk movement
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key) || 
        key.includes('arrow')) {
      e.preventDefault();
      
      // Visual feedback
      if (gameContainerRef.current) {
        gameContainerRef.current.classList.add(`key-${key}`);
        setTimeout(() => {
          gameContainerRef.current.classList.remove(`key-${key}`);
        }, 100);
      }
    }
    
    // Escape untuk keluar game
    if (key === 'escape') {
      console.log('ESC pressed, exiting game...');
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

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Start game
  const startGame = () => {
    setIsGameActive(true);
    setShowControls(true);
  };

  // Exit game dengan force refresh
  const handleExit = () => {
    console.log('handleExit called');
    
    // 1. Nonaktifkan game
    setIsGameActive(false);
    
    // 2. Keluar dari fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch(err => {
          console.error('Error exiting fullscreen:', err);
        });
    }
    
    // 3. Hentikan semua suara dengan paksa
    const stopAllAudio = () => {
      // Hentikan audio di document
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
      });

      // Hentikan video
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.src = '';
        video.load();
      });

      // Hentikan audio di shadow DOM spline-viewer
      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          const audios = viewer.shadowRoot.querySelectorAll('audio');
          audios.forEach(audio => {
            audio.pause();
            audio.src = '';
            audio.load();
          });
        }
      });
    };

    stopAllAudio();
    
    // 4. Reset show controls
    setShowControls(true);
    
    // 5. Force refresh dengan mengganti URL (opsional)
    // Ini akan memaksa React untuk me-render ulang komponen
    window.location.hash = '#game-exit';
    
    // 6. Panggil onExit untuk kembali ke home
    if (onExit) {
      console.log('Calling onExit to return to home...');
      // Beri sedikit delay untuk memastikan cleanup selesai
      setTimeout(() => {
        onExit();
        
        // 7. Force refresh halaman home (opsional - uncomment jika masih ada suara)
        // window.location.reload();
      }, 100);
    }
  };

  // Toggle controls info
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  // Handle mobile control clicks
  const handleMobileControl = (action, value) => {
    console.log(`Mobile control: ${action} - ${value}`);
    
    // Integrasi dengan Spline events
    if (splineViewerRef.current) {
      const spline = splineViewerRef.current.querySelector('spline-viewer');
      if (spline) {
        // Dispatch custom event ke spline
        const event = new CustomEvent('mobile-control', { 
          detail: { action, value } 
        });
        spline.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="spline-game-wrapper" ref={gameContainerRef}>
      {/* Exit Button */}
      <button 
        className="exit-game-btn"
        onClick={handleExit}
        title="Keluar Game (ESC)"
      >
        <ArrowLeft size={20} />
        <span className="exit-text">Kembali</span>
        <span className="exit-shortcut">ESC</span>
      </button>

      {/* Game Header */}
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
            <span className="btn-text">
              {showControls ? "Hide" : "Show"} Controls
            </span>
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

      {/* Game Area */}
      <div className="game-area" ref={gameAreaRef}>
        {/* Spline Viewer */}
        <div ref={splineViewerRef}>
          <spline-viewer 
            url="https://prod.spline.design/vGKXmWGYvDFjZ7z8/scene.splinecode"
            loading-animation
            className="spline-viewer"
          ></spline-viewer>
        </div>

        {/* Game Overlay */}
        {!isGameActive && (
          <div className="game-overlay">
            <div className="overlay-content">
              <Gamepad2 size={48} className="overlay-icon" />
              <h3>Ready to Explore?</h3>
              <p>Jelajahi dunia 3D dengan kontrol WASD dan mouse</p>
              
              <div className="preview-controls">
                <div className="preview-item">
                  <Keyboard size={16} />
                  <span>WASD to move</span>
                </div>
                <div className="preview-item">
                  <MousePointer2 size={16} />
                  <span>Mouse to look</span>
                </div>
                {isMobile && (
                  <div className="preview-item">
                    <Smartphone size={16} />
                    <span>Touch controls</span>
                  </div>
                )}
              </div>
              
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

        {/* Mobile Controls */}
        {isMobile && isGameActive && (
          <div className="mobile-controls-panel">
            {/* Movement Pad */}
            <div className="control-pad movement-pad">
              <div className="pad-label">
                <Move size={16} />
                <span>Move</span>
              </div>
              <div className="movement-grid">
                <div className="movement-row">
                  <button 
                    className="movement-btn w-btn"
                    onTouchStart={() => handleMobileControl('move', 'forward')}
                    onTouchEnd={() => handleMobileControl('move', 'stop')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('move', 'forward');
                    }}
                    onMouseUp={() => handleMobileControl('move', 'stop')}
                    onMouseLeave={() => handleMobileControl('move', 'stop')}
                  >
                    <ChevronUp size={24} />
                    <span className="key-label">W</span>
                  </button>
                </div>
                <div className="movement-row">
                  <button 
                    className="movement-btn a-btn"
                    onTouchStart={() => handleMobileControl('move', 'left')}
                    onTouchEnd={() => handleMobileControl('move', 'stop')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('move', 'left');
                    }}
                    onMouseUp={() => handleMobileControl('move', 'stop')}
                    onMouseLeave={() => handleMobileControl('move', 'stop')}
                  >
                    <ChevronLeft size={24} />
                    <span className="key-label">A</span>
                  </button>
                  <button 
                    className="movement-btn s-btn"
                    onTouchStart={() => handleMobileControl('move', 'backward')}
                    onTouchEnd={() => handleMobileControl('move', 'stop')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('move', 'backward');
                    }}
                    onMouseUp={() => handleMobileControl('move', 'stop')}
                    onMouseLeave={() => handleMobileControl('move', 'stop')}
                  >
                    <ChevronDown size={24} />
                    <span className="key-label">S</span>
                  </button>
                  <button 
                    className="movement-btn d-btn"
                    onTouchStart={() => handleMobileControl('move', 'right')}
                    onTouchEnd={() => handleMobileControl('move', 'stop')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('move', 'right');
                    }}
                    onMouseUp={() => handleMobileControl('move', 'stop')}
                    onMouseLeave={() => handleMobileControl('move', 'stop')}
                  >
                    <ChevronRight size={24} />
                    <span className="key-label">D</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Camera Pad */}
            <div className="control-pad camera-pad">
              <div className="pad-label">
                <Camera size={16} />
                <span>Camera</span>
              </div>
              <div className="camera-grid">
                <button 
                  className="camera-btn cam-up"
                  onTouchStart={() => handleMobileControl('camera', 'up')}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMobileControl('camera', 'up');
                  }}
                >
                  <ChevronUp size={20} />
                </button>
                <div className="camera-row">
                  <button 
                    className="camera-btn cam-left"
                    onTouchStart={() => handleMobileControl('camera', 'left')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('camera', 'left');
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="camera-btn cam-center"
                    onTouchStart={() => handleMobileControl('camera', 'center')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('camera', 'center');
                    }}
                  >
                    <Circle size={16} />
                  </button>
                  <button 
                    className="camera-btn cam-right"
                    onTouchStart={() => handleMobileControl('camera', 'right')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMobileControl('camera', 'right');
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <button 
                  className="camera-btn cam-down"
                  onTouchStart={() => handleMobileControl('camera', 'down')}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMobileControl('camera', 'down');
                  }}
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls Info Panel */}
      {showControls && isGameActive && (
        <div className={`controls-panel ${isMobile ? 'mobile' : ''}`}>
          <h4 className="panel-title">
            <Gamepad2 size={18} />
            <span>Game Controls</span>
          </h4>
          
          <div className="controls-grid">
            {/* Keyboard Controls */}
            <div className="control-section">
              <h5 className="section-title">
                <Keyboard size={16} />
                <span>Keyboard</span>
              </h5>
              <div className="key-bindings">
                <div className="key-row">
                  <div className="key-group">
                    <kbd className="key">W</kbd>
                    <span className="key-desc">Move Forward</span>
                  </div>
                  <div className="key-group">
                    <kbd className="key">S</kbd>
                    <span className="key-desc">Move Backward</span>
                  </div>
                </div>
                <div className="key-row">
                  <div className="key-group">
                    <kbd className="key">A</kbd>
                    <span className="key-desc">Move Left</span>
                  </div>
                  <div className="key-group">
                    <kbd className="key">D</kbd>
                    <span className="key-desc">Move Right</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mouse Controls */}
            <div className="control-section">
              <h5 className="section-title">
                <MousePointer2 size={16} />
                <span>Mouse</span>
              </h5>
              <div className="mouse-controls">
                <div className="mouse-row">
                  <span className="mouse-action">Drag</span>
                  <span className="mouse-desc">Rotate Camera</span>
                </div>
                <div className="mouse-row">
                  <span className="mouse-action">Scroll</span>
                  <span className="mouse-desc">Zoom In/Out</span>
                </div>
              </div>
            </div>

            {/* Arrow Keys */}
            <div className="control-section">
              <h5 className="section-title">
                <Move size={16} />
                <span>Arrow Keys</span>
              </h5>
              <div className="arrow-keys">
                <div className="arrow-row">
                  <kbd className="arrow-key">↑</kbd>
                </div>
                <div className="arrow-row">
                  <kbd className="arrow-key">←</kbd>
                  <kbd className="arrow-key">↓</kbd>
                  <kbd className="arrow-key">→</kbd>
                </div>
                <span className="arrow-desc">Alternate movement</span>
              </div>
            </div>
          </div>

          {/* Mobile Note */}
          {isMobile && (
            <div className="mobile-note">
              <Smartphone size={14} />
              <span>Touch controls available on screen</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SplineGame;
