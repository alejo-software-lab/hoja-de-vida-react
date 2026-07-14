import React from "react";
import { ArrowUp, Code2, Globe, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/50 dark:border-slate-900/50">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Alejandro Muñoz"
              className="h-8 w-auto"
            />
          </div>

          {/* Quick Navigation Footer */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <a
              href="#inicio"
              className="hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#sobre-mi"
              className="hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors"
            >
              Sobre Mí
            </a>
            <a
              href="#habilidades"
              className="hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors"
            >
              Habilidades
            </a>
            <a
              href="#experiencia"
              className="hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors"
            >
              Experiencia
            </a>
            <a
              href="#proyectos"
              className="hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors"
            >
              Proyectos
            </a>
            <a
              href="#contacto"
              className="hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 dark:text-slate-555 hover:text-slate-750 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-alejandro-muñoz-godoy-8830b3395"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 dark:text-slate-555 hover:text-slate-750 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="mailto:Alejandromg94@outlook.com"
              className="text-slate-400 dark:text-slate-555 hover:text-slate-750 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright and back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} DevPortfolio. Todos los derechos
            reservados. Creado con React y Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/45 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-all shadow-sm hover:shadow-md"
            aria-label="Volver arriba"
          >
            <span>Subir</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
