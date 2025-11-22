export type NavLink = {
  label: string;
  href: string;
};

export type SocialIconId = "linkedin" | "github" | "twitter";
export type SkillCardIconId =
  | "code"
  | "layers"
  | "cloud"
  | "database"
  | "wrench"
  | "badge";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconId;
};

export type SkillCard = {
  title: string;
  icon: SkillCardIconId;
  tone: "blue" | "green" | "teal" | "purple" | "amber" | "rose";
  items: string[];
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
  featured?: boolean;
  links: {
    demo?: string;
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
    "Encantado de conocerte!",
    "Soy un entusiasta de las tecnologias emergentes siempre motivado.",
    "Emocionado por lo que el mundo del desarrollo de software me tiene preparado.",
  ],
  highlights: [
    {
      title: "Desarrollo Frontend",
      description:
        "Especializado en Angular y TypeScript con enfoque en interfaces modernas y limpias.",
      icon: "code",
    },
    {
      title: "Buenas Practicas",
      description:
        "Codigo limpio, mantenible y siguiendo los estandares de la industria.",
      icon: "target",
    },
    {
      title: "Aprendizaje Continuo",
      description:
        "Siempre explorando nuevas tecnologias y mejorando mis habilidades.",
      icon: "zap",
    },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alonso-viÃ±Ã©-barrancos/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/AlonsoVine", icon: "github" },
];

export const skillCards: SkillCard[] = [
  {
    title: "Lenguajes y Programacion",
    icon: "code",
    tone: "blue",
    items: [
      "Java",
      "TypeScript",
      "JavaScript",
      "Node",
      "Python",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frameworks y Librerias",
    icon: "layers",
    tone: "green",
    items: [
      "Angular",
      "React",
      "Spring Boot",
      "PrimeNG",
      "Bootstrap",
      "Tailwind",
      "RxJS",
      "Android SDK",
    ],
  },
  {
    title: "Cloud y DevOps",
    icon: "cloud",
    tone: "teal",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "CI/CD",
      "Jenkins",
      "GitHub Actions",
      "Docker",
    ],
  },
  {
    title: "Bases de Datos",
    icon: "database",
    tone: "purple",
    items: [
      "Oracle SQL Developer",
      "MySQL",
      "Analisis de Datos (R)",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Herramientas y Plataformas",
    icon: "wrench",
    tone: "rose",
    items: [
      "Git/GitHub",
      "Selenium",
      "Power Platform",
      "PowerApps",
      "Power Automate",
      "Power BI",
      "Figma",
      "Postman",
      "Bash/Shell",
    ],
  },
  {
    title: "Certificaciones",
    icon: "badge",
    tone: "amber",
    items: [
      "EF SET (C2 Proficient)",
      "AWS Cloud Practitioner",
      "GitHub Foundations",
      "LPI Linux Essentials",
    ],
  },
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
    title: "Jardin Digital",
    featured: true,
    description:
      "Web artesana para registrar y acompanÌƒar la vida de las plantas. Incluye panel con KPIs, filtros dinamicos, exportacion de fichas (JSON/TXT/CSV), tema claro/oscuro, sonido ambiente y hojas flotantes.",
    image: "/images/proyectos/jardinDigital/jardinDigitalFoto3.png",
    tech: ["Angular", "TypeScript", "Tailwind CSS", "LocalStorage", "JSON"],
    links: {
      demo: "https://alonsovine.github.io/jardin-digital/",
      code: "https://github.com/AlonsoVine/jardin-digital",
    },
  },
  {
    title: "ForYouToBe",
    description:
      "Herramienta en Python para descargar audio de YouTube en varios formatos (MP3, WAV, FLAC) a partir de URLs individuales o listas, con seleccion de formato y carpeta destino.",
    image:
      "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_3.jpg",
    tech: ["Python", "yt-dlp"],
    links: {
      code: "https://github.com/AlonsoVine/forYouToBe",
    },
  },
  {
    title: "PhotoDateRenamer",
    description:
      "Aplicacion Python que renombra fotos usando metadatos EXIF (fecha tomada) siguiendo el formato YYYY_MM_DD_nombreOriginal.ext, facilitando el orden cronologico.",
    image:
      "/images/proyectos/photoDateRenamer/fotografia-movil-versus-camara2.jpg",
    tech: ["Python", "EXIF"],
    links: {
      code: "https://github.com/AlonsoVine/PhotoDateRenamer",
    },
  },
  {
    title: "Jarvis Asistente de Voz",
    description:
      "Asistente virtual en Python capaz de ejecutar comandos de voz: abrir apps, buscar en internet, consultar clima, crear recordatorios y enviar correos, entre otros.",
    image: "/images/proyectos/jarvisVozAssistant/speech-recognition.jpg",
    tech: ["Python", "Speech Recognition"],
    links: {
      code: "https://github.com/AlonsoVine/jarvisVozAssistant",
    },
  },
  {
    title: "Space Invaders",
    description:
      "Implementacion del clasico Space Invaders en Python: control de nave, disparo a enemigos y gestion de oleadas antes de que alcancen la base.",
    image: "/images/proyectos/spaceInvaders/space_invaders.png",
    tech: ["Python", "Pygame"],
    links: {
      code: "https://github.com/AlonsoVine/spaceInvaders",
    },
  },
];
export const education: Education[] = [
  {
    institution: "Universidad Nebrija",
    title: "Prompt Engineering",
    dates: "2025",
    details:
      "Curso universitario en Prompt Engineering orientado al diseño, optimización e integración de prompts avanzados para sistemas de IA generativa. Incluye fundamentos de IA, creación de chatbots, mejora de interacción, aplicación ética y despliegue de soluciones basadas en ChatGPT en entornos web y aplicaciones.",
    image:
      "/images/certificados/Certificado-UniversidadNebrija-PromptEngineering.jpg",
  },
  {
    institution: " Universitat Oberta de Catalunya",
    title: "Iniciación a la Inteligencia Artificial",
    dates: "2025",
    details:
      "Certificado universitario de formación continua en fundamentos de Inteligencia Artificial, con 24 créditos ECTS y una dedicación de 600 horas. Proporciona conocimientos esenciales sobre los principios de la IA, su contexto académico y su aplicación en entornos reales.",
    image:
      "/images/certificados/Certificado-UOC-Iniciacion-IA_page-0001.jpg",
  },
  {
    institution: "UTAMED",
    title: "Inteligencia Artificial para Programadores",
    dates: "2025",
    details:
      "Curso universitario especializado de 200 horas enfocado en el uso práctico de la IA en desarrollo de software. Incluye aprendizaje automático, redes neuronales, NLP, visión artificial, big data, optimización de modelos y despliegue en producción, proporcionando una base sólida y aplicada en IA moderna.",
    image:
      "/images/certificados/Certificado-Utamed-InteligenciaArtificialParaProgramadores_page-0001.jpg",
  },
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
      "Acredita habilidades para manejar conceptos básicos de Linux, incluyendo su funcionamiento, línea de comandos y gestión de archivos, fomentando una base sólida en software de código abierto.",
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

