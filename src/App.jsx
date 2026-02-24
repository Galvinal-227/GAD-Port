import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from './components/Header';
import 'boxicons/css/boxicons.min.css';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Loading from './components/Loading';
import SplineGame from './components/SplineGame';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameKey, setGameKey] = useState(0); // Untuk force remount
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      const loadingElement = document.getElementById('loading');
      if (loadingElement) {
        loadingElement.remove();
      }
    }, 1000);
  };

  // Fungsi untuk handle exit dari game
  const handleGameExit = () => {
    console.log('Game exited, navigating to home...');
    
    // 1. Hentikan semua audio yang mungkin masih jalan
    const stopAllAudio = () => {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
      });

      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.src = '';
        video.load();
      });
    };
    
    stopAllAudio();
    
    // 2. Navigasi ke home
    navigate('/');
    
    // 3. OPSI 1: Refresh paksa halaman (paling ampuh)
    // Uncomment baris di bawah ini jika suara masih muncul
    // window.location.reload();
    
    // 4. OPSI 2: Update key untuk force remount komponen
    setGameKey(prevKey => prevKey + 1);
  };

  // Effect untuk cleanup saat pindah halaman
  React.useEffect(() => {
    // Cleanup saat komponen unmount atau route berubah
    return () => {
      console.log('App cleanup - stopping all media');
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
      });
    };
  }, [location.pathname]); // Trigger ketika path berubah

  return (
    <>
      {isLoading && (
        <div id="loading">
          <Loading onComplete={handleLoadingComplete} />
        </div>
      )}
      
      {!isLoading && (
        <div className="App" key={location.pathname}> {/* Key berdasarkan path */}
          <img 
            className="absolute top-0 right-0 opacity-60 -z-10" 
            src="/gradient.png" 
            alt="Gradient-img" 
          /> 
 
          <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10"></div> 
          
          <Header />
          <Routes>
            <Route 
              path="/" 
              element={
                <React.Fragment key="home">
                  <Hero />
                  <About />
                  <Contact />
                </React.Fragment>
              } 
            />
            {/* Gunakan key untuk force remount game component */}
            <Route 
              path="/game" 
              element={
                <SplineGame 
                  key={`game-${gameKey}`} // Key berubah setiap exit
                  onExit={handleGameExit}
                />
              } 
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
