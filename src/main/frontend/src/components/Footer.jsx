import React from "react";
import { ArrowUp, Code2, Globe, Mail, Download } from "lucide-react";
import { ScrollReveal } from "../hooks/useAnimate";

const CV_LINK = "/alejandro-muñozgodoy-hv.pdf";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/50 dark:border-slate-900/50">
            <div className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Alejo Software Labs" className="h-8 w-auto group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">Alejo Software Labs</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
              {["inicio", "sobre-mi", "habilidades", "experiencia", "proyectos", "contacto"].map((id) => (
                <a key={id} href={`#${id}`} className="hover:text-indigo-600 dark:hover:text-indigo-450 hover:underline underline-offset-4 hover:translate-y-[-2px] transition-all duration-300 capitalize">{id.replace('-', ' ')}</a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/alejo-software-lab" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-555 hover:text-slate-750 dark:hover:text-white hover:scale-110 transition-all duration-300"><Code2 className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/daniel-alejandro-muñoz-godoy-8830b3395" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-555 hover:text-slate-750 dark:hover:text-white hover:scale-110 transition-all duration-300"><Globe className="w-5 h-5" /></a>
              <a href="mailto:alejosoftwarelabs@gmail.com" className="text-slate-400 dark:text-slate-555 hover:text-slate-750 dark:hover:text-white hover:scale-110 transition-all duration-300"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} DevPortfolio. Todos los derechos reservados.</p>
            <div className="flex items-center gap-3">
              <a href={CV_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 font-semibold hover:scale-110 transition-all duration-300">
                <Download className="w-4 h-4" /><span>Descargar CV</span>
              </a>
              <button onClick={scrollToTop} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/45 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold hover:scale-110 hover:shadow-md transition-all duration-300 shadow-sm">
                <span>Subir</span><ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
