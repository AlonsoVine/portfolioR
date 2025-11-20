export type NavLink = {
  label: string;
  href: string;
};

export type SocialIconId = "linkedin" | "github" | "twitter";
export type SkillIconId =
  | "mouse-pointer"
  | "braces"
  | "server"
  | "terminal"
  | "sparkles"
  | "figma"
  | "cpu"
  | "message-circle";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconId;
};

export type Skill = {
  label: string;
  category: "frontend" | "backend" | "tools" | "other";
  icon: SkillIconId;
  variant?: "primary" | "secondary";
};

export type Experience = {
  position: "left" | "right";
  title: string;
  company: string;
  project?: string;
  location?: string;
  period: string;
  tech?: string[];
  bullets: string[];
};

export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  links: {
    demo: string;
    code: string;
  };
};

export type Education = {
  institution: string;
  title: string;
  dates: string;
  details: string;
  image?: string;
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Sobre mí", href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Educación", href: "#education" },
  { label: "Contacto", href: "#contact" },
];

export const heroContent = {
  eyebrow: "Bienvenido a mi portfolio",
  title: "Alonso Vi\u00F1\u00E9",
  role: "Desarrollador y Analista",
  subtitle:
    "Apasionado por la tecnolog\u00EDa. Me especializo en crear aplicaciones personalizadas que combinan funcionalidad y dise\u00F1o. Mi objetivo es construir soluciones que impulsen la eficiencia y el rendimiento.",
  image: {
    front: {
      src: "/images/mi-foto.png",
      alt: "Retrato de Alonso Vi\u00F1\u00E9",
    },
    back: {
      src: "/images/logo/logo-negro-redondo-conFondo.png",
      alt: "Monograma de Alonso Vi\u00F1\u00E9",
    },
  },
  ctas: {
    primary: { label: "Ver Proyectos", href: "#projects" },
    secondary: {
      label: "Descargar CV",
      href: "/assets/cv/20250612%20-%20Alonso%20Vi%C3%B1%C3%A9%20CV_Espa%C3%B1ol.pdf",
      download: true,
    },
  },
};

