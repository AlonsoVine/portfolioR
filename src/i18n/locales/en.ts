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

const stripAccents = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "");
const MONTHS_EN: Record<string, string> = { Ene: "Jan", Abr: "Apr", Ago: "Aug", Dic: "Dec", Actual: "Present" };

export const en = {
  lang: "en",
  nav: {
    links: navLinks.map((item) => {
      const map: Record<string, string> = {
        "#hero": "Home",
        "#skills": "Toolkit",
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
    title: heroContent.title,
    role: "Full Stack Developer · DevOps & AI",
    location: "Madrid, Spain",
    availability: "Available for new opportunities",
    subtitle:
      "I believe in simple software, explainable decisions and deliveries that don't break trust.",
    ctas: {
      ...heroContent.ctas,
      primary: { ...heroContent.ctas.primary, label: "View projects" },
      secondary: {
        ...heroContent.ctas.secondary,
        label: "Download CV",
        href: "/assets/cv/Alonso Viñé CV_English.pdf",
      },
      tertiary: { ...heroContent.ctas.tertiary, label: "Write to me" },
    },
  },
  about: {
    ...aboutContent,
    eyebrow: "Profile",
    pullQuote: "I like things to work, and I like knowing why they work even more.",
    title: "Multidisciplinary by choice",
    description:
      "Full stack development and DevOps since 2021, always in Madrid.",
    textBlocks: [
      "I started in 2021 at Atos, on Spanish Ministry of Defence projects. Then Fervimax (FCC) sharpening DevOps and testing, and Inetum modernizing critical interfaces for the Air Force. Now at Seres, automating the deployment cycle of the central platform.",
      "Multidisciplinary profile with experience across the full software development lifecycle: analysis, design, implementation, deployment and maintenance. I handle the modern web stack (Angular, React, Java/Spring, Node) alongside the DevOps layer that automates the cycle (GitLab CI/CD, Nexus, Maven, Docker) and a fresh layer of AI-agent-assisted development to accelerate repetitive work and focus energy where it matters.",
      "Madrid-based, English C2 and permanent curiosity. When I'm not writing code I play retro classics (yes, I wrote my own Space Invaders) or explore the latest in AI.",
    ],
    highlights: aboutContent.highlights.map((item) => {
      if (item.title === "Madrid, España") {
        return {
          ...item,
          title: "Madrid, Spain",
          description:
            "Remote-first. Open to hybrid or on-site in Madrid.",
        };
      }
      if (item.title === "Inglés C2") {
        return {
          ...item,
          title: "English C2",
          description:
            "EF SET Proficient. Comfortable in international, English-speaking teams.",
        };
      }
      if (item.title === "Foco en IA") {
        return {
          ...item,
          title: "AI focus",
          description:
            "Neoland bootcamp, AI agents and prompt engineering in my daily work.",
        };
      }
      return item;
    }),
    cta: {
      ...aboutContent.cta,
      label: "Write to me",
    },
  },
  skills: {
    eyebrow: "Toolkit",
    title: "Stack and tools",
    description: "Languages, frameworks, platforms and tools, grouped by area.",
    cards: skillCards.map((card) => ({
      ...card,
      title:
        card.title === "Lenguajes y programación"
          ? "Languages & Programming"
          : card.title === "Frameworks y librerías"
          ? "Frameworks & Libraries"
          : card.title === "Cloud y DevOps"
          ? "Cloud & DevOps"
          : card.title === "Bases de datos"
          ? "Databases"
          : card.title === "Herramientas y plataformas"
          ? "Tools & Platforms"
          : card.title === "IA aplicada al desarrollo"
          ? "AI-assisted development"
          : card.title === "Certificaciones"
          ? "Certifications"
          : card.title,
    })),
  },
  experienceHeading: {
    eyebrow: "Experience",
    title: "Career",
    description: "From the current role back to the first. All based in Madrid.",
  },
  experiences: experiences.map((exp) => ({
    ...exp,
    title:
      stripAccents(exp.title) === "Ingeniero Informatico"
        ? "Software Engineer"
        : exp.title === "Analista de Testing Automatizado y Soluciones Power Platform"
        ? "Automated Testing Analyst & Power Platform Solutions Developer"
        : exp.title === "Desarrollador Full Stack"
        ? "Full Stack Developer"
        : exp.title === "Analista Funcional y de Datos & Scrum Master Assistant"
        ? "Functional and Data Analyst & Scrum Master Assistant"
        : exp.title,
    period: exp.period.replace(/\b(Ene|Abr|Ago|Dic|Actual)\b/g, (m) => MONTHS_EN[m] ?? m),
    location: exp.location,
    company: exp.company,
    project:
      exp.project === "Aplicación central de Seres"
        ? "Seres core application"
        : exp.project,
    bullets: exp.bullets.map((bullet) => {
      // Preserve proper nouns by only translating common phrases
      const map: Record<string, string> = {
        "Lidero la modernización del ciclo de despliegue de proyectos Java distribuidos por cliente, sustituyendo el flujo manual actual por pipelines reproducibles en GitLab CI/CD.":
          "Leading the modernization of the deployment cycle for per-client Java projects, replacing the current manual flow with reproducible pipelines in GitLab CI/CD.",
        "Diseño e implemento pipelines de build, test y release con GitLab CI integrados con Nexus como repositorio de artefactos Maven.":
          "Designing and implementing build, test and release pipelines with GitLab CI, integrated with Nexus as the Maven artifact repository.",
        "Estandarizo el versionado y la publicación de artefactos para una cartera amplia de proyectos cliente, reduciendo errores y tiempos de release.":
          "Standardizing versioning and artifact publishing across a wide portfolio of client projects, reducing release errors and lead time.",
        "Establezco prácticas de release seguras (semver, rollback, trazabilidad) y documento los pipelines para que el resto del equipo pueda mantenerlos.":
          "Establishing safe release practices (semver, rollback, traceability) and documenting pipelines so the team can maintain them.",
        "Colaboro con los equipos de desarrollo Java para integrar gates de calidad (linting, tests, cobertura con SonarQube) en el pipeline.":
          "Collaborating with Java development teams to integrate quality gates (linting, tests, SonarQube coverage) into the pipeline.",
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
        "Desarrollé funcionalidades backend con Java y Spring Boot, implementando APIs REST para gestionar y validar datos operativos de las Fuerzas Armadas.":
          "Developed backend functionalities with Java and Spring Boot, implementing REST APIs to manage and validate operational data for the Armed Forces.",
        "Creé interfaces con Angular, Bootstrap y PrimeNG para experiencias de usuario intuitivas y atractivas.":
          "Built interfaces with Angular, Bootstrap and PrimeNG to create intuitive and visually appealing user experiences.",
      };
      const byKey = new Map(Object.entries(map).map(([es, en]) => [stripAccents(es), en]));
      return byKey.get(stripAccents(bullet)) ?? bullet;
    }),
  })),
  projects: {
    eyebrow: "Projects",
    title: "Personal projects",
    description:
      "Six projects picked from the more than {projects} I keep on GitHub. Open source and, where there is one, a live demo.",
    codeLabel: "Code",
    demoLabel: "View demo",
    moreLabel: "The rest of my projects on GitHub",
    featuredLabel: "Featured",
    galleryLabel: "Screenshots",
    videoLabel: "Video",
    mediaToggleLabel: "Liberty media view",
    logoAlt: "Project logo",
    videoAlt: "Liberty product demo video",
    items: projects.map((p) => ({
      ...p,
      title: p.title,
      demoLinkLabel:
        p.title === "Liberty" ||
        p.title === "Jardín Digital" ||
        p.title === "PhotoDateRenamer"
          ? "View website"
          : undefined,
      tech:
        p.title === "Liberty"
          ? [
              "Desktop app",
              "100% local",
              "Wealth management",
              "Investment returns (IRR)",
              "Excel/CSV import",
              "No cloud",
              "No accounts",
              "No telemetry",
            ]
          : p.title === "PhotoDateRenamer"
          ? ["Browser", "EXIF metadata", "Local processing", "Batch renaming"]
          : p.tech,
      description:
        p.title === "Liberty"
          ? "Desktop app for managing household wealth: bring accounts, investments, property and debt together, and track income, spending and performance over time. Private by design: runs locally, with no accounts or servers."
          : p.title === "Jardín Digital"
          ? "Handcrafted web app to record and accompany the life of plants. Includes KPI dashboard, dynamic search/filters, export to JSON/TXT/CSV, light/dark theme, ambient sound and floating leaves."
          : p.title === "ForYouToBe"
          ? "Python tool to download YouTube audio in multiple formats (MP3, WAV, FLAC) from single URLs or lists, with format and destination folder selection."
          : p.title === "PhotoDateRenamer"
          ? "Renames photos using EXIF capture dates, falling back to file dates when needed. Available as a web app and portable Windows app; photos stay on your device and are never sent to external services."
          : p.title === "Jarvis Asistente de Voz"
          ? "Python voice assistant capable of executing voice commands: open apps, web search, weather, reminders, and email, among others."
          : p.title === "Space Invaders"
          ? "A reimagining of the arcade classic in JavaScript + HTML5 Canvas, playable online. Six game modes (classic, waves, survival, time-attack, plus 2-player co-op and versus), an achievement and reward system, ship customization, and a bestiary of defeated enemies. Backed by tests (Vitest), linting and pre-commit hooks."
          : p.description,
    })),
  },
  education: {
    eyebrow: "Education",
    title: "Education and certifications",
    description: "University courses, a bootcamp and certifications. Each entry opens its certificate.",
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
        title = "Full Stack Web Bootcamp · Specialization in AI-Agent Development";
        details =
          "360-hour intensive bootcamp in full stack web development (HTML5, CSS3, JavaScript, TypeScript, React, Node.js) with a specialization in building applications powered by AI agents and prompt engineering.";
      } else if (index === 4) {
        details =
          "AWS Cloud Practitioner certificate validating fundamental cloud knowledge, including core AWS services, security, pricing models and key billing concepts.";
      } else if (index === 5) {
        details =
          "Certifies English level according to the CEFR framework, assessing reading and listening comprehension.";
      } else if (index === 6) {
        details =
          "Validates knowledge of Git and GitHub for project management and repository collaboration.";
      } else if (index === 7) {
        details =
          "Certifies skills to manage basic Linux concepts: system operation, command line, file management, providing a solid base in open-source software.";
      } else if (index === 8) {
        details =
          "Recognizes skills to design, build and manage apps in Power Apps, integrating data and creating personalized solutions without advanced programming.";
      } else if (index === 9) {
        details =
          "Certifies skills to lead agile teams applying Scrum principles and practices, facilitating key meetings, removing impediments and promoting continuous improvement.";
      } else if (index === 10) {
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
    title: "Write to me",
    description:
      "Job offers, projects or a technical question. Use the form or write straight to my inbox.",
    form: {
      title: "Form",
      helper: "All fields are required. I reply by email.",
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "your@email.com" },
      message: { label: "Message", placeholder: "Context and timing, if any" },
      submit: "Send message",
    },
    platforms: {
      title: "Elsewhere",
      subtitle: "Professional profile, code and email.",
    },
    availability: {
      title: "Available for collaboration",
      description:
        "Open to new roles and projects. Remote-first; hybrid or on-site in Madrid.",
    },
  },
  ui: {
    present: "now",
    stage: "Stage",
    hero: {
      now: "Now",
      trajectory: "Companies",
      contact: "Contact",
    },
    sectionNav: "Section index",
    socialProfile: "{name} profile",
    projectCounter: "Project",
    copyEmail: "Copy email",
    copyLinkShort: "Link",
    emailCopied: "Email copied",
    madridTime: "Time in Madrid",
    languageCurrent: "Language",
    languageSwitch: "switch to Spanish",
    carousel: {
      zoom: "Enlarge image {n} of {total}",
      prev: "Previous image",
      next: "Next image",
      goTo: "Go to image {n} of {total}",
      zoomed: "enlarged view",
      close: "Close enlarged view",
    },
    scrollTop: "Back to top",
    a11y: {
      skipToContent: "Skip to main content",
      mainNav: "Main navigation",
      footerNav: "Footer navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      logoAlt: "Personal logo",
      aboutPhotoAlt: "Alonso Viñé, developer and analyst",
      toDark: "Switch to dark mode",
      toLight: "Switch to light mode",
      copyLink: "Copy link to this section",
      linkCopied: "Link copied",
      close: "Close",
    },
    locale: "en-GB",
    contactCta: "Write to me",
    menu: "Menu",
    notFound: {
      title: "Page not found",
      body: "This address does not exist, or no longer does. The portfolio is still on the home page.",
      back: "Back to home",
    },
    cursor: { zoom: "Zoom", open: "Open" },
    print: {
      label: "Print or save as PDF",
      hint: "A4 version generated from this very page",
    },
    theme: { light: "Light", dark: "Dark" },
    build: { label: "Build", audit: "Audit on PageSpeed" },
    palette: {
      label: "Command palette",
      open: "Commands",
      placeholder: "Type a section or an action",
      empty: "Nothing matches “{q}”.",
      footer: "↑ ↓ move · ↵ run · esc close",
      groups: { nav: "Go to", actions: "Actions", links: "Links" },
      actions: {
        theme: "Switch to {mode} mode",
        lang: "Cambiar a español",
        copyEmail: "Copy the email address",
        cv: "Download the CV as PDF",
        print: "Print or save as PDF",
        terminal: "Open the terminal",
        retro: "Toggle retro mode",
        top: "Back to the top",
      },
      done: { copied: "Email copied to the clipboard", failed: "Could not copy; the email is {email}" },
    },
    terminal: {
      eyebrow: "Console",
      title: "The CV, in a terminal",
      description: "Everything above, queryable with commands. Type help to start, or press Ctrl K (⌘K on a Mac) anywhere.",
      window: "alonso@portfolio: ~",
      inputLabel: "Terminal command",
      hint: "Try: whoami · ls · git log · stack · projects · contact",
      notFound: "command not found: {cmd}. Type help.",
      denied: "Permission denied: this portfolio is read-only.",
      exit: "Nowhere to exit to: this is the web. Try cd contact.",
      moved: "→ {section}",
      noSection: "No such section. Options: {list}",
      downloading: "Downloading {file}…",
      themeSet: "Theme: {mode}",
      langSet: "Language: Español",
      retro: "Retro mode toggled. Esc to leave.",
      help: [
        ["help", "this help"],
        ["whoami", "who I am"],
        ["now", "current role"],
        ["ls", "what the portfolio holds"],
        ["cd <section>", "jump to a section"],
        ["git log", "career as a history"],
        ["stack [area]", "technologies by area"],
        ["projects", "personal projects and links"],
        ["education", "courses and certifications"],
        ["contact", "email and profiles"],
        ["cv", "download the CV"],
        ["theme · lang · retro", "preferences"],
        ["clear", "clear the screen"],
      ],
    },
    pipeline: {
      title: "How this site ships",
      description: "GitHub Actions, on every commit to main that starts with deploy:. The stages are the real workflow's.",
      steps: ["checkout", "setup node 20", "npm ci", "next build", "upload artifact", "deploy pages"],
      status: { queued: "queued", running: "running", done: "done" },
      replay: "Replay",
    },
    colophon:
      "Set in Instrument Serif, Schibsted Grotesk and IBM Plex Mono. Static site exported with Next.js.",
    experience: {
      tech: "Technologies",
      current: "Ongoing",
      project: "Project",
    },
    education: {
      certificate: "Certificate",
      view: "View certificate",
    },
    retro: {
      on: "RETRO MODE ON",
      off: "RETRO MODE OFF",
      hint: "Press Esc or konami again to toggle",
      close: "Close retro mode",
    },
    form: {
      intents: {
        job: "Job offer",
        freelance: "Freelance / Project",
        networking: "Networking",
        technical: "Technical question",
        other: "Other",
      },
      intentLabel: "What's this about?",
      intentPlaceholder: "Pick a topic",
      responseTime: "I usually reply within 24h",
      topic: "Topic",
      sending: "Sending...",
      successTitle: "Got it · message received.",
      successBefore: "I'll reply within 24 hours. In the meantime, check out my ",
      successProjects: "projects",
      successMiddle: " or my ",
      successExperience: "experience",
      sendAnother: "Send another message",
      linkedinDesc: "Professional profile",
      githubDesc: "Projects and code",
      errors: {
        intent: "Pick a topic for your message.",
        nameRequired: "Name is required.",
        min: "Must be at least {n} characters.",
        max: "Can't exceed {n} characters.",
        emailRequired: "Email is required.",
        emailLong: "Email is too long.",
        emailInvalid: "Please enter a valid email.",
        messageRequired: "Message is required.",
        tooFast: "Please take a moment to fill out the form.",
        fix: "Please fix the errors above.",
        wait: "Please wait {n}s before sending another message.",
        keys: "Missing EmailJS keys",
        failed: "Something went wrong. Please try later.",
      },
    },
  },
  socialLinks,
};
