import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useAnimate } from '../hooks/useAnimate';

const Experience = () => {
  const { ref, visible } = useAnimate(0.1);

  const experiences = [
    {
      role: 'Analítica de Datos e Inteligencia Artificial',
      company: 'CESDE',
      period: 'Curso Técnico',
      location: 'Colombia',
      description: [
        'Curso en Analítica de Datos e Inteligencia Artificial para la Productividad y la Toma de Decisiones.',
        'Formación en fundamentos de programación, bases de datos y desarrollo de aplicaciones.',
        'Desarrollo de habilidades en trabajo en equipo y resolución de problemas.',
      ],
      skills: ['Java', 'JavaScript', 'Bases de Datos', 'Analítica de Datos']
    },
    {
      role: 'Cursos Especializados en Desarrollo',
      company: 'Platzi',
      period: 'Certificaciones',
      location: 'Online',
      description: [
        'Curso Práctico de Frontend Developer y Curso de Frontend Developer.',
        'Curso de Bases de Datos con SQL y Curso de Fundamentos de JavaScript.',
        'Curso de Java SE: SQL y Bases de Datos.',
      ],
      skills: ['JavaScript', 'Frontend', 'SQL', 'Java SE']
    },
    {
      role: 'Competencias Interpersonales',
      company: 'Perfil Personal',
      period: 'Soft Skills',
      location: '—',
      description: [
        'Trabajo en equipo y colaboración en entornos de desarrollo.',
        'Resolución de problemas con pensamiento lógico.',
        'Capacidad de aprendizaje continuo y adaptabilidad.',
      ],
      skills: ['Trabajo en Equipo', 'Resolución de Problemas', 'Adaptabilidad']
    }
  ];

  return (
    <section ref={ref} id="experiencia" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/55 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Formación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Educación & Habilidades
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Mi formación académica, cursos especializados y competencias profesionales.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900/50 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-8 md:pl-12 group transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: `${200 + index * 200}ms` }}
            >

              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-indigo-500 dark:border-indigo-400 group-hover:scale-150 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-all duration-300 z-10"></div>

              {/* Left-side date (visible on wider screens) */}
              <div className="hidden md:block absolute -left-32 top-1.5 w-24 text-right">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-450">{exp.period}</span>
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-indigo-300 dark:hover:border-indigo-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {exp.role}
                    </h3>
                    <h4 className="text-md font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      {exp.company}
                    </h4>
                  </div>

                  {/* Meta tags */}
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1 sm:pt-0">
                    <span className="md:hidden flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Accomplishments */}
                <ul className="space-y-2 mb-6 text-slate-650 dark:text-slate-350 text-sm leading-relaxed list-disc list-inside">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="pl-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <span className="dark:text-slate-300">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/40 text-indigo-650 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
