type Experience = {
  company: string;
  domain?: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  stack: string[];
  current?: boolean;
};

const experiences: Experience[] = [
  {
    company: "PLAYCARRY",
    domain: "Marketplace Platform",
    role: "Frontend Developer",
    period: "2025 — Present",
    description:
      "Building customer-facing marketplace interfaces and internal admin systems using React and TypeScript.",
    achievements: [
      "Developed scalable frontend features with API-driven architecture",
      "Improved maintainability through reusable UI patterns",
      "Collaborated with backend and product teams",
      "Worked on customer-facing and internal platform workflows",
    ],
    stack: ["React", "TypeScript", "API Integration", "Marketplace Platform"],
    current: true,
  },
  {
    company: "DREAMHOST",
    domain: "Hosting Platform",
    role: "Frontend Developer",
    period: "2024 — 2025",
    description:
      "Worked on internal dashboards and user-facing interfaces for a hosting platform environment.",
    achievements: [
      "Developed React components and frontend business logic",
      "Integrated frontend applications with backend APIs",
      "Improved internal dashboard workflows",
      "Collaborated within a distributed product team",
    ],
    stack: ["React", "TypeScript", "Redux", "REST API", "Dashboard Systems"],
  },
  {
    company: "ZAGROZA AGENCY",
    domain: "Client Web Applications",
    role: "Frontend Developer",
    period: "2022 — 2023",
    description: "Developed SEO-focused web applications using modern frontend technologies.",
    achievements: [
      "Built client-side applications with Next.js",
      "Integrated headless CMS solutions",
      "Focused on SEO and frontend performance optimization",
      "Developed responsive and reusable UI components",
    ],
    stack: ["Next.js", "React", "TypeScript", "Headless CMS", "SEO"],
  },
  {
    company: "EARLY PROJECTS / CONTRACT WORK",
    role: "Frontend Developer",
    period: "2020 — 2022",
    description: "Worked on multiple frontend projects using JavaScript, HTML, and CSS.",
    achievements: [
      "Developed responsive web interfaces",
      "Worked with legacy frontend frameworks",
      "Integrated APIs and frontend business logic",
      "Built foundational frontend engineering experience",
    ],
    stack: ["JavaScript", "HTML", "CSS", "API Integration"],
  },
];

function ExperienceItem({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  return (
    <li className="relative flex gap-5 sm:gap-7">
      {/* Timeline indicator column */}
      <div className="relative flex flex-col items-center pt-1.5">
        <div
          className={`relative z-10 size-2 shrink-0 rounded-full ${
            experience.current ? "bg-accent" : "bg-foreground/20"
          }`}
        >
          {experience.current && (
            <span className="bg-accent absolute inset-0 animate-ping rounded-full opacity-60" />
          )}
        </div>
        {!isLast && <div className="bg-foreground/10 mt-3 w-px flex-1" />}
      </div>

      {/* Content */}
      <article className="group w-full space-y-3.5 pb-10 last:pb-0">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-foreground text-xs font-medium tracking-widest">
                {experience.company}
              </h3>
              {experience.domain && (
                <span className="border-foreground/10 text-foreground/40 rounded-md border px-2 py-0.5 text-[10px]">
                  {experience.domain}
                </span>
              )}
            </div>
            <p className="text-foreground/65 text-xs">{experience.role}</p>
          </div>
          <time className="text-foreground/50 shrink-0 text-xs tabular-nums">
            {experience.period}
          </time>
        </div>

        {/* Description */}
        <p className="text-foreground/75 text-sm leading-7">{experience.description}</p>

        {/* Achievements */}
        <ul className="space-y-1.5">
          {experience.achievements.map((item) => (
            <li
              key={item}
              className="text-foreground/65 flex items-start gap-2.5 text-xs leading-relaxed"
            >
              <span className="bg-foreground/20 mt-1.75 size-1 shrink-0 rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {experience.stack.map((tech) => (
            <span
              key={tech}
              className="bg-foreground/4 text-foreground/60 group-hover:bg-foreground/6 group-hover:text-foreground/75 rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Professional Experience</h2>
        <p className="text-foreground/65 text-sm">
          Building frontend applications for marketplaces, product platforms, and modern web
          experiences.
        </p>
      </div>

      <ol className="space-y-4">
        {experiences.map((exp, i) => (
          <ExperienceItem
            key={exp.company}
            experience={exp}
            isLast={i === experiences.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}

export default Experience;
