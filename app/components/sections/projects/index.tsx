type Project = {
  name: string;
  description: string;
  responsibilities: string[];
  stack: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    name: "Growth Funnel Platform",
    description:
      "Scalable frontend architecture for multiple marketing funnels with reusable UI systems, analytics integrations, and API-driven business logic.",
    responsibilities: [
      "Developed reusable funnel components and step-based flows",
      "Integrated analytics and tracking systems",
      "Worked with A/B testing and experiment-driven UI logic",
      "Improved maintainability across multiple funnel applications",
    ],
    stack: ["React", "TypeScript", "Analytics", "A/B Testing", "REST API"],
    tags: ["Reusable UI", "Product Funnels", "Analytics", "Performance", "Experimentation"],
  },
  {
    name: "Marketplace Platform",
    description:
      "Customer-facing marketplace application with scalable frontend architecture and internal admin functionality.",
    responsibilities: [
      "Developed marketplace UI using React and TypeScript",
      "Integrated API-driven business workflows",
      "Improved component maintainability and scalability",
      "Collaborated with backend and product teams",
    ],
    stack: ["React", "TypeScript", "REST API", "Marketplace Platform"],
    tags: ["Marketplace", "API Integration", "Frontend Architecture", "Reusable Components"],
  },
  {
    name: "Admin Dashboard System",
    description:
      "Internal dashboard interfaces for operational and product management workflows.",
    responsibilities: [
      "Built dashboard components and frontend business logic",
      "Integrated backend APIs and state management",
      "Improved internal user experience and maintainability",
      "Worked within distributed product teams",
    ],
    stack: ["React", "Redux", "TypeScript", "Dashboard Systems"],
    tags: ["Admin Dashboard", "State Management", "Internal Tools", "Product Systems"],
  },
  {
    name: "SEO-Focused Web Platform",
    description:
      "Modern Next.js application with headless CMS integration, focused on SEO optimization and scalable content delivery.",
    responsibilities: [
      "Developed SEO-friendly frontend architecture",
      "Integrated headless CMS solutions",
      "Built reusable and responsive UI components",
      "Optimized frontend performance",
    ],
    stack: ["Next.js", "React", "TypeScript", "Headless CMS", "SEO"],
    tags: ["Next.js", "SSR", "SEO", "CMS Integration"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col gap-5 rounded-xl border border-foreground/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/2">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium tracking-tight leading-snug">{project.name}</h3>
          <span className="mt-0.5 shrink-0 text-foreground/20 transition-colors duration-300 group-hover:text-foreground/40">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
        <p className="text-xs leading-relaxed text-foreground/65">{project.description}</p>
      </div>

      {/* Responsibilities */}
      <ul className="space-y-1.5">
        {project.responsibilities.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/60">
            <span className="mt-1.75 size-1 shrink-0 rounded-full bg-foreground/20" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-3">
        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-foreground/4 px-2 py-0.5 font-mono text-[10px] text-foreground/60 transition-colors duration-300 group-hover:bg-foreground/7 group-hover:text-foreground/75"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-foreground/8 px-2 py-0.5 text-[10px] text-foreground/50 transition-colors duration-300 group-hover:border-foreground/15 group-hover:text-foreground/65"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Featured Projects</h2>
        <p className="text-sm text-foreground/65">
          Selected frontend projects focused on scalable architecture, product development, and
          modern user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
