import React from "react";
import {
  FolderGit2,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import GitHubIcon from "./GitHubIcon";

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
            Mis Proyectos en GitHub
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Puedes ver todos mis repositorios, código fuente y avances en mi
            perfil de GitHub.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* GitHub Access Card */}
        <div className="max-w-3xl mx-auto">
          <a
            href="https://github.com/alejo-software-lab"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white group-hover:scale-110 transition-transform duration-300">
                <GitHubIcon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-850 dark:text-white">
                  GitHub · alejo-software-lab
                </h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm mt-1">
                  Repositorios, proyectos de práctica y código abierto.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-300">
              Ver GitHub
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        {/* Contact Routes */}
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-center text-lg font-bold text-slate-700 dark:text-slate-300 mb-6">
            ¿Quieres contactarme?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:Alejandromg94@outlook.com"
              className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Correo
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                  Alejandromg94@outlook.com
                </p>
              </div>
            </a>

            <a
              href="tel:+573507779458"
              className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Teléfono
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  +57 350 777 9458
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/573507779458"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  WhatsApp
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  +57 350 777 9458
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/daniel-alejandro-muñoz-godoy-8830b3395"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                <Globe className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  LinkedIn
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                  Daniel Alejandro Muñoz Godoy
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
