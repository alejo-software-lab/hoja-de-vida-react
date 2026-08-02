import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import CvDownload from './components/CvDownload';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const hideLoader = () => {
      const loader = document.getElementById('app-loader');
      if (loader) {
        setTimeout(() => loader.classList.add('app-loader--hidden'), 800);
        setTimeout(() => loader.remove(), 2500);
      }
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader, { once: true });
    }
    const fallback = setTimeout(hideLoader, 5000);
    return () => {
      window.removeEventListener('load', hideLoader);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <CvDownload />
        <Projects />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
