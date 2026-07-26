import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';

const CV_LINK = "/alejandro-muñozgodoy-hv.pdf";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-2 sm:py-3 shadow-lg' : 'bg-transparent py-3 sm:py-5'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#inicio" className="flex items-center gap-2 group">
              <img src="/alejoS.png" alt="Alejo Software Labs" className="h-8 w-8 sm:h-9 sm:w-9 rounded" />
              <span className="hidden sm:inline font-bold text-base sm:text-lg tracking-tight text-indigo-600 dark:text-indigo-400">Alejo Software Labs</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">{link.name}</a>
            ))}
            <a href={CV_LINK} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-105 transition-all duration-300">
              <Download className="w-4 h-4" /><span>CV</span>
            </a>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200 hover:scale-110">
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 md:hidden">
            <a href={CV_LINK} target="_blank" rel="noreferrer" className="p-1.5 sm:p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200">
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mx-3 rounded-2xl glass shadow-xl mt-2 border border-slate-200/50 dark:border-slate-800/50">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200">{link.name}</a>
            ))}
            <a href={CV_LINK} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200">
              <Download className="w-5 h-5" /><span>Descargar CV</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
