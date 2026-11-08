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
    eyebrow: "Sobre mí",
    pullQuote: "Lo que más me mueve es convertir un «no se puede» en «mira cómo lo hicimos».",
    title: "Conóceme mejor",
    description:
      "Apasionado por la tecnología y siempre en busca de nuevas oportunidades para crecer profesionalmente.",
  },
  skills: {
    eyebrow: "Stack",
    title: "Stack Tecnológico",
    description:
      "Agrupación de mis habilidades clave y las herramientas esenciales que utilizo a diario.",
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
    codeLabel: "Código",
    demoLabel: "Ver Demo",
    featuredLabel: "Destacado",
    galleryLabel: "Capturas",
    videoLabel: "Vídeo",
    mediaToggleLabel: "Vista multimedia de Liberty",
    logoAlt: "Logotipo del proyecto",
    videoAlt: "Vídeo de demostración de Liberty",
    items: projects.map((project) => ({
      ...project,
      demoLinkLabel:
        project.title === "Liberty" ||
        project.title === "Jardin Digital" ||
        project.title === "PhotoDateRenamer"
          ? "Ver web"
          : undefined,
    })),
  },
  education: {
    eyebrow: "Formación",
    title: "Educación y especializaciones",
    description: "Mi formación y certificaciones más relevantes.",
    items: education,
  },
  contact: {
    eyebrow: "Contacto",
    title: "Trabajemos juntos",
    description:
      "Estoy abierto a nuevas oportunidades y colaboraciones. No dudes en escribirme.",
    form: {
      title: "Envíame un mensaje",
      helper:
        "Completa el formulario y me pondré en contacto contigo lo antes posible.",
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Email", placeholder: "tu@email.com" },
      message: { label: "Mensaje", placeholder: "Escribe tu mensaje aquí..." },
      submit: "Enviar mensaje",
    },
    platforms: {
      title: "Conecta conmigo",
      subtitle: "Encuéntrame en estas plataformas.",
    },
    availability: {
      title: "Disponible para colaborar",
      description:
        "Actualmente estoy buscando nuevas oportunidades y colaboraciones interesantes. Si tienes un proyecto en mente, hablemos.",
    },
  },
  ui: {
    present: "hoy",
    stage: "Etapa",
    taglines: [
      "Actualmente · {current}",
      "{tech}",
      "{years}+ años entregando código en producción",
      "Frontend · Backend · DevOps",
      "{projects} proyectos en GitHub · 1 jugable, el resto código",
      "Inglés C2 + Español · entornos internacionales OK",
    ],
    heroStats: {
      years: "años en producción",
      companies: "empresas",
      projects: "proyectos en GitHub",
      certifications: "formaciones y certificados",
    },
    scrollCue: "Desliza",
    sectionNav: "Índice de secciones",
    socialProfile: "Perfil de {name}",
    projectCounter: "Proyecto",
    copyEmail: "Copiar email",
    emailCopied: "Email copiado",
    madridTime: "Hora en Madrid",
    languageCurrent: "Idioma",
    languageSwitch: "cambiar a inglés",
    carousel: {
      zoom: "Ampliar imagen {n} de {total}",
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      goTo: "Ir a la imagen {n} de {total}",
      zoomed: "vista ampliada",
      close: "Cerrar vista ampliada",
    },
    scrollTop: "Volver al inicio",
  },
  socialLinks,
};
