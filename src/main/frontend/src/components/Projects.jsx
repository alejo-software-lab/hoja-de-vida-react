import React from "react";
import { FolderGit2, ExternalLink } from "lucide-react";
import { useAnimate } from "../hooks/useAnimate";

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Projects = () => {
  const { ref, visible } = useAnimate(0.15);

  return (
    <section
      ref={ref}
      id="proyectos"
      className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/55 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-3">
            <FolderGit2 className="w-4 h-4" />
            <span>Portafolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Mis Proyectos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Explora todos mis proyectos en GitHub.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* GitHub Card */}
        <div className={`flex justify-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <a
            href="https://github.com/alejo-software-lab"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-6 p-10 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 shadow-sm hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 group max-w-md w-full"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <GithubIcon className="w-10 h-10 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors mb-2">
                alejo-software-lab
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Visita mi perfil de GitHub para ver todos mis repositorios, contribuciones y proyectos open source.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-600/40">
              <GithubIcon className="w-5 h-5" />
              <span>Ver en GitHub</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
