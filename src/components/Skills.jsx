import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'herramientas', label: 'Herramientas' },
  ];

  const skillList = [
    // Frontend
    {
      name: 'Java',
      category: 'backend',
      level: 50,
      icon: (
        <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c2 0 3.5 1.2 3.5 3 0 .3 0 .6-.1.9 1.6.4 3 1.3 3.9 2.6.4-1 .6-2.1.6-3.3 0-5-3.8-8.2-9-8.2S1.9 0 1.9 5c0 4.8 3.6 8 8.3 8 .5 0 1 0 1.5-.1-.3-.8-.5-1.7-.5-2.6 0-3.5 2.3-5.1 5.4-4.7zM6 11.5c-2 0-3.3 1.3-3.3 3 0 1.4 1 2.6 2.7 3.3.3 1 .9 1.9 1.7 2.5-.5.3-1 .4-1.6.4-1 0-1.6-.5-1.6-1.3 0-.7.6-1.2 1.5-1.2.5 0 .9.1 1.2.4-.6-.9-1-1.9-1-3 0-2.7 2-4.1 4.6-4.1.6 0 1.1.1 1.5.3-.2-.1-.3-.2-.5-.2-1.3 0-2.2.9-2.2 2.1 0 1.9 1.4 3 3.4 3 .9 0 1.6-.2 2.2-.6-.4.9-.6 1.8-.6 2.8 0 3.3 2.1 5.5 5.4 5.5 2.3 0 4-1.2 5.1-3-1 .7-2.2 1.1-3.5 1.1-2.4 0-4.2-1.5-4.2-3.7 0-1.3.6-2.3 1.6-3.1.5.3 1.1.4 1.7.4 2.2 0 3.7-1.4 3.7-3.4 0-1.7-1.2-2.9-3-2.9-1 0-1.9.5-2.5 1.3-.4-2-2.2-3.3-4.4-3.3-1.6 0-3 .8-3.7 2 .6.2 1.1.4 1.5.7-.5.5-.8 1.1-.8 1.8 0 1.4 1 2.4 2.6 2.4.9 0 1.6-.3 2.1-.8-.2 1.1-.9 1.8-1.9 1.8-1 0-1.7-.6-1.7-1.6 0-1 .8-1.7 2-1.7.6 0 1.1.2 1.4.6.6-.9.9-2 .9-3.2 0-2.5-1.7-4.1-4.4-4.1z"/>
        </svg>
      )
    },
    {
      name: 'Spring Boot',
      category: 'backend',
      level: 58,
      icon: (
        <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3c-3 0-7 1.5-9 4-1.8 2.2-2.6 5-2.3 7.7-1.6.4-2.9 1.3-3.7 2.8C3 18.6 3.3 20.3 4.6 21.4c1.3 1.1 3.2.7 4.2-.7.6-1 1.2-2.3 1.4-3.8.7.1 1.5.1 2.3-.1 2.7.3 5.5-.5 7.3-2.6 1.8-2.1 2.6-5 2.2-7.8C20.6 5.3 20 3 19 3zM7.7 18.3c-.3.4-.9.5-1.3.2-.4-.3-.5-.9-.2-1.3.3-.4.9-.5 1.3-.2.4.3.5.9.2 1.3zm3.8-1.6c-.4.3-.9.2-1.2-.2-.3-.4-.2-.9.2-1.2.4-.3.9-.2 1.2.2.3.4.2.9-.2 1.2zm2.2-1.1c-.4.3-.9.2-1.2-.2-.3-.4-.2-.9.2-1.2.4-.3.9-.2 1.2.2.3.5.2 1-.2 1.2z" />
        </svg>
      )
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      level: 50,
      icon: (
        <svg className="w-8 h-8 text-yellow-400 rounded bg-slate-900" viewBox="0 0 448 512" fill="currentColor">
          <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 76.1-75.4 76.1-55.7 0-77.9-28-81.8-58h44.1c3.1 16.9 15.3 27.8 37.5 27.8 22.8 0 32.8-11.9 32.8-31.9 0-48.4-74.1-16.2-74.1-84.4 0-35.3 21.6-60.6 62.2-60.6 37.2 0 60 17.5 65 47h-40.9c-4.4-15-13.8-21.6-25.3-21.6-17.5 0-21.6 11.2-21.6 23.4 0 43.1 74.1 13.1 74.1 81.6zm113.7 4.1c0 38.4-20.3 62.8-57.5 62.8-38.4 0-57.8-21.6-61.9-52h42.8c3.1 13.8 12.8 21.9 23.8 21.9 13.8 0 19.4-7.5 19.4-18.4 0-30-51.2-12.5-51.2-68.4 0-31.2 19.7-53.1 50.9-53.1 31.9 0 48.4 15.9 52.8 45.3h-40.9c-2.2-11.2-8.1-16.9-15.6-16.9-10.9 0-14.7 7.2-14.7 15.6 0 25.9 49.7 9.7 49.7 63.2z"/>
        </svg>
      )
    },
    {
      name: 'HTML5 / CSS3',
      category: 'frontend',
      level: 58,
      icon: (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 6H5.2l.4 4.5H14l-.4 4.5-3.6 1.2-3.6-1.2-.2-2.3H3.9l.4 4.5 7.7 2.6 7.7-2.6 1-10.7H19l-.2-2z"/>
        </svg>
      )
    },
    {
      name: 'SQL (Bases de Datos)',
      category: 'backend',
      level: 50,
      icon: (
        <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      )
    },
    {
      name: 'Python & Pandas',
      category: 'backend',
      level: 58,
      icon: (
        <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h2.936v.827H3.708S0 5.789 0 11.969c0 6.18 3.404 5.96 3.404 5.96h2.03v-2.867s-.109-3.42 3.35-3.42c3.288 0 3.04 3.04 3.04 3.04v7.32s.062 1.557-1.79 1.557H5.65c-1.852 0-1.69-1.69-1.69-1.69l-.006-2.49H1.149s-1.149 0-1.149 1.149c0 1.149 1.149 1.149 1.149 1.149l.007.624S-1.6 24 4.86 24c6.52 0 7.1-2.59 7.1-2.59v-3.21s.207-1.79-1.79-1.79h-2.03v2.789s-.062 1.79 1.79 1.79h1.197c1.79 0 1.69-1.79 1.69-1.79V11.55s-.04-3.04-3.46-3.04c-3.42 0-3.35 3.42-3.35 3.42v2.867H7.14S4.277 14.21 4.277 11.97C4.277 9.729 6.2 9.729 6.2 9.729h5.714V6.977s.04-2.656-3.35-2.656h3.35V0h.914z"/>
        </svg>
      )
    },
    // Backend
    {
      name: 'Desarrollo Frontend (React)',
      category: 'frontend',
      level: 50,
      icon: (
        <svg className="w-8 h-8 text-cyan-400" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      name: 'Lógica de Programación',
      category: 'backend',
      level: 58,
      icon: (
        <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    // Herramientas
    {
      name: 'Git & GitHub',
      category: 'herramientas',
      level: 50,
      icon: (
        <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.3 10.9L13.1.7C12.7.3 12 .3 11.6.7L8.9 3.4l3.1 3.1c.8-.3 1.8-.1 2.5.6.7.7.9 1.7.6 2.5l3.1 3.1c.8-.3 1.8-.1 2.5.6.9.9.9 2.5 0 3.4-.9.9-2.5.9-3.4 0-.7-.7-.9-1.7-.6-2.5l-3.1-3.1c-.3.3-.6.5-1 .6v7.3c.6.3 1 .9 1 1.6 0 1.1-.9 2-2 2s-2-.9-2-2c0-.7.4-1.3 1-1.6V11.8c-.6-.3-1-.9-1-1.6 0-.5.2-1 .5-1.3L5.6 6.3 1.1 10.9c-.4.4-.4 1.1 0 1.5l10.3 10.3c.4.4 1.1.4 1.5 0l10.3-10.3c.5-.4.5-1.1.1-1.5z"/>
        </svg>
      )
    },
    {
      name: 'Visual Studio Code / IntelliJ',
      category: 'herramientas',
      level: 58,
      icon: (
        <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z"/>
        </svg>
      )
    }
  ];

  const filteredSkills = activeTab === 'todos' 
    ? skillList 
    : skillList.filter(s => s.category === activeTab);

  return (
    <section id="habilidades" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/55 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-3">
            <Cpu className="w-4 h-4" />
            <span>Mis Habilidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Stack Tecnológico & Competencias
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Herramientas y lenguajes que utilizo para dar vida a grandes ideas.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/35'
                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>

                {/* Progress and Details */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors duration-200">
                      {skill.name}
                    </h4>
                  </div>

                  {/* Progress Bar background */}
                  <div className="w-full h-7 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden relative shadow-inner ring-1 ring-slate-200/70 dark:ring-slate-800/70">
                    {/* Progress Bar Fill */}
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl transition-all duration-1000 ease-out relative"
                      style={{ width: `${skill.level}%` }}
                    >
                      <span className="absolute inset-y-0 left-2 flex items-center text-white text-xs font-bold drop-shadow">
                        {skill.level}%
                      </span>
                      <span className="absolute top-0 right-2 bottom-0 w-10 bg-white/20 blur-md animate-pulse"></span>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
