import React, { useState, useEffect } from "react";
import { ArrowDown, Code2, Globe, Mail, ExternalLink, Download } from "lucide-react";

const CV_LINK = "/alejandro-muñozgodoy-hv.pdf";

const Hero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/30 via-slate-50 to-slate-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950"
    >
      <div className="hidden sm:block absolute top-20 left-1/10 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl"></div>
      <div className="hidden sm:block absolute bottom-20 right-1/10 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/15 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className={`lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 transition-all duration-700 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}>

            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              <img
                src="/foto-alejo.jpg"
                alt="Foto de Alejandro Muñoz"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Hola, soy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Alejandro Muñoz
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300">
              Desarrollador de Software
            </h2>

            <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Técnico en Desarrollo de software en CESDE con una base sólida en
              lógica de programación, Java, JavaScript, base de datos SQL, manejo
              intermedio de la IA como herramienta de codificación, además de
              contar con habilidades blandas como el trabajo en equipo, el
              pensamiento crítico y la resolución de problemas a través de
              soluciones efectivas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2">
              <a href="#proyectos" className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 transition-all duration-300 group">
                <span>Ver Mis Proyectos</span>
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={CV_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:scale-105 transition-all duration-300">
                <Download className="w-5 h-5 mr-2" />
                <span>Descargar CV</span>
              </a>
              <a href="#contacto" className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:scale-105 transition-all duration-300">
                Contáctame
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a href="https://github.com/alejo-software-lab" target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-indigo-500 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Code2 className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/daniel-alejandro-muñoz-godoy-8830b3395" target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-indigo-500 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Globe className="w-6 h-6" />
              </a>
              <a href="mailto:alejosoftwarelabs@gmail.com" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-indigo-500 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className={`lg:col-span-5 relative w-full flex justify-center transition-all duration-700 ease-out delay-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full max-w-lg bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm leading-relaxed text-slate-350">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-850 border-b border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-xs text-slate-500">developer.json</div>
                <div className="w-10"></div>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 text-slate-300 select-all">
                <div><span className="text-pink-400">const</span> <span className="text-sky-400">programador</span> = {"{"}</div>
                <div className="pl-4 sm:pl-6"><span className="text-slate-400">nombre:</span> <span className="text-emerald-300">"Alejandro Muñoz Godoy"</span>,</div>
                <div className="pl-4 sm:pl-6"><span className="text-slate-400">rol:</span> <span className="text-emerald-300">"Desarrollador de Software"</span>,</div>
                <div className="pl-4 sm:pl-6"><span className="text-slate-400">tecnologias:</span> <span className="text-cyan-400">['Java', 'Spring Boot', 'JS', 'SQL', 'React']</span>,</div>
                <div className="pl-4 sm:pl-6"><span className="text-slate-400">enfoque:</span> <span className="text-emerald-300">"Logica y codigo limpio"</span>,</div>
                <div className="pl-4 sm:pl-6"><span className="text-slate-400">activo:</span> <span className="text-amber-400">true</span>,</div>
                <div className="pl-4 sm:pl-6"><span className="text-slate-400">disponibilidad:</span> <span className="text-amber-400">"Inmediata"</span></div>
                <div>{"};"}</div>
                <div className="pt-4 border-t border-slate-800 text-slate-500 text-xs flex items-center justify-between">
                  <span>// npm start</span>
                  <span className="text-emerald-400">✔ Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-slate-450 text-sm">
          <span className="text-xs font-semibold tracking-widest uppercase opacity-70">Desplazar</span>
          <ArrowDown className="w-4 h-4 text-indigo-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
