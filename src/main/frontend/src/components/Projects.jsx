import React from "react";
import { FolderGit2, Github } from "lucide-react";

const Projects = () => {
  return (
    <section
      id="proyectos"
      className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        <div className="flex justify-center">
          <a
            href="https://github.com/alejo-software-lab"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-6 p-10 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group max-w-md w-full"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-all duration-300">
              <Github className="w-10 h-10 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors mb-2">
                alejo-software-lab
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Visita mi perfil de GitHub para ver todos mis repositorios, contribuciones y proyectos open source.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-300">
              <Github className="w-5 h-5" />
              <span>Ver en GitHub</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
