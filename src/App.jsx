import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from './components/Header';
import 'boxicons/css/boxicons.min.css';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Loading from './components/Loading';
import SplineGame from './components/SplineGame';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    navigate('/'); // Navigasi kembali ke home
  };

  return (
    <>
      {isLoading && (
        <div id="loading">
          <Loading onComplete={handleLoadingComplete} />
        </div>
      )}
      
      {!isLoading && (
        <div className="App"> 
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
                <>
                  <Hero />
                  <About />
                  <Contact />
                </>
              } 
            />
            {/* Kirim onExit prop ke SplineGame */}
            <Route 
              path="/game" 
              element={<SplineGame onExit={handleGameExit} />} 
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
