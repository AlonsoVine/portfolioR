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
  gallery?: string[];
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
  { label: "Sobre m\u00ed", href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Educaci\u00f3n", href: "#education" },
  { label: "Contacto", href: "#contact" },
];

export const heroContent = {
  title: "Alonso Vi\u00f1\u00e9",
  role: "Full Stack Developer \u00B7 DevOps & IA",
  location: "Madrid, Espa\u00f1a",
  availability: "Disponible para colaborar",
  subtitle:
    "{years}+ a\u00f1os construyendo software para Defensa, FCC e Inetum. Ahora en Seres modernizando pipelines de despliegue y explorando el desarrollo asistido por agentes de IA.",
  image: {
    front: {
      src: "/images/mi-foto.png",
      alt: "Retrato de Alonso Vi\u00f1\u00e9",
    },
    back: {
      src: "/images/logo/logo-negro-redondo-conFondo.png",
      alt: "Monograma de Alonso Vi\u00f1\u00e9",
    },
  },
  ctas: {
    primary: { label: "Ver Proyectos", href: "#projects" },
    secondary: {
      label: "Descargar CV",
      href: "/assets/cv/Alonso Vi\u00f1\u00e9 CV_Espa\u00f1ol.pdf",
      download: true,
    },
    tertiary: { label: "Cont\u00E1ctame", href: "#contact" },
  },
};

export const aboutContent = {
  textBlocks: [
    "Encantado de conocerte!",
    "Soy un entusiasta de las tecnolog\u00edas emergentes siempre motivado.",
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
      title: "Desarrollo Backend",
      description:
        "Enfocado en Java/Spring Boot y NestJS, creando APIs robustas. Experiencia en SQL y en tareas ETL.",
      icon: "gear",
    },
    {
      title: "Aprendizaje Continuo",
      description:
        "Siempre explorando nuevas tecnolog\u00edas y mejorando mis habilidades.",
      icon: "zap",
    },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alonso-vi\u00f1\u00e9-barrancos/",
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
      "Next.js",
      "Spring Boot",
      "Express",
      "Django",
      "NestJS",
      "Mongoose",
      "PrimeNG",
      "Bootstrap",
      "Tailwind",
      "RxJS",
      "Android SDK",
      "Vitest",
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
      "Jenkins",
      "GitHub Actions",
      "GitLab CI/CD",
      "Maven",
      "Nexus",
      "SonarQube",
    ],
  },
  {
    title: "Bases de Datos",
    icon: "database",
    tone: "purple",
    items: [
      "Oracle SQL Developer",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Analisis de Datos (R)",
    ],
  },
  {
    title: "Herramientas y Plataformas",
    icon: "wrench",
    tone: "rose",
    items: [
      "Git/GitHub/GitLab",
      "Linux",
      "Selenium",
      "Figma",
      "Postman",
      "Bash/Shell",
      "Power Platform",
      "Power Automate",
      "Power BI",
      "PowerApps",
      "Jira",
      "Scrum",
    ],
  },
  {
    title: "Certificaciones",
    icon: "badge",
    tone: "amber",
    items: [
      "EF SET (C2 Proficient)",
      "LPI Linux",
      "AWS Cloud Practitioner",
      "Prompt Engineering",
      "GitHub Foundations",
      "Introducing AI",
      "AI for Developers",
    ],
  },
];