export const aboutContent = {
  textBlocks: [
    "¡Encantado de conocerte!",
    "Soy un entusiasta de las tecnologías emergentes siempre motivado.",
    "Emocionado por lo que el mundo del desarrollo de software me tiene preparado.",
  ],
  highlights: [
    {
      title: "Desarrollo Frontend",
      description: "Especializado en Angular y TypeScript con enfoque en interfaces modernas y limpias.",
      icon: "code",
    },
    {
      title: "Buenas Practicas",
      description: "Codigo limpio, mantenible y siguiendo los estandares de la industria.",
      icon: "target",
    },
    {
      title: "Aprendizaje Continuo",
      description: "Siempre explorando nuevas tecnologias y mejorando mis habilidades.",
      icon: "zap",
    },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alonso-viñé-barrancos/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/AlonsoVine", icon: "github" },
];

export const skills: Skill[] = [
  { label: "Angular", category: "frontend", icon: "mouse-pointer" },
  {
    label: "TypeScript",
    category: "frontend",
    icon: "braces",
    variant: "primary",
  },
  { label: "Java / Spring Boot", category: "backend", icon: "server" },
  { label: "Python", category: "backend", icon: "terminal" },
  { label: "AWS / Azure", category: "other", icon: "sparkles" },
  { label: "Power Platform", category: "tools", icon: "figma" },
  { label: "CI/CD & DevOps", category: "tools", icon: "cpu" },
  { label: "Scrum Master", category: "other", icon: "message-circle" },
];

export const experiences: Experience[] = [
  {
    position: "left",
    title: "Ingeniero Informatico (Frontend)",
    company: "Inetum",
    project: "Ministerio de Defensa (Ejercito del Aire y del Espacio)",
    location: "Madrid, Espana",
    period: "Dic 2024 - Jul 2025",
    tech: [
      "Angular",
      "TypeScript",
      "Bootstrap",
      "RxJS",
      "REST APIs",
      "Scrum",
      "Jira",
      "GitHub",
    ],
    bullets: [
      "Participe en el programa SL2000E para la gestion de la flota de sistemas del Ejercito del Aire.",
      "Desarrolle interfaces dinamicas con Angular, TypeScript, Bootstrap y RxJS conectadas a APIs REST.",
      "Coordine con equipos backend y funcionales dentro de un marco Scrum usando Jira y GitHub.",
      "Impulse mejoras de rendimiento y mantenibilidad durante la modernizacion del sistema.",
    ],
  },
  {
    position: "right",
    title: "Especialista en Testing Automatico y Power Platform",
    company: "Fervimax Group (FCC)",
    project: "Digital Services / DevOps",
    location: "Madrid, Espana",
    period: "May 2024 - Nov 2024",
    tech: [
      "Selenium",
      "CI/CD",
      "Power Apps",
      "Power Automate",
      "Power BI",
      "Figma",
    ],
    bullets: [
      "Integre suites de pruebas automaticas con Selenium dentro del pipeline CI/CD del area DevOps.",
      "Cree aplicaciones y flujos en Power Apps y Power Automate para digitalizar procesos internos.",
      "Modele tableros analiticos en Power BI y valide requisitos junto a las areas funcionales.",
      "Apoye al equipo de diseno con prototipos en Figma para asegurar experiencias consistentes.",
    ],
  },
  {
    position: "left",
    title: "Desarrollador Full Stack",
    company: "Atos (Cestic)",
    project: "SEMADE - Ministerio de Defensa",
    location: "Madrid, Espana",
    period: "Sep 2022 - Ago 2024",
    tech: [
      "Angular",
      "PrimeNG",
      "Bootstrap",
      "Java",
      "Spring Boot",
      "Oracle SQL",
      "Git",
      "GitHub",
    ],
    bullets: [
      "Lidere el desarrollo frontend de portales corporativos usando Angular, PrimeNG y Bootstrap.",
      "Implemente microservicios en Java y Spring Boot respaldados por Oracle SQL.",
      "Gestione versionado y code reviews con Git y GitHub dentro de equipos multidisciplinares.",
      "Mantenga aplicaciones criticas alineadas con los entregables del Ministerio de Defensa.",
    ],
  },
  {
    position: "right",
    title: "Analista Funcional y Scrum Master",
    company: "Atos (Cestic)",
    project: "SEMADE - Ministerio de Defensa",
    location: "Madrid, Espana",
    period: "Jul 2021 - Ago 2022",
    tech: ["Scrum", "Jira", "Git", "GitLab", "Jenkins", "Trello", "Postman"],
    bullets: [
      "Coordine discovery y analisis funcional para iniciativas corporativas de SEMADE.",
      "Implemente ceremonias Scrum guiando planificacion, estimaciones y seguimiento del backlog.",
      "Promovi la mejora continua apoyandome en Git/GitLab, Jenkins y Trello.",
      "Valide integraciones API con Postman garantizando entregas alineadas a los SLA.",
    ],
  },
  {
    position: "left",
    title: "Desarrollador Full Stack",
    company: "Atos",
    project: "Soluciones IoT internas",
    location: "Madrid, Espana",
    period: "Mar 2021 - Jun 2021",
    tech: ["Angular", "Spring Boot", "Azure IoT", "Android", "Java"],
    bullets: [
      "Cree interfaces web responsivas con Angular para monitorear dispositivos IoT.",
      "Desarrolle servicios REST con Spring Boot para orquestar la capa de negocio.",
      "Conecte dispositivos mediante Azure IoT aportando telemetria en tiempo real.",
      "Implemente una app Android en Java para interactuar con la plataforma desde campo.",
    ],
  },
];
export const projects: Project[] = [
  {
    title: "Jardín Digital",
    description:
      "Jardín Digital es una web artesanal para registrar y acompañar la vida de nuestras plantas. Incluye panel con KPIs, búsqueda y filtros dinámicos, exportación de fichas (JSON/TXT/CSV), tema claro/oscuro, sonido ambiente y hojas flotantes. Un proyecto personal que une botánica, diseño y emoción.",
    image: "/images/proyectos/jardinDigital/jardinDigitalFoto3.png",
    tech: ["HTML5", "CSS3", "JavaScript"],
    links: {
      demo: "https://alonsovine.github.io/jardin-digital/",
      code: "https://github.com/AlonsoVine/jardin-digital",
    },
  },
  {
    title: "ForYouToBe",
    description:
      "ForYouToBe es una herramienta en Python que permite descargar automáticamente el audio de videos de YouTube y guardarlos en diferentes formatos como MP3, WAV o FLAC. También puedes ingresar una lista de URLs, seleccionar el formato deseado y elegir la carpeta de destino, lo que facilita la gestión y conversión de contenido multimedia.",
    image:
      "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_3.jpg",
    tech: ["Python", "yt-dlp"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/forYouToBe",
    },
  },
  {
    title: "PhotoDateRenamer",
    description:
      "PhotoDateRenamer es una aplicación elaborada en Python que renombra automáticamente tus fotos utilizando los metadatos EXIF, concretamente la fecha en que fueron tomadas. El nuevo nombre de la foto seguirá el formato YYYY_MM_DD_nombreOriginal.tipoArchivo, facilitando la organización cronológica de tus imágenes.",
    image:
      "/images/proyectos/photoDateRenamer/fotografia-movil-versus-camara2.jpg",
    tech: ["Python", "EXIF"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/PhotoDateRenamer",
    },
  },
  {
    title: "Jarvis Asistente de Voz",
    description:
      "Este es un proyecto de asistente virtual desarrollado en Python, que permite realizar varias tareas mediante comandos de voz. El asistente puede realizar acciones como abrir aplicaciones, buscar en internet, consultar el clima, crear recordatorios, y enviar correos electrónicos, entre otros.",
    image: "/images/proyectos/jarvisVozAssistant/speech-recognition.jpg",
    tech: ["Python", "Speech Recognition"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/jarvisVozAssistant",
    },
  },
  {
    title: "Space Invaders",
    description:
      "Este proyecto es una implementación del clásico juego Space Invaders desarrollado en Python. En este juego, el jugador controla una nave espacial que debe disparar para eliminar las naves enemigas que se acercan. El objetivo es destruir a todas las naves enemigas antes de que alcancen la parte inferior de la pantalla.",
    image: "/images/proyectos/spaceInvaders/space_invaders.png",
    tech: ["Python", "Pygame"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/spaceInvaders",
    },
  },
];

export const education: Education[] = [
  {
    institution: "AWS",
    title: "AWS Certified Cloud Practitioner",
    dates: "2024",
    details:
      "El certificado AWS Cloud Practitioner acredita conocimientos fundamentales sobre la nube, incluyendo los servicios principales de AWS, seguridad, modelos de precios y conceptos clave de facturación.",
    image: "/images/certificados/Certificado AWS.png",
  },
  {
    institution: "EF SET",
    title: "EF SET English Certificate (C2 Proficient)",
    dates: "2024",
    details:
      "Certifica el nivel de inglés según el Marco Común Europeo, evaluando habilidades de lectura y comprensión auditiva.",
    image: "/images/certificados/EF SET Certificate inglés_recortada.jpg",
  },
  {
    institution: "GitHub",
    title: "GitHub Foundations",
    dates: "2024",
    details:
      "Valida conocimientos de Git y GitHub para gestión de proyectos y colaboración en repositorios.",
    image: "/images/certificados/GitHubFoundations_Badge20241008_page-0001.jpg",
  },
  {
    institution: "LPI",
    title: "LPI Linux Essentials",
    dates: "2024",
    details:
      "Acredita habilidades para manejar conceptos básicos de Linux, incluyendo su funcionamiento, línea de comandos, y gestión de archivos, fomentando una base sólida en software de código abierto.",
    image: "/images/certificados/Udemy_certificate_Linux_essentials.jpg",
  },
  {
    institution: "Microsoft Learn",
    title: "Crear y administrar aplicaciones de lienzo con Power Apps",
    dates: "2024",
    details:
      "Reconoce habilidades para diseñar, construir y gestionar aplicaciones en Power Apps, integrando datos y creando soluciones personalizadas sin programación avanzada.",
    image:
      "/images/certificados/Credencial - vinebarrancoalonso _ Microsoft Learn_Crea y administra aplicaciones de lienzo con Power Apps_page-0001.jpg",
  },
  {
    institution: "Udemy",
    title: "Scrum Master",
    dates: "2024",
    details:
      "Certifica habilidades para liderar equipos ágiles, aplicando principios y prácticas de Scrum, facilitando reuniones clave, eliminando impedimentos y promoviendo la mejora continua en proyectos de desarrollo ágil.",
    image: "/images/certificados/Udemy_certificate_Scrum_master.jpg",
  },
  {
    institution: "Udemy",
    title: "Selenium 4",
    dates: "2024",
    details:
      "Habilidades para automatizar pruebas de software utilizando Selenium 4 con Java, cubriendo desde la instalación y configuración hasta la creación de scripts de prueba avanzados, garantizando un desarrollo de software más eficiente y confiable.",
    image: "/images/certificados/Udemy_certificate_Selenium.jpg",
  },
];
