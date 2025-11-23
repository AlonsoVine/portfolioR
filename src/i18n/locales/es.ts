import {
  education,
  experiences,
  heroContent,
  navLinks,
  projects,
  skillCards,
  aboutContent,
  socialLinks,
} from "@/data/portfolio";

export const es = {
  lang: "es",
  nav: {
    links: navLinks,
  },
  hero: heroContent,
  about: {
    ...aboutContent,
    eyebrow: "Sobre mi",
    title: "Conoceme mejor",
    description:
      "Apasionado por la tecnologia y siempre en busca de nuevas oportunidades para crecer profesionalmente.",
  },
  skills: {
    eyebrow: "Stack",
    title: "Stack Tecnológico",
    description:
      "Agrupación de mis habilidades clave y las herramientas esenciales que utilizo diariamente",
    cards: skillCards,
  },
  experiences,
  experienceHeading: {
    eyebrow: "Experiencia",
    title: "Timeline profesional",
    description: "Resumen de mi experiencia laboral en orden cronológico.",
  },
  projects: {
    eyebrow: "Casos",
    title: "Proyectos destacados",
    description: "Una muestra de lo que construyo.",
    codeLabel: "Codigo",
    demoLabel: "Ver Demo",
    featuredLabel: "Destacado",
    items: projects,
  },
  education: {
    eyebrow: "Formacion",
    title: "Educacion & Especializaciones",
    description: "Mi formacion y certificaciones mas relevantes.",
    items: education,
  },
  contact: {
    eyebrow: "Contacto",
    title: "Trabajemos juntos",
    description:
      "Estoy abierto a nuevas oportunidades y colaboraciones. No dudes en escribirme.",
    form: {
      title: "Enviame un mensaje",
      helper:
        "Completa el formulario y me pondre en contacto contigo lo antes posible.",
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Email", placeholder: "tu@email.com" },
      message: { label: "Mensaje", placeholder: "Escribe tu mensaje aqui..." },
      submit: "Enviar mensaje",
    },
    platforms: {
      title: "Conecta conmigo",
      subtitle: "Encuentrame en estas plataformas.",
    },
    availability: {
      title: "Disponible para colaborar",
      description:
        "Actualmente estoy buscando nuevas oportunidades y colaboraciones interesantes. Si tienes un proyecto en mente, hablemos.",
    },
  },
  footer: {
    tagline: "Desarrollador y Analista",
    madeWith: "Hecho con ♥ por Alonso Viñé",
    rights: (year: number) => `© ${year} Todos los derechos reservados.`,
    builtWith: "Desarrollado con React, Tailwind CSS y mucho cafe ☕",
  },
  socialLinks,
};