export const experiences: Experience[] = [
  {
    position: "right",
    title: "DevOps Engineer \u00b7 CI/CD & Release Automation",
    company: "Seres",
    project: "Aplicaci\u00f3n central de Seres",
    location: "Madrid, Espa\u00f1a",
    period: "Feb 2026 - Actual",
    tech: [
      "GitLab",
      "GitLab CI/CD",
      "Nexus",
      "Java",
      "Maven",
      "Docker",
      "Jenkins",
      "SonarQube",
      "Bash/Shell",
      "Linux",
      "Scrum",
      "Jira",
    ],
    bullets: [
      "Lidero la modernizaci\u00f3n del ciclo de despliegue de proyectos Java distribuidos por cliente, sustituyendo el flujo manual actual por pipelines reproducibles en GitLab CI/CD.",
      "Dise\u00f1o e implemento pipelines de build, test y release con GitLab CI integrados con Nexus como repositorio de artefactos Maven.",
      "Estandarizo el versionado y la publicaci\u00f3n de artefactos para una cartera amplia de proyectos cliente, reduciendo errores y tiempos de release.",
      "Establezco pr\u00e1cticas de release seguras (semver, rollback, trazabilidad) y documento los pipelines para que el resto del equipo pueda mantenerlos.",
      "Colaboro con los equipos de desarrollo Java para integrar gates de calidad (linting, tests, cobertura con SonarQube) en el pipeline.",
    ],
  },
  {
    position: "left",
    title: "Ingeniero Inform\u00e1tico",
    company: "Inetum",
    project: "Minisdef (Ej\u00e9rcito del Aire y del Espacio)",
    location: "Madrid, Espa\u00f1a",
    period: "Dic 2024 - Jul 2025",
    tech: [
      "Angular",
      "TypeScript",
      "Bootstrap",
      "RxJS",
      "Java",
      "Spring Boot",
      "REST APIs",
      "Scrum",
      "Jira",
      "GitHub",
    ],
    bullets: [
      "Particip\u00e9 en el programa SL2000E para la gesti\u00f3n de la flota de sistemas del Ej\u00e9rcito del Aire.",
      "Desarroll\u00e9 interfaces din\u00e1micas con Angular, TypeScript, Bootstrap y RxJS conectadas a APIs REST.",
      "Colabor\u00e9 con equipos backend para recuperar, filtrar y validar datos operativos expuestos mediante servicios Java/Spring Boot.",
      "Coordin\u00e9 con equipos backend y funcionales dentro de un marco Scrum usando Jira y GitHub.",
      "Impuls\u00e9 mejoras de rendimiento y mantenibilidad durante la modernizaci\u00f3n del sistema.",
    ],
  },
  {
    position: "right",
    title: "Analista de Testing Automatizado y Soluciones Power Platform",
    company: "Fervimax Group (FCC)",
    project: "Digital Services / DevOps",
    location: "Madrid, Espa\u00f1a",
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
      "Responsable de la automatizaci\u00f3n de pruebas dentro del pipeline CI/CD usando Selenium, asegurando la calidad y estabilidad del software.",
      "Apoy\u00e9 la preparaci\u00f3n y validaci\u00f3n de datos para pruebas automatizadas.",
      "Desarroll\u00e9 soluciones con Power Apps, Power Automate y Power BI para optimizar procesos y potenciar la toma de decisiones basada en datos.",
      "Apoy\u00e9 al equipo de dise\u00f1o con prototipos en Figma para asegurar experiencias consistentes.",
    ],
  },
  {
    position: "left",
    title: "Desarrollador Full Stack",
    company: "Atos (Cestic)",
    project: "SEMADE - Ministerio de Defensa",
    location: "Madrid, Espa\u00f1a",
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
      "Desarroll\u00e9 funcionalidades backend con Java y Spring Boot, implementando APIs REST para gestionar y validar datos operativos de las Fuerzas Armadas.",
      "Us\u00e9 Oracle SQL para extraer, filtrar y validar informaci\u00f3n, soportando flujos de datos en la gesti\u00f3n de PCR.",
      "Transmisi\u00f3n peri\u00f3dica de datos al Ministerio de Sanidad para su validaci\u00f3n y consolidaci\u00f3n centralizada.",
      "Cre\u00e9 interfaces con Angular, Bootstrap y PrimeNG para experiencias de usuario intuitivas y atractivas.",
    ],
  },
  {
    position: "right",
    title: "Analista Funcional y de Datos & Scrum Master Assistant",
    company: "Atos (Cestic)",
    project: "SEMADE - Ministerio de Defensa",
    location: "Madrid, Espa\u00f1a",
    period: "Jul 2021 - Ago 2022",
    tech: [
      "SQL",
      "GitHub",
      "Git",
      "Jenkins",
      "Trello",
      "Postman",
      "Scrum",
      "Jira",
    ],
    bullets: [
      "Proyecto para el Ministerio de Defensa (MINISDEF) gestionando las PCR realizadas por las Fuerzas Armadas.",
      "Experiencia con SQL para automatizaci\u00f3n de procesos y flujos ETL sobre Oracle.",
      "Implementaci\u00f3n de pipelines en entornos Oracle, integrando validaciones SQL y transformaciones de datos automatizadas.",
      "Integraci\u00f3n continua con Jenkins y GitHub.",
      "SCRUM: planificaci\u00f3n, estimaci\u00f3n, seguimiento y mejora continua.",
    ],
  },
  {
    position: "left",
    title: "Desarrollador Full Stack",
    company: "Atos",
    project: "Soluciones IoT internas",
    location: "Madrid, Espa\u00f1a",
    period: "Mar 2021 - Jun 2021",
    tech: ["Angular", "Spring Boot", "Azure IoT", "Android", "Java"],
    bullets: [
      "Cre\u00e9 interfaces web responsivas con Angular para monitorear dispositivos IoT.",
      "Desarroll\u00e9 servicios REST con Spring Boot para orquestar la capa de negocio.",
      "Conect\u00e9 dispositivos mediante Azure IoT aportando telemetr\u00eda en tiempo real.",
      "Implement\u00e9 una app Android en Java para interactuar con la plataforma desde campo.",
    ],
  },
];
export const projects: Project[] = [
  {
    title: "Jardin Digital",
    featured: true,
    description:
      "Web artesana para registrar y acompa\u00f1ar la vida de las plantas. Incluye panel con KPIs, filtros din\u00e1micos, exportaci\u00f3n de fichas (JSON/TXT/CSV), tema claro/oscuro, sonido ambiente y hojas flotantes.",
    image: "/images/proyectos/jardinDigital/jardinDigitalFoto3.png",
    gallery: [
      "/images/proyectos/jardinDigital/jardinDigitalFoto3.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto0.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto1.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto2.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto4.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto5.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto6.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto7.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto8.png",
      "/images/proyectos/jardinDigital/jardinDigitalFoto9.png",
      "/images/proyectos/jardinDigital/jardindigitalFoto01.png",
    ],
    tech: ["Angular", "TypeScript", "Tailwind CSS", "LocalStorage", "JSON"],
    links: {
      demo: "https://alonsovine.github.io/jardin-digital/",
      code: "https://github.com/AlonsoVine/jardin-digital",
    },
  },
  {
    title: "Space Invaders",
    featured: true,
    description:
      "Reimaginaci\u00f3n del cl\u00e1sico arcade en JavaScript + HTML5 Canvas, jugable online. Incluye 6 modos (cl\u00e1sico, oleadas, supervivencia, contrarreloj y 2 jugadores cooperativo y competitivo), sistema de logros y recompensas, personalizaci\u00f3n de nave y bestiario de enemigos derrotados. Con tests (Vitest), linting y hooks de pre-commit.",
    image: "/images/proyectos/spaceInvaders/menu-seleccion-partida.png",
    gallery: [
      "/images/proyectos/spaceInvaders/menu-seleccion-partida.png",
      "/images/proyectos/spaceInvaders/gameplay-clasico.png",
      "/images/proyectos/spaceInvaders/menu-edicion-nave.png",
      "/images/proyectos/spaceInvaders/gameplay-oleadas.png",
      "/images/proyectos/spaceInvaders/menu-bestiario.png",
      "/images/proyectos/spaceInvaders/gameplay-2p-coop.png",
      "/images/proyectos/spaceInvaders/menu-resumen-partidas.png",
      "/images/proyectos/spaceInvaders/gameplay-contrareloj.png",
    ],
    tech: ["JavaScript", "HTML5 Canvas", "Vitest"],
    links: {
      demo: "https://alonsovine.github.io/spaceInvaders/",
      code: "https://github.com/AlonsoVine/spaceInvaders",
    },
  },
  {
    title: "ForYouToBe",
    description:
      "Herramienta en Python para descargar audio de YouTube en varios formatos (MP3, WAV, FLAC) a partir de URLs individuales o listas, con selecci\u00f3n de formato y carpeta destino.",
    image:
      "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_3.jpg",
    gallery: [
      "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_3.jpg",
      "/images/proyectos/forYouTobe/captura-codigo.png",
      "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_0.jpg",
      "/images/proyectos/forYouTobe/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_20.jpg",
      "/images/proyectos/forYouTobe/Leonardo_Anime_XL_An_electrifyingly_vibrant_speech_recognition_1.jpg",
    ],
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
    gallery: [
      "/images/proyectos/photoDateRenamer/fotografia-movil-versus-camara2.jpg",
      "/images/proyectos/photoDateRenamer/img_codigo_photoDateRenamer.png",
      "/images/proyectos/photoDateRenamer/img_codigo_photoDateRenamer2.png",
      "/images/proyectos/photoDateRenamer/captura-pantalla.png",
      "/images/proyectos/photoDateRenamer/fotografo.jpg",
      "/images/proyectos/photoDateRenamer/fotografa.png",
      "/images/proyectos/photoDateRenamer/photos2.jpg",
    ],
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
    gallery: [
      "/images/proyectos/jarvisVozAssistant/speech-recognition.jpg",
      "/images/proyectos/jarvisVozAssistant/javis-captura-codigo.png",
      "/images/proyectos/jarvisVozAssistant/speech-recognition-img2.png",
      "/images/proyectos/jarvisVozAssistant/Leonardo_Phoenix_An_electrifyingly_vibrant_speech_recognitiont_1.jpg",
      "/images/proyectos/jarvisVozAssistant/Leonardo_Anime_XL_An_electrifyingly_vibrant_speech_recognition_0.jpg",
      "/images/proyectos/jarvisVozAssistant/Leonardo_Anime_XL_An_electrifyingly_vibrant_speech_recognition_2.jpg",
      "/images/proyectos/jarvisVozAssistant/Leonardo_Anime_XL_An_electrifyingly_vibrant_speech_recognition_3.jpg",
      "/images/proyectos/jarvisVozAssistant/Leonardo_Phoenix_Una_electrizante_y_vibrante_imagen_con_temtic_22.jpg",
    ],
    tech: ["Python", "Speech Recognition"],
    links: {
      code: "https://github.com/AlonsoVine/jarvisVozAssistant",
    },
  },
];
export const education: Education[] = [
  {
    institution: "Universidad Tecnol\u00f3gica",
    title: "Inteligencia Artificial para Programadores",
    dates: "2025",
    details:
      "Curso universitario especializado de 200 horas enfocado en el uso pr\u00e1ctico de la IA en desarrollo de software. Incluye aprendizaje autom\u00e1tico, redes neuronales, NLP, visi\u00f3n artificial, big data, optimizaci\u00f3n de modelos y despliegue en producci\u00f3n, proporcionando una base s\u00f3lida y aplicada en IA moderna.",
    image:
      "/images/certificados/Certificado-Utamed-InteligenciaArtificialParaProgramadores_page-0001.jpg",
  },
  {
    institution: " Universitat Oberta de Catalunya",
    title: "Iniciaci\u00f3n a la Inteligencia Artificial",
    dates: "2025",
    details:
      "Certificado universitario de formaci\u00f3n continua en fundamentos de Inteligencia Artificial, con 24 cr\u00e9ditos ECTS y una dedicaci\u00f3n de 600 horas. Proporciona conocimientos esenciales sobre los principios de la IA, su contexto acad\u00e9mico y su aplicaci\u00f3n en entornos reales.",
    image: "/images/certificados/Certificado-UOC-Iniciacion-IA_page-0001.jpg",
  },
  {
    institution: "Universidad Nebrija",
    title: "Prompt Engineering",
    dates: "2025",
    details:
      "Curso universitario en Prompt Engineering orientado al dise\u00f1o, optimizaci\u00f3n e integraci\u00f3n de prompts avanzados para sistemas de IA generativa. Incluye fundamentos de IA, creaci\u00f3n de chatbots, mejora de interacci\u00f3n, aplicaci\u00f3n \u00e9tica y despliegue de soluciones basadas en ChatGPT en entornos web y aplicaciones.",
    image:
      "/images/certificados/Certificado-UniversidadNebrija-PromptEngineering.jpg",
  },
  {
    institution: "Neoland",
    title: "Bootcamp Full Stack Web \u00b7 Especializaci\u00f3n en Desarrollo con Agentes IA",
    dates: "2025",
    details:
      "Bootcamp intensivo de 360 horas en desarrollo web full stack (HTML5, CSS3, JavaScript, TypeScript, React y Node.js) con especializaci\u00f3n en construcci\u00f3n de aplicaciones potenciadas por agentes de IA y prompt engineering.",
    image: "/images/certificados/certificado_bootcamp_neoland_desarrolloWeb.jpg",
  },
  {
    institution: "AWS",
    title: "AWS Certified Cloud Practitioner",
    dates: "2024",
    details:
      "El certificado AWS Cloud Practitioner acredita conocimientos fundamentales sobre la nube, incluyendo los servicios principales de AWS, seguridad, modelos de precios y conceptos clave de facturaci\u00f3n.",
    image: "/images/certificados/Certificado AWS.png",
  },
  {
    institution: "EF SET",
    title: "EF SET English Certificate (C2 Proficient)",
    dates: "2024",
    details:
      "Certifica el nivel de ingl\u00e9s seg\u00fan el Marco Com\u00fan Europeo, evaluando habilidades de lectura y comprensi\u00f3n auditiva.",
    image: "/images/certificados/EF SET Certificate ingl\u00e9s_recortada.jpg",
  },
  {
    institution: "GitHub",
    title: "GitHub Foundations",
    dates: "2024",
    details:
      "Valida conocimientos de Git y GitHub para gesti\u00f3n de proyectos y colaboraci\u00f3n en repositorios.",
    image: "/images/certificados/GitHubFoundations_Badge20241008_page-0001.jpg",
  },
  {
    institution: "LPI",
    title: "LPI Linux Essentials",
    dates: "2024",
    details:
      "Acredita habilidades para manejar conceptos b\u00e1sicos de Linux, incluyendo su funcionamiento, l\u00ednea de comandos y gesti\u00f3n de archivos, fomentando una base s\u00f3lida en software de c\u00f3digo abierto.",
    image: "/images/certificados/Udemy_certificate_Linux_essentials.jpg",
  },
  {
    institution: "Microsoft Learn",
    title: "Crear y administrar aplicaciones de lienzo con Power Apps",
    dates: "2024",
    details:
      "Reconoce habilidades para dise\u00f1ar, construir y gesti\u00f3nar aplicaciones en Power Apps, integrando datos y creando soluciones personalizadas sin programaci\u00f3n avanzada.",
    image:
      "/images/certificados/Credencial - vinebarrancoalonso _ Microsoft Learn_Crea y administra aplicaciones de lienzo con Power Apps_page-0001.jpg",
  },
  {
    institution: "Udemy",
    title: "Scrum Master",
    dates: "2024",
    details:
      "Certifica habilidades para liderar equipos \u00e1giles, aplicando principios y pr\u00e1cticas de Scrum, facilitando reuniones clave, eliminando impedimentos y promoviendo la mejora continua en proyectos de desarrollo \u00e1gil.",
    image: "/images/certificados/Udemy_certificate_Scrum_master.jpg",
  },
  {
    institution: "Udemy",
    title: "Selenium 4",
    dates: "2024",
    details:
      "Habilidades para automatizar pruebas de software utilizando Selenium 4 con Java, cubriendo desde la instalaci\u00f3n y configuraci\u00f3n hasta la creaci\u00f3n de scripts de prueba avanzados, garantizando un desarrollo de software m\u00e1s eficiente y confiable.",
    image: "/images/certificados/Udemy_certificate_Selenium.jpg",
  },
];
