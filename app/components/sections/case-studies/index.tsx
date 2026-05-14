type CaseStudy = {
  title: string;
  problem: string;
  solution: string;
  responsibilities: string[];
  result: string;
  stack: string[];
  tags: string[];
};

const caseStudies: CaseStudy[] = [
  {
    title: "Scalable Funnel Architecture",
    problem:
      "Multiple independent funnel applications created duplicated logic, inconsistent tracking integrations, and difficult maintenance workflows.",
    solution:
      "Designed reusable frontend patterns and centralized UI logic to improve maintainability and scalability across funnel systems.",
    responsibilities: [
      "Built reusable step-based funnel components",
      "Improved frontend architecture consistency",
      "Integrated analytics and tracking systems",
      "Worked with A/B testing and experiment-driven flows",
    ],
    result:
      "Improved scalability and maintainability for multiple product funnel applications.",
    stack: ["React", "TypeScript", "Analytics", "A/B Testing", "REST API"],
    tags: ["Architecture", "Funnels", "Analytics", "Reusable UI", "Scalability"],
  },
  {
    title: "Marketplace Frontend Experience",
    problem:
      "Marketplace workflows required scalable frontend interfaces for customer-facing flows and internal platform management.",
    solution:
      "Developed reusable frontend systems and API-driven UI architecture focused on maintainability and long-term platform growth.",
    responsibilities: [
      "Built customer-facing marketplace interfaces",
      "Integrated backend business workflows",
      "Improved reusable component architecture",
      "Collaborated with product and backend teams",
    ],
    result: "Improved frontend maintainability and platform consistency.",
    stack: ["React", "TypeScript", "REST API", "Marketplace Systems"],
    tags: ["Marketplace", "Frontend Systems", "API Integration", "Product Development"],
  },
  {
    title: "SEO & Performance Optimization",
    problem:
      "Content-driven applications required improved SEO structure, frontend performance, and scalable rendering approaches.",
    solution:
      "Implemented Next.js-based frontend architecture with reusable components and SEO-focused rendering strategies.",
    responsibilities: [
      "Worked with SSR and SEO optimization",
      "Integrated headless CMS solutions",
      "Improved frontend performance and rendering",
      "Developed responsive reusable UI systems",
    ],
    result:
      "Created scalable SEO-focused frontend experiences for modern web applications.",
    stack: ["Next.js", "React", "TypeScript", "Headless CMS"],
    tags: ["SEO", "SSR", "Performance", "Next.js", "CMS"],
  },
];

function StructuredLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
      {children}
    </span>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group space-y-5 rounded-xl border border-foreground/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/2 sm:p-6">
      {/* Title */}
      <h3 className="text-base font-medium tracking-tight">{study.title}</h3>

      {/* Problem / Solution */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <StructuredLabel>Problem</StructuredLabel>
          <p className="text-xs leading-relaxed text-foreground/65">{study.problem}</p>
        </div>
        <div>
          <StructuredLabel>Solution</StructuredLabel>
          <p className="text-xs leading-relaxed text-foreground/70">{study.solution}</p>
        </div>
      </div>

      {/* Responsibilities */}
      <div>
        <StructuredLabel>Responsibilities</StructuredLabel>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {study.responsibilities.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/60"
            >
              <span className="mt-1.75 size-1 shrink-0 rounded-full bg-foreground/20" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="rounded-lg border border-foreground/8 bg-foreground/[0.025] px-4 py-3 transition-colors duration-300 group-hover:border-foreground/12 group-hover:bg-foreground/[0.035]">
        <StructuredLabel>Result</StructuredLabel>
        <p className="text-xs leading-relaxed text-foreground/75">{study.result}</p>
      </div>

      {/* Footer: stack + tags */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-foreground/4 px-2 py-0.5 font-mono text-[10px] text-foreground/60 transition-colors duration-300 group-hover:bg-foreground/7 group-hover:text-foreground/75"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
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

function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Case Studies</h2>
        <p className="text-sm text-foreground/65">
          Selected engineering challenges focused on scalability, maintainability, and
          product-oriented frontend architecture.
        </p>
      </div>

      <div className="space-y-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.title} study={study} />
        ))}
      </div>
    </section>
  );
}

export default CaseStudies;
