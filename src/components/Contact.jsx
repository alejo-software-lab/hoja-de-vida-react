<<<<<<< HEAD
import React from "react";
=======
import React, { useState, useEffect, useRef } from "react";
>>>>>>> ebb14621001fcb95805e7f04303a44f9db42afab
import {
  Mail,
  MapPin,
  MessageSquare,
  Globe,
  Code2,
  CheckCircle2,
  Phone,
} from "lucide-react";

// Base del API: en dev queda vacía y el proxy de Vite redirige /api al servicio
// Node local; en producción apunta al Web Service de Render (VITE_API_URL).
const API_BASE = import.meta.env.VITE_API_URL || "";

// Cloudflare Turnstile (captcha anti-bot). Opcional: si no hay site key, no se
// carga nada y el formulario funciona solo con honeypot + rate-limit del servidor.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const Contact = () => {
<<<<<<< HEAD
=======
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot: oculto para humanos, los bots lo rellenan
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const turnstileRef = useRef(null);
  const widgetId = useRef(null);

  // Carga el script de Turnstile y renderiza el widget solo si hay site key.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const render = () => {
      if (!window.turnstile || !turnstileRef.current || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
      });
    };
    if (window.turnstile) {
      render();
      return;
    }
    const src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    return () => script.removeEventListener("load", render);
  }, []);

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
    try {
      const turnstileToken =
        TURNSTILE_SITE_KEY && window.turnstile
          ? window.turnstile.getResponse(widgetId.current)
          : undefined;

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        // El servidor puede devolver errores por campo o un mensaje general.
        if (data.errors) setErrors(data.errors);
        else setErrors({ message: data.error || "No se pudo enviar el mensaje. Intenta de nuevo." });
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "", company: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setErrors({ message: "No se pudo conectar con el servidor. Intenta más tarde." });
    } finally {
      // Un token de Turnstile es de un solo uso: resetea para el próximo envío.
      if (TURNSTILE_SITE_KEY && window.turnstile && widgetId.current !== null) {
        window.turnstile.reset(widgetId.current);
      }
      setIsSubmitting(false);
    }
  };

>>>>>>> ebb14621001fcb95805e7f04303a44f9db42afab
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

<<<<<<< HEAD
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
=======
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot anti-bot: oculto para humanos, no debe rellenarse */}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
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

                {/* Turnstile: se renderiza aquí solo si hay VITE_TURNSTILE_SITE_KEY */}
                {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="min-h-[65px]" />}

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
>>>>>>> ebb14621001fcb95805e7f04303a44f9db42afab
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
