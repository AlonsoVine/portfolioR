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

export const en = {
  lang: "en",
  nav: {
    links: navLinks.map((item) => {
      const map: Record<string, string> = {
        "#hero": "Home",
        "#skills": "Skills",
        "#about": "About",
        "#experience": "Experience",
        "#projects": "Projects",
        "#education": "Education",
        "#contact": "Contact",
      };
      return { ...item, label: map[item.href] ?? item.label };
    }),
  },
  hero: {
    ...heroContent,
    eyebrow: "Welcome to my portfolio",
    title: heroContent.title,
    role: "Developer and Analyst",
    subtitle:
      "Passionate about technology. I specialize in crafting tailored applications that combine functionality and design to boost efficiency and performance.",
    ctas: {
      ...heroContent.ctas,
      primary: { ...heroContent.ctas.primary, label: "View Projects" },
      secondary: { ...heroContent.ctas.secondary, label: "Download CV" },
    },
  },
  about: {
    ...aboutContent,
    eyebrow: "About",
    title: "Get to know me",
    description:
      "Passionate about technology and always looking for new opportunities to grow professionally.",
    textBlocks: [
      "Nice to meet you!",
      "I'm an enthusiast of emerging technologies, always motivated.",
      "Excited about what the world of software development has in store for me.",
    ],
    highlights: aboutContent.highlights.map((item) => {
      if (item.title === "Desarrollo Frontend") {
        return {
          ...item,
          title: "Frontend Development",
          description:
            "Specialized in Angular and TypeScript with a focus on modern, clean interfaces.",
        };
      }
      if (item.title === "Desarrollo Backend") {
        return {
          ...item,
          title: "Backend Development",
          description:
            "Focused on Java/Spring Boot and NestJS, building robust APIs. Experienced in SQL and ETL tasks.",
        };
      }
      if (item.title === "Aprendizaje Continuo") {
        return {
          ...item,
          title: "Continuous Learning",
          description:
            "Always exploring new technologies and improving my skills.",
        };
      }
      return item;
    }),
  },
  skills: {
    eyebrow: "Stack",
    title: "Tech Stack",
    description: "Key skills and essential tools I use daily.",
    cards: skillCards.map((card) => ({
      ...card,
      title:
        card.title === "Lenguajes y Programacion"
          ? "Languages & Programming"
          : card.title === "Frameworks y Librerias"
          ? "Frameworks & Libraries"
          : card.title === "Cloud y DevOps"
          ? "Cloud & DevOps"
          : card.title === "Bases de Datos"
          ? "Databases"
          : card.title === "Herramientas y Plataformas"
          ? "Tools & Platforms"
          : card.title === "Certificaciones"
          ? "Certifications"
          : card.title,
    })),
  },
  experienceHeading: {
    eyebrow: "Experience",
    title: "Professional timeline",
    description: "A chronological overview of my work experience.",
  },
  experiences: experiences.map((exp) => ({
    ...exp,
    title:
      exp.title === "Ingeniero Informatico"
        ? "Software Engineer"
        : exp.title === "Analista de Testing Automatizado y Soluciones Power Platform"
        ? "Automated Testing Analyst & Power Platform Solutions Developer"
        : exp.title === "Desarrollador Full Stack"
        ? "Full Stack Developer"
        : exp.title === "Analista Funcional y de Datos & Scrum Master Assistant"
        ? "Functional and Data Analyst & Scrum Master Assistant"
        : exp.title,
    period: exp.period,
    location: exp.location,
    company: exp.company,
    project: exp.project,
    bullets: exp.bullets.map((bullet) => {
      // Preserve proper nouns by only translating common phrases
      const map: Record<string, string> = {
        "Participe en el programa SL2000E para la gestion de la flota de sistemas del Ejercito del Aire.":
          "Participated in the SL2000E program to manage the fleet systems of the Air Force.",
        "Desarrolle interfaces dinamicas con Angular, TypeScript, Bootstrap y RxJS conectadas a APIs REST.":
          "Developed dynamic interfaces with Angular, TypeScript, Bootstrap and RxJS connected to REST APIs.",
        "Colabore con equipos backend para recuperar, filtrar y validar datos operativos expuestos mediante servicios Java/Spring Boot.":
          "Collaborated with backend teams to retrieve, filter, and validate operational data exposed through Java/Spring Boot services.",
        "Coordine con equipos backend y funcionales dentro de un marco Scrum usando Jira y GitHub.":
          "Coordinated with backend and functional teams within a Scrum framework using Jira and GitHub.",
        "Impulse mejoras de rendimiento y mantenibilidad durante la modernizacion del sistema.":
          "Drove performance and maintainability improvements during system modernization.",
        "Integre suites de pruebas automaticas con Selenium dentro del pipeline CI/CD del area DevOps.":
          "Integrated automated test suites with Selenium inside the CI/CD pipeline of the DevOps area.",
        "Responsable de la automatizacion de pruebas dentro del pipeline CI/CD usando Selenium, asegurando la calidad y estabilidad del software.":
          "Responsible for test automation within the CI/CD pipeline using Selenium, ensuring software quality and stability.",
        "Apoye la preparacion y validacion de datos para pruebas automatizadas.":
          "Supported data preparation and validation for automated testing.",
        "Desarrolle soluciones con Power Apps, Power Automate y Power BI para optimizar procesos y potenciar la toma de decisiones basada en datos.":
          "Developed solutions with Power Apps, Power Automate, and Power BI to streamline processes and enhance data-driven decision-making.",
        "Apoye al equipo de diseno con prototipos en Figma para asegurar experiencias consistentes.":
          "Supported the design team with Figma prototypes to ensure consistent experiences.",
        "Lidere el desarrollo frontend de portales corporativos usando Angular, PrimeNG y Bootstrap.":
          "Built interfaces with Angular, Bootstrap and PrimeNG to create intuitive and visually appealing user experiences.",
        "Implemente microservicios en Java y Spring Boot respaldados por Oracle SQL.":
          "Developed backend functionalities with Java and Spring Boot, implementing REST APIs to manage and validate operational data for the Armed Forces.",
        "Use Oracle SQL para extraer, filtrar y validar informacion, soportando flujos de datos en la gestion de PCR.":
          "Used Oracle SQL to extract, filter and validate information, supporting data-driven flows in PCR management.",
        "Transmision periodica de datos al Ministerio de Sanidad para su validacion y consolidacion centralizada.":
          "Periodic data transmission to the Ministry of Health for centralized validation and consolidation.",
        "Coordine discovery y analisis funcional para iniciativas corporativas de SEMADE.":
          "Project for the Ministry of Defence (MINISDEF) managing PCR tests performed by the Armed Forces.",
        "Experiencia con SQL para automatizacion de procesos y flujos ETL sobre Oracle.":
          "Experience with SQL for process automation and ETL workflows on Oracle.",
        "Implementacion de pipelines en entornos Oracle, integrando validaciones SQL y transformaciones de datos automatizadas.":
          "Implemented pipelines in Oracle environments, integrating SQL validations and automated data transformations.",
        "Integracion continua con Jenkins y GitHub.":
          "Continuous integration with Jenkins and GitHub.",
        "SCRUM: planificacion, estimacion, seguimiento y mejora continua.":
          "SCRUM: planning, estimation, tracking and continuous improvement.",
        "Proyecto para el Ministerio de Defensa (MINISDEF) gestionando las PCR realizadas por las Fuerzas Armadas.":
          "Project for the Ministry of Defence (MINISDEF) managing the PCR tests performed by the Armed Forces.",
        "Cree interfaces web responsivas con Angular para monitorear dispositivos IoT.":
          "Built responsive web interfaces with Angular to monitor IoT devices.",
        "Desarrolle servicios REST con Spring Boot para orquestar la capa de negocio.":
          "Developed REST services with Spring Boot to orchestrate the business layer.",
        "Conecte dispositivos mediante Azure IoT aportando telemetria en tiempo real.":
          "Connected devices via Azure IoT providing real-time telemetry.",
        "Implemente una app Android en Java para interactuar con la plataforma desde campo.":
          "Implemented an Android app in Java to interact with the platform from the field.",
      };
      return map[bullet] ?? bullet;
    }),
  })),
  projects: {
    eyebrow: "Work",
    title: "Highlighted projects",
    description: "A sample of what I build.",
    codeLabel: "Code",
    demoLabel: "View Demo",
    featuredLabel: "Featured",
    items: projects.map((p) => ({
      ...p,
      title: p.title,
      description:
        p.title === "Jardin Digital"
          ? "Handcrafted web app to record and accompany the life of plants. Includes KPI dashboard, dynamic search/filters, export to JSON/TXT/CSV, light/dark theme, ambient sound and floating leaves."
          : p.title === "ForYouToBe"
          ? "Python tool to download YouTube audio in multiple formats (MP3, WAV, FLAC) from single URLs or lists, with format and destination folder selection."
          : p.title === "PhotoDateRenamer"
          ? "Python app that renames photos using EXIF metadata (taken date) following YYYY_MM_DD_originalName.ext to keep chronological order."
          : p.title === "Jarvis Asistente de Voz"
          ? "Python voice assistant capable of executing voice commands: open apps, web search, weather, reminders, and email, among others."
          : p.title === "Space Invaders"
          ? "Python implementation of the classic Space Invaders: ship control, shooting enemies, and managing waves before they reach the base."
          : p.description,
    })),
  },
  education: {
    eyebrow: "Education",
    title: "Education & Certifications",
    description: "My most relevant education and certifications.",
    items: education.map((item, index) => {
      let title = item.title;
      let details = item.details;

      if (index === 0) {
        title = "Artificial Intelligence for Developers";
        details =
          "Specialized 200-hour university course focused on the practical use of AI in software development. Includes machine learning, neural networks, NLP, computer vision, big data, model optimization and production deployment, providing a solid applied foundation in modern AI.";
      } else if (index === 1) {
        title = "Introduction to Artificial Intelligence";
        details =
          "Continuing education certificate in Artificial Intelligence fundamentals, with 24 ECTS credits and 600 hours. Provides essential knowledge about AI principles, its academic context and application in real environments.";
      } else if (index === 2) {
        details =
          "University course in Prompt Engineering focused on designing, optimizing and integrating advanced prompts for generative AI systems. Covers AI fundamentals, chatbot creation, interaction improvements, ethical application and deployment of ChatGPT-based solutions in web and app environments.";
      } else if (index === 3) {
        details =
          "AWS Cloud Practitioner certificate validating fundamental cloud knowledge, including core AWS services, security, pricing models and key billing concepts.";
      } else if (index === 4) {
        details =
          "Certifies English level according to the CEFR framework, assessing reading and listening comprehension.";
      } else if (index === 5) {
        details =
          "Validates knowledge of Git and GitHub for project management and repository collaboration.";
      } else if (index === 6) {
        details =
          "Certifies skills to manage basic Linux concepts: system operation, command line, file management, providing a solid base in open-source software.";
      } else if (index === 7) {
        details =
          "Recognizes skills to design, build and manage apps in Power Apps, integrating data and creating personalized solutions without advanced programming.";
      } else if (index === 8) {
        details =
          "Certifies skills to lead agile teams applying Scrum principles and practices, facilitating key meetings, removing impediments and promoting continuous improvement.";
      } else if (index === 9) {
        details =
          "Skills to automate software testing with Selenium 4 and Java, from setup to advanced test scripts, ensuring efficient and reliable development.";
      }

      return {
        ...item,
        title,
        details,
      };
    }),
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    description:
      "I'm open to new opportunities and collaborations. Feel free to reach out.",
    form: {
      title: "Send me a message",
      helper: "Fill out the form and I'll get back to you as soon as possible.",
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "your@email.com" },
      message: { label: "Message", placeholder: "Write your message here..." },
      submit: "Send message",
    },
    platforms: {
      title: "Connect with me",
      subtitle: "Find me on these platforms.",
    },
    availability: {
      title: "Available for collaboration",
      description:
        "I'm currently looking for new opportunities and interesting collaborations. If you have a project in mind, let's talk.",
    },
  },
  footer: {
    tagline: "Developer and Analyst",
    madeWith: "Made with ♥ by Alonso Viñé",
    rights: (year: number) => `© ${year} All rights reserved.`,
    builtWith: "Built with React, Tailwind CSS, and plenty of coffee ☕",
  },
  socialLinks,
};
