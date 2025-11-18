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
  period: string;
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
  { label: "Sobre mí", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Educación", href: "#education" },
  { label: "Contacto", href: "#contact" },
];

export const heroContent = {
  title: "Alonso Viñé",
  subtitle: "Soy Alonso, un desarrollador y analista, apasionado por la tecnología. Me especializo en crear aplicaciones personalizadas que combinan funcionalidad y diseño. Mi objetivo es construir soluciones que impulsen la eficiencia y el rendimiento.",
  ctas: {
    primary: { label: "Ver Proyectos", href: "#projects" },
    secondary: { label: "Contactar", href: "#contact" },
  },
};

export const aboutContent = {
  textBlocks: [
    "¡Encantado de conocerte!",
    "En busca de nuevas oportunidades soy un entusiasta de las tecnologías emergentes siempre motivado.",
    "Creo firmemente en la mejora continua, y estoy emocionado por lo que el mundo del desarrollo de software me tiene preparado.",
  ],
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alonso-viñé-barrancos/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/AlonsoVine", icon: "github" },
];

export const skills: Skill[] = [
  { label: "Angular", category: "frontend", icon: "mouse-pointer" },
  { label: "TypeScript", category: "frontend", icon: "braces", variant: "primary" },
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
    title: "Ingeniero Informático (Frontend)",
    company: "Inetum - Ministerio de Defensa (Ejército del Aire y del Espacio)",
    period: "Diciembre 2024 — Julio 2025",
    bullets: [
      "Participé en el proyecto SL2000E, orientado a la gestión de la flota de sistemas de armas del Ejército del Aire y del Espacio.",
      "Desarrollé interfaces dinámicas con Angular, TypeScript, Bootstrap y RxJS, integradas con APIs REST para la gestión de datos en tiempo real.",
      "Colaboré con equipos backend y funcionales en un entorno Scrum, utilizando Jira y GitHub para la planificación y control de versiones.",
      "Me enfoqué en la optimización del rendimiento, la usabilidad y la mantenibilidad del código, contribuyendo a la modernización del sistema SL2000E.",
    ],
  },
  {
    position: "right",
    title: "Especialista en Testing Automático y Desarrollador Power Platform",
    company: "Fervimax Group (FCC)",
    period: "Mayo 2024 — Noviembre 2024",
    bullets: [
      "Implementé pruebas automáticas en el flujo CI/CD del equipo de DevOps dentro del departamento de Digital Services de FCC, utilizando Selenium para garantizar la calidad y la fiabilidad del software.",
      "Como desarrollador en la Power Platform, diseñé y construí aplicaciones personalizadas con Power Apps, automatizando procesos mediante Power Automate y analizando los datos con Power BI.",
      "Integré mis habilidades de diseño utilizando Figma para crear prototipos y maquetas de las aplicaciones, asegurando que las interfaces sean intuitivas y alineadas con las necesidades del usuario.",
    ],
  },
  {
    position: "left",
    title: "Desarrollador Full Stack",
    company: "Atos (Cestic)",
    period: "Septiembre 2022 — Agosto 2024",
    bullets: [
      "Desempeñé un puesto como desarrollador, principalmente de Front en proyectos corporativos de SEMADE del Ministerio de Defensa, especializándome en el diseño de interfaces de usuario utilizando Angular, PrimeNG y Bootstrap.",
      "En el ámbito del backend, implementé soluciones robustas con Java, Spring Boot y Oracle SQL.",
      "Utilicé Git y GitHub para gestionar el control de versiones y facilitar la colaboración en equipo. Colaboré eficientemente en equipos multidisciplinarios y aseguré la actualización constante de las aplicaciones.",
    ],
  },
  {
    position: "right",
    title: "Analista Funcional & Scrum Master",
    company: "Atos (Cestic)",
    period: "Julio 2021 — Agosto 2022",
    bullets: [
      "Me encargué de la consultoría y análisis en proyectos corporativos SEMADE del Ministerio de Defensa.",
      "Implementé el proceso SCRUM, apoyando la planificación y estimación de tareas, así como la monitorización del progreso del equipo.",
      "Fomenté la mejora continua y promoví la autoorganización, utilizando herramientas como Git y GitLab para la gestión del código, Jenkins para la integración continua, y Trello para la planificación de tareas.",
      "Empleé Postman para la prueba y validación de APIs, garantizando la entrega de proyectos de alta calidad.",
    ],
  },
  {
    position: "left",
    title: "Desarrollador Full Stack",
    company: "Atos",
    period: "Marzo 2021 — Junio 2021",
    bullets: [
      "Trabajé en la creación de la interfaz de usuario utilizando Angular, lo que me permitió desarrollar aplicaciones dinámicas y responsivas.",
      "Implementé el sistema de servidor con Spring Boot, facilitando la construcción de servicios robustos y escalables.",
      "Aproveché los servicios de Internet de las Cosas (IoT) ofrecidos por Azure IoT, permitiendo integrar funcionalidades innovadoras en la aplicación.",
      "Desarrollé una aplicación para dispositivos IoT en la plataforma Android, utilizando Java y el SDK de Android, contribuyendo a ofrecer una experiencia de usuario fluida en dispositivos móviles.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Jardín Digital",
    description: "Jardín Digital es una web artesanal para registrar y acompañar la vida de nuestras plantas. Incluye panel con KPIs, búsqueda y filtros dinámicos, exportación de fichas (JSON/TXT/CSV), tema claro/oscuro, sonido ambiente y hojas flotantes. Un proyecto personal que une botánica, diseño y emoción.",
    image: "/images/proyectos/jardinDigital/jardinDigitalFoto3.png",
    tech: ["HTML5", "CSS3", "JavaScript"],
    links: {
      demo: "https://alonsovine.github.io/jardin-digital/",
      code: "https://github.com/AlonsoVine/jardin-digital",
    },
  },
  {
    title: "ForYouToBe",
    description: "ForYouToBe es una herramienta en Python que permite descargar automáticamente el audio de videos de YouTube y guardarlos en diferentes formatos como MP3, WAV o FLAC. También puedes ingresar una lista de URLs, seleccionar el formato deseado y elegir la carpeta de destino, lo que facilita la gestión y conversión de contenido multimedia.",
    image: "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_3.jpg",
    tech: ["Python", "yt-dlp"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/forYouToBe",
    },
  },
  {
    title: "PhotoDateRenamer",
    description: "PhotoDateRenamer es una aplicación elaborada en Python que renombra automáticamente tus fotos utilizando los metadatos EXIF, concretamente la fecha en que fueron tomadas. El nuevo nombre de la foto seguirá el formato YYYY_MM_DD_nombreOriginal.tipoArchivo, facilitando la organización cronológica de tus imágenes.",
    image: "/images/proyectos/photoDateRenamer/fotografia-movil-versus-camara2.jpg",
    tech: ["Python", "EXIF"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/PhotoDateRenamer",
    },
  },
  {
    title: "Jarvis Asistente de Voz",
    description: "Este es un proyecto de asistente virtual desarrollado en Python, que permite realizar varias tareas mediante comandos de voz. El asistente puede realizar acciones como abrir aplicaciones, buscar en internet, consultar el clima, crear recordatorios, y enviar correos electrónicos, entre otros.",
    image: "/images/proyectos/jarvisVozAssistant/speech-recognition.jpg",
    tech: ["Python", "Speech Recognition"],
    links: {
      demo: "#",
      code: "https://github.com/AlonsoVine/jarvisVozAssistant",
    },
  },
  {
    title: "Space Invaders",
    description: "Este proyecto es una implementación del clásico juego Space Invaders desarrollado en Python. En este juego, el jugador controla una nave espacial que debe disparar para eliminar las naves enemigas que se acercan. El objetivo es destruir a todas las naves enemigas antes de que alcancen la parte inferior de la pantalla.",
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
    details: "El certificado AWS Cloud Practitioner acredita conocimientos fundamentales sobre la nube, incluyendo los servicios principales de AWS, seguridad, modelos de precios y conceptos clave de facturación.",
    image: "/images/certificados/Certificado AWS.png",
  },
  {
    institution: "EF SET",
    title: "EF SET English Certificate (C2 Proficient)",
    dates: "2024",
    details: "Certifica el nivel de inglés según el Marco Común Europeo, evaluando habilidades de lectura y comprensión auditiva.",
    image: "/images/certificados/EF SET Certificate inglés_recortada.jpg",
  },
  {
    institution: "GitHub",
    title: "GitHub Foundations",
    dates: "2024",
    details: "Valida conocimientos de Git y GitHub para gestión de proyectos y colaboración en repositorios.",
    image: "/images/certificados/GitHubFoundations_Badge20241008_page-0001.jpg",
  },
  {
    institution: "LPI",
    title: "LPI Linux Essentials",
    dates: "2024",
    details: "Acredita habilidades para manejar conceptos básicos de Linux, incluyendo su funcionamiento, línea de comandos, y gestión de archivos, fomentando una base sólida en software de código abierto.",
    image: "/images/certificados/Udemy_certificate_Linux_essentials.jpg",
  },
  {
    institution: "Microsoft Learn",
    title: "Crear y administrar aplicaciones de lienzo con Power Apps",
    dates: "2024",
    details: "Reconoce habilidades para diseñar, construir y gestionar aplicaciones en Power Apps, integrando datos y creando soluciones personalizadas sin programación avanzada.",
    image: "/images/certificados/Credencial - vinebarrancoalonso _ Microsoft Learn_Crea y administra aplicaciones de lienzo con Power Apps_page-0001.jpg",
  },
  {
    institution: "Udemy",
    title: "Scrum Master",
    dates: "2024",
    details: "Certifica habilidades para liderar equipos ágiles, aplicando principios y prácticas de Scrum, facilitando reuniones clave, eliminando impedimentos y promoviendo la mejora continua en proyectos de desarrollo ágil.",
    image: "/images/certificados/Udemy_certificate_Scrum_master.jpg",
  },
  {
    institution: "Udemy",
    title: "Selenium 4",
    dates: "2024",
    details: "Habilidades para automatizar pruebas de software utilizando Selenium 4 con Java, cubriendo desde la instalación y configuración hasta la creación de scripts de prueba avanzados, garantizando un desarrollo de software más eficiente y confiable.",
    image: "/images/certificados/Udemy_certificate_Selenium.jpg",
  },
];

