import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Code2, Globe, Mail, ExternalLink, Download } from "lucide-react";

const CV_LINK = "/alejandro-muñozgodoy-hv.pdf";

const Hero = () => {
  const [step, setStep] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 300),
      setTimeout(() => setStep(3), 500),
      setTimeout(() => setStep(4), 700),
      setTimeout(() => setStep(5), 900),
      setTimeout(() => setStep(6), 1100),
      setTimeout(() => setStep(7), 1300),
      setTimeout(() => setStep(8), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fade = (n, extra = '') =>
    `transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= n ? `opacity-100 translate-y-0 ${extra}` : 'opacity-0 translate-y-4'}`;

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/30 via-slate-50 to-slate-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950"
    >
      <div className="absolute top-20 left-1/10 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/10 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

            <div className={fade(1, 'delay-100')}>
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Alejo Software Labs" className="h-14 w-auto" />
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Alejo Software Labs
                </span>
              </div>
            </div>

            <div className={fade(2, 'delay-200')}>
              <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <img
                  src="/foto-alejo.jpg"
                  alt="Foto de Alejandro Muñoz"
                  className="w-full h-full object-contain scale-[1.06]"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }}
                />
                <span className="hidden w-full h-full items-center justify-center text-slate-400 text-sm font-medium">Tu foto</span>
              </div>
            </div>

            <div className={fade(3)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                <span>Disponible para nuevos proyectos</span>
              </div>
            </div>

            <div className={fade(4)}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Hola, soy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Alejandro Muñoz
                </span>
              </h1>
            </div>

            <div className={fade(5)}>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">
                Desarrollador de Software
              </h2>
            </div>

            <div className={fade(6)}>
              <p className="max-w-xl text-lg text-slate-600 dark:text-slate-450 leading-relaxed">
                Técnico en Desarrollo de software en CESDE con una base sólida en
                lógica de programación, Java, JavaScript, base de datos SQL, manejo
                intermedio de la IA como herramienta de codificación, además de
                contar con habilidades blandas como el trabajo en equipo, el
                pensamiento crítico y la resolución de problemas a través de
                soluciones efectivas.
              </p>
            </div>

            <div className={fade(7)}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#proyectos" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 transition-all duration-300 group">
                  <span>Ver Mis Proyectos</span>
                  <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={CV_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:scale-105 transition-all duration-300 group">
                  <Download className="w-5 h-5 mr-2" />
                  <span>Descargar CV</span>
                </a>
                <a href="#contacto" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:scale-105 transition-all duration-300">
                  Contáctame
                </a>
              </div>
            </div>

            <div className={fade(8)}>
              <div className="flex items-center gap-4 pt-4">
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
          </div>

          {/* Terminal */}
          <div className={`lg:col-span-5 relative w-full flex justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-full max-w-lg bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed text-slate-350 hover:shadow-indigo-500/20 hover:border-slate-700 transition-all duration-500">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-850 border-b border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 hover:scale-150 transition-transform cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500 hover:scale-150 transition-transform cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 hover:scale-150 transition-transform cursor-pointer"></div>
                </div>
                <div className="text-xs text-slate-500">developer.json — alejandro-munoz</div>
                <div className="w-10"></div>
              </div>
              <div className="p-6 space-y-4 text-slate-300 select-all">
                <div><span className="text-pink-400">const</span> <span className="text-sky-400">programador</span> = {"{"}</div>
                <div className="pl-6"><span className="text-slate-400">nombre:</span> <span className="text-emerald-300">"Alejandro Muñoz Godoy"</span>,</div>
                <div className="pl-6"><span className="text-slate-400">rol:</span> <span className="text-emerald-300">"Desarrollador de Software"</span>,</div>
                <div className="pl-6"><span className="text-slate-400">tecnologiasFavoritas:</span> <span className="text-cyan-400">['Java', 'Spring Boot', 'JavaScript', 'SQL', 'React']</span>,</div>
                <div className="pl-6"><span className="text-slate-400">enfoque:</span> <span className="text-emerald-300">"Logica de negocio y codigo limpio"</span>,</div>
                <div className="pl-6"><span className="text-slate-400">activo:</span> <span className="text-amber-400">true</span>,</div>
                <div className="pl-6"><span className="text-slate-400">disponibilidad:</span> <span className="text-amber-400">"Inmediata"</span></div>
                <div>{"};"}</div>
                <div className="pt-4 border-t border-slate-800 text-slate-500 text-xs flex items-center justify-between">
                  <span>// Comando ejecutado: npm start</span>
                  <span className="text-emerald-400">✔ Ready in 400ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-slate-450 text-sm animate-pulse">
          <span className="text-xs font-semibold tracking-widest uppercase opacity-70">Desplazar</span>
          <ArrowDown className="w-4 h-4 text-indigo-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
