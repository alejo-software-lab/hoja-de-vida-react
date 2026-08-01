import React from 'react';
import { User, Award, CheckCircle, Code2, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Award className="w-6 h-6 text-indigo-500" />, count: 'CESDE', label: 'Formación Técnica' },
    { icon: <CheckCircle className="w-6 h-6 text-purple-500" />, count: 'Platzi', label: 'Cursos Especializados' },
    { icon: <Globe className="w-6 h-6 text-pink-500" />, count: 'Spring Boot', label: 'Backend con Java' },
  ];

  return (
    <section id="sobre-mi" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center gap-2 mb-3">
            <img
              src="/logo.png"
              alt="Alejo Software Labs"
              className="h-24 w-auto"
            />
            <span className="text-xl font-bold text-slate-700 dark:text-slate-300">
              Alejo Software Labs
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/55 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-3">
            <User className="w-4 h-4" />
            <span>Quién Soy</span>
          </div>
           <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Un poco sobre mí
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left - Professional Profile & Stats */}
          <div className="lg:col-span-6 space-y-6">
             <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Transformo requerimientos en aplicaciones funcionales y base de datos confiables
            </h3>
            
             <p className="text-slate-650 dark:text-slate-350 text-base leading-relaxed">
              Soy una persona proactiva, curiosa y con sed de aprender. Tengo
              facilidad para investigar, adaptarme rápido y aportar ideas que
              sumen a mi equipo. Me considero responsable, ambicioso y con
              excelente comunicación. Mi objetivo es crecer profesionalmente
              mientras aporto valor, siendo parte de un equipo donde pueda
              explotar al máximo mis habilidades y seguir llenándome de nuevas
              experiencias.
            </p>

            {/* Interests */}
            <div className="pt-2">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">Intereses</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-sm font-medium">Literatura (ficción, motivación)</span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-sm font-medium">Deportes (gym, natación)</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 text-center hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{stat.count}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Interactive Card Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm card-hover">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6" />
              </div>
               <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Desarrollo Frontend</h4>
               <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                 Maquetación y desarrollo de interfaces con HTML, CSS y JavaScript, así como consumo de APIs desde el frontend.
               </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm card-hover">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
               <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Backend con Java & Spring Boot</h4>
               <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                 Desarrollo de lógica de negocio y aplicaciones con Java usando Spring Boot para construir APIs y servicios backend.
               </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-50/50 to-white dark:from-pink-950/20 dark:to-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm card-hover">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
               <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Bases de Datos SQL</h4>
               <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                 Diseño, consulta y gestión de información relacional con SQL y buenas prácticas de modelado de datos.
               </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm card-hover">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
               <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Trabajo en Equipo</h4>
               <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                 Comunicación efectiva, resolución de problemas y adaptabilidad en entornos de desarrollo colaborativo.
               </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
