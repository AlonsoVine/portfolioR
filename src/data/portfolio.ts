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
  title: "Texto do hero pendiente",
  subtitle: "El copy final se integrará en una fase posterior.",
  ctas: {
    primary: { label: "CTA Principal", href: "#projects" },
    secondary: { label: "CTA Secundaria", href: "#contact" },
  },
};

export const aboutContent = {
  textBlocks: [
    "Este espacio está reservado para una narrativa profesional detallada.",
    "Se prioriza la estructura visual y la animación; el texto definitivo se añadirá más adelante.",
  ],
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
  { label: "GitHub", href: "https://www.github.com", icon: "github" },
  { label: "Twitter", href: "https://www.twitter.com", icon: "twitter" },
];

export const skills: Skill[] = [
  { label: "React / Next.js", category: "frontend", icon: "mouse-pointer" },
  { label: "TypeScript", category: "frontend", icon: "braces", variant: "primary" },
  { label: "Node.js", category: "backend", icon: "server" },
  { label: "GraphQL", category: "backend", icon: "terminal" },
  { label: "Design Systems", category: "other", icon: "sparkles" },
  { label: "Figma", category: "tools", icon: "figma" },
  { label: "Automations", category: "tools", icon: "cpu" },
  { label: "Mentoring", category: "other", icon: "message-circle" },
];

export const experiences: Experience[] = [
  {
    position: "left",
    title: "Rol premium por definir",
    company: "Empresa futura",
    period: "2022 — Actualidad",
    bullets: [
      "Lugar reservado para logros cuantificables.",
      "Detalle técnico pendiente de confirmación.",
    ],
  },
  {
    position: "right",
    title: "Rol anterior destacado",
    company: "Otra empresa",
    period: "2019 — 2022",
    bullets: [
      "Descripción estratégica pendiente de contenido.",
      "Detalle adicional alineado a futuro storytelling.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Proyecto insignia",
    description: "Placeholder para resumen del proyecto y propuesta de valor.",
    image: "/images/profile-placeholder.svg",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    links: {
      demo: "#",
      code: "#",
    },
  },
  {
    title: "Exploración visual",
    description: "Sección destinada a un case study orientado a diseño.",
    image: "/images/profile-placeholder.svg",
    tech: ["React", "Vite", "Motion"],
    links: {
      demo: "#",
      code: "#",
    },
  },
];

export const education: Education[] = [
  {
    institution: "Institución principal",
    title: "Programa avanzado a definir",
    dates: "2015 — 2019",
    details: "Espacio para logros académicos relevantes.",
  },
  {
    institution: "Bootcamp o certificación",
    title: "Especialización técnica",
    dates: "2020",
    details: "Texto final pendiente.",
  },
];

