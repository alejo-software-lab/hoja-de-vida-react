import React, { useState } from "react";
import { FolderGit2, ExternalLink, Code2, Layers } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("todos");

  const categories = [
    { id: "todos", label: "Todos" },
    { id: "frontend", label: "Frontend" },
    { id: "fullstack", label: "Full Stack" },
  ];

  const projects = [
    {
      title: "e-Commerce Analytics Dashboard",
      category: "frontend",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description:
        "Un panel de control analítico de ventas de alto rendimiento. Cuenta con gráficos interactivos dinámicos, gestión avanzada de inventarios y filtros complejos en tiempo real.",
      tech: ["React.js", "Tailwind CSS", "Recharts", "Vite", "Lucide Icons"],
      demoLink: "https://example.com",
      gitLink: "https://github.com",
    },
    {
      title: "TaskPulse - Kanban Board",
      category: "fullstack",
      image:
        "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=800&q=80",
      description:
        "Gestor de proyectos ágiles estilo Trello con tableros interactivos Drag & Drop, workspaces colaborativos, comentarios en tarjetas y notificaciones automáticas por correo.",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
      ],
      demoLink: "https://example.com",
      gitLink: "https://github.com",
    },
    {
      title: "ChatStream - Realtime Chat App",
      category: "fullstack",
      image:
        "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80",
      description:
        "Aplicación de chat grupal e individual en tiempo real. Soporta envío de multimedia, reacciones de emojis, estados de conexión en vivo y creación de canales temáticos.",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Express",
        "Socket.io",
        "MongoDB",
        "Cloudinary",
      ],
      demoLink: "https://example.com",
      gitLink: "https://github.com",
    },
    {
      title: "DevBlog MDX",
      category: "frontend",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
      description:
        "Un blog optimizado para desarrolladores que permite redactar publicaciones usando MDX (Markdown + React). Cuenta con resaltado de sintaxis nativo y modo lectura de noche.",
      tech: ["Next.js", "React.js", "MDX", "Tailwind CSS", "Framer Motion"],
      demoLink: "https://example.com",
      gitLink: "https://github.com",
    },
  ];

  const filteredProjects =
    filter === "todos"
      ? projects
      : projects.filter((p) => p.category === filter);

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
            Proyectos Destacados
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Una selección de mis trabajos más recientes e innovadores.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-550 to-purple-550 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Categories Filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                filter === cat.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-650/35"
                  : "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Image and overlay container */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Tech category badge overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-wider">
                    {project.category === "fullstack"
                      ? "Full Stack"
                      : "Frontend"}
                  </span>
                </div>

                {/* Black overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-3">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-white hover:bg-indigo-50 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs border border-slate-750 transition-colors"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>Código</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Text details container */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Badges / Tech pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/40 text-indigo-650 dark:text-indigo-400 text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
