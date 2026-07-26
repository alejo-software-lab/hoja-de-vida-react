import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Send, MessageSquare, Globe, Code2, CheckCircle2, Phone } from "lucide-react";
import { ScrollReveal } from "../hooks/useAnimate";

const EMAILJS_SERVICE_ID = "service_apeyqkc";
const EMAILJS_PUBLIC_KEY = "32cHoh6lAn6OMgNP7";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "El nombre es requerido.";
    if (!formData.email.trim()) tempErrors.email = "El correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo no es válido.";
    if (!formData.subject.trim()) tempErrors.subject = "El asunto es requerido.";
    if (!formData.message.trim()) tempErrors.message = "El mensaje es requerido.";
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
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      savedToDb = true;
    } catch {}
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, "template_1txr2jd", { from_name: formData.name, from_email: formData.email, subject: formData.subject, message: formData.message }, EMAILJS_PUBLIC_KEY);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      if (savedToDb) { setSubmitSuccess(true); setFormData({ name: "", email: "", subject: "", message: "" }); setTimeout(() => setSubmitSuccess(false), 5000); }
      else setErrors({ message: "No se pudo enviar el mensaje." });
    } finally { setIsSubmitting(false); }
  };

  const contactItems = [
    { icon: <Mail className="w-5 h-5" />, label: "Envíame un correo", value: "alejosoftwarelabs@gmail.com", href: "mailto:alejosoftwarelabs@gmail.com", color: "indigo", hoverBorder: "hover:border-indigo-500" },
    { icon: <MapPin className="w-5 h-5" />, label: "Ubicación", value: "Colombia (Soporte Remoto)", color: "purple", hoverBorder: "" },
    { icon: <Phone className="w-5 h-5" />, label: "Llámame", value: "+57 350 777 9458", href: "tel:+573507779458", color: "emerald", hoverBorder: "hover:border-emerald-500" },
  ];

  return (
    <section id="contacto" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/55 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-3">
              <MessageSquare className="w-4 h-4" /><span>Contacto</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">¿Tienes un proyecto en mente? ¡Hablemos!</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3">Completa el formulario o contáctame a través de mis redes sociales.</p>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ScrollReveal direction="left" delay={200} className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-850 dark:text-white">Información de contacto</h3>
              <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-sm">Estoy disponible para roles a tiempo completo, proyectos freelance y colaboraciones de código abierto.</p>
              <div className="space-y-4">
                {contactItems.map((item, idx) => (
                  <ScrollReveal key={idx} delay={300 + idx * 100} direction="left">
                    <a href={item.href || "#"} target={item.href ? undefined : "_blank"} rel="noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 ${item.hoverBorder} hover:shadow-lg transition-all duration-300 group ${!item.href ? 'pointer-events-none' : ''}`}>
                      <div className={`w-12 h-12 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-950/55 text-${item.color}-600 dark:text-${item.color}-450 flex items-center justify-center group-hover:bg-${item.color}-600 group-hover:text-white group-hover:scale-110 transition-all duration-300`}>{item.icon}</div>
                      <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{item.label}</span><span className="text-sm font-bold text-slate-750 dark:text-white">{item.value}</span></div>
                    </a>
                  </ScrollReveal>
                ))}

                <ScrollReveal delay={600} direction="left">
                  <a href="https://wa.me/573507779458" target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/55 text-emerald-600 dark:text-emerald-450 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.744-6.27C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"/></svg>
                    </div>
                    <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Escríbeme</span><span className="text-sm font-bold text-slate-750 dark:text-white">WhatsApp</span></div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={700} direction="left">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 hover:scale-[1.02] transition-transform duration-300">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold leading-relaxed">Respuesta rápida: Normalmente respondo a correos en menos de 24 horas laborables.</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal delay={800}>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Sígueme o búscame</span>
                <div className="flex gap-4">
                   <a href="https://www.linkedin.com/in/daniel-alejandro-muñoz-godoy-8830b3395" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg transition-all duration-300">
                    <Globe className="w-5 h-5" />
                  </a>
                   <a href="https://github.com/alejo-software-lab" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg transition-all duration-300">
                    <Code2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={300} className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 shadow-sm relative hover:shadow-2xl transition-shadow duration-500">
              {submitSuccess && (
                <div className="absolute inset-0 bg-white dark:bg-slate-950 rounded-3xl z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in border border-emerald-500/20">
                  <div className="w-16 h-16 rounded-full bg-emerald-150 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 flex items-center justify-center mb-4 animate-bounce"><CheckCircle2 className="w-10 h-10" /></div>
                  <h4 className="text-2xl font-bold text-slate-850 dark:text-white mb-2">¡Mensaje enviado con éxito!</h4>
                  <p className="text-slate-550 dark:text-slate-400 text-sm max-w-sm leading-relaxed">Muchas gracias por escribirme. Me pondré en contacto contigo a la brevedad.</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nombre Completo</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Juan Pérez"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:scale-[1.02] transition-all duration-300 ${errors.name ? "border-rose-500 animate-shake" : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"}`} />
                    {errors.name && <span className="text-rose-500 text-xs font-semibold">{errors.name}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Correo Electrónico</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ej. juan@correo.com"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:scale-[1.02] transition-all duration-300 ${errors.email ? "border-rose-500 animate-shake" : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"}`} />
                    {errors.email && <span className="text-rose-500 text-xs font-semibold">{errors.email}</span>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Asunto</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Ej. Oferta de empleo"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:scale-[1.02] transition-all duration-300 ${errors.subject ? "border-rose-500 animate-shake" : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"}`} />
                  {errors.subject && <span className="text-rose-500 text-xs font-semibold">{errors.subject}</span>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mensaje</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Escribe tu mensaje..."
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:scale-[1.02] transition-all duration-300 resize-none ${errors.message ? "border-rose-500 animate-shake" : "border-slate-200 dark:border-slate-850 focus:border-indigo-550"}`}></textarea>
                  {errors.message && <span className="text-rose-500 text-xs font-semibold">{errors.message}</span>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/50 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 disabled:cursor-not-allowed group">
                  {isSubmitting ? (
                    <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Enviando...</span></>
                  ) : (<><span>Enviar Mensaje</span><Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" /></>)}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
