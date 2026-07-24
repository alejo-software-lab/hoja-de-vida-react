import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  Code2,
  CheckCircle2,
  Phone,
} from "lucide-react";

const EMAILJS_SERVICE_ID = "service_apeyqkc";
const EMAILJS_PUBLIC_KEY = "32cHoh6lAn6OMgNP7";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "El nombre es requerido.";
    if (!formData.email.trim()) {
      tempErrors.email = "El correo es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "El correo no es válido.";
    }
    if (!formData.subject.trim())
      tempErrors.subject = "El asunto es requerido.";
    if (!formData.message.trim())
      tempErrors.message = "El mensaje es requerido.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    let savedToDb = false;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      savedToDb = true;
    } catch {
      // Continue even if DB save fails
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        "template_portafolio",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      if (savedToDb) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrors({ message: "No se pudo enviar el mensaje. Intenta de nuevo." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Completa el formulario o contáctame a través de mis redes sociales.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left - Contact Details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-850 dark:text-white">
                Información de contacto
              </h3>
              <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-sm">
                Estoy disponible para roles a tiempo completo, proyectos
                freelance y colaboraciones de código abierto. Cuéntame sobre tus
                metas y cómo puedo ayudarte a alcanzarlas.
              </p>

              <div className="space-y-4">
                {/* Email Address */}
                <a
                  href="mailto:alejosoftwarelabs@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-indigo-500 hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/55 text-indigo-600 dark:text-indigo-450 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Envíame un correo
                    </span>
                    <span className="text-sm font-bold text-slate-750 dark:text-white">
                      alejosoftwarelabs@gmail.com
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850">
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
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-indigo-500 hover:scale-[1.01] transition-all duration-300 group"
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
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-emerald-500 hover:scale-[1.01] transition-all duration-300 group"
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

                {/* Response Time Indicator Card */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold leading-relaxed">
                    Respuesta rápida: Normalmente respondo a correos e
                    invitaciones de LinkedIn en menos de 24 horas laborables.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
                Sígueme o búscame
              </span>
              <div className="flex gap-4">
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
                  href="https://github.com"
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

          {/* Right - Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 shadow-sm relative">
              {/* Form success feedback banner */}
              {submitSuccess && (
                <div className="absolute inset-0 bg-white dark:bg-slate-950 rounded-3xl z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in border border-emerald-500/20">
                  <div className="w-16 h-16 rounded-full bg-emerald-150 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-850 dark:text-white mb-2">
                    ¡Mensaje enviado con éxito!
                  </h4>
                  <p className="text-slate-550 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
                    Muchas gracias por escribirme. He recibido tus detalles y me
                    pondré en contacto contigo a la brevedad.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Juan Pérez"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                        errors.name
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-rose-500 text-xs font-semibold">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ej. juan@correo.com"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                        errors.email
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-rose-500 text-xs font-semibold">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ej. Oferta de empleo / Proyecto freelance"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                      errors.subject
                        ? "border-rose-500"
                        : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-rose-500 text-xs font-semibold">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Escribe tu mensaje con detalles aquí..."
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none ${
                      errors.message
                        ? "border-rose-500"
                        : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <span className="text-rose-500 text-xs font-semibold">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 dark:shadow-indigo-900/20 hover:shadow-indigo-600/30 transition-all duration-300 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
