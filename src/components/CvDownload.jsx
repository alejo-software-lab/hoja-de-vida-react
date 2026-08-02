import React from "react";
import { FileText, Download } from "lucide-react";

const CvDownload = () => {
  return (
    <section
      id="cv"
      className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 p-10 sm:p-14 text-center shadow-2xl shadow-indigo-600/25 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="inline-flex p-4 rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Descarga mi Hoja de Vida
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8 leading-relaxed">
              Conoce mi experiencia profesional, formación y habilidades en un
              documento detallado. Disponible en formato PDF para descargar.
            </p>

            <a
              href="/hoja-de-vida-alejandro-munoz.pdf"
              download
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 font-bold shadow-lg shadow-black/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>Descargar CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CvDownload;
