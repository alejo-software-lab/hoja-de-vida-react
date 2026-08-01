import React from "react";
import {
  Mail,
  MapPin,
  MessageSquare,
  Globe,
  Code2,
  CheckCircle2,
  Phone,
} from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contacto"
      className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/55 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>Contacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Contáctame directamente a través de mi correo, teléfono o redes sociales.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Contact Info Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-center text-slate-650 dark:text-slate-400 leading-relaxed text-base max-w-2xl mx-auto">
            Estoy disponible para roles a tiempo completo, proyectos freelance y colaboraciones de código abierto. Cuéntame sobre tus metas y cómo puedo ayudarte a alcanzarlas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <a
              href="mailto:Alejandromg94@outlook.com"
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-indigo-500 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/55 text-indigo-600 dark:text-indigo-450 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Envíame un correo
                </span>
                <span className="text-sm font-bold text-slate-750 dark:text-white">
                  Alejandromg94@outlook.com
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/55 text-purple-600 dark:text-purple-450 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Ubicación
                </span>
                <span className="text-sm font-bold text-slate-750 dark:text-white">
                  Colombia (Soporte Remoto)
                </span>
              </div>
            </div>

            {/* Phone */}
            <a
              href="tel:+573507779458"
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-indigo-500 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/55 text-emerald-600 dark:text-emerald-450 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Llámame
                </span>
                <span className="text-sm font-bold text-slate-750 dark:text-white">
                  +57 350 777 9458
                </span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/573507779458"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-emerald-500 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/55 text-emerald-600 dark:text-emerald-450 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.744-6.27C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.039zm11.293-5.954c-.177-.49-.697-.987-1.207-1.142-.51-.155-3.07-.808-3.542-.9-.473-.09-1.05-.135-1.583.328-.532.463-.748 1.04-.86 1.53-.112.49-.224.49-.676.49-.45 0-1.71-.585-2.918-1.37-.99-.742-1.838-1.985-2.058-2.475-.22-.49-.022-.755.166-1.02.19-.265.42-.42.616-.66.196-.24.26-.42.39-.7.13-.28.066-.52-.033-.73-.1-.21-.89-2.157-1.22-2.953-.322-.796-.65-1.146-1.34-1.146-.49 0-1.05-.06-1.6-.06-.55 0-1.44.206-2.196.99-.755.786-2.89 2.815-2.89 6.86s2.96 7.954 3.37 8.51c.41.556 5.79 8.85 14.04 12.407 1.96.845 3.49 1.347 4.68 1.725 1.97.62 3.77.533 5.19.323 1.58-.233 4.86-1.984 5.546-3.9.685-1.917.685-3.562.48-3.9-.206-.338-1.32-.53-2.81-.93z"/>
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Escríbeme
                </span>
                <span className="text-sm font-bold text-slate-750 dark:text-white">
                  WhatsApp
                </span>
              </div>
            </a>
          </div>

          {/* Response Time Indicator Card */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-semibold leading-relaxed">
              Respuesta rápida: Normalmente respondo a correos e invitaciones de LinkedIn en menos de 24 horas laborables.
            </p>
          </div>

          {/* Social Network Links */}
          <div className="text-center pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Sígueme o búscame
            </span>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/daniel-alejandro-muñoz-godoy-8830b3395"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
                aria-label="LinkedIn"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/alejo-software-lab"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
                aria-label="GitHub"
              >
                <Code2 className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
