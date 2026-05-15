import { sql } from "@/lib/db";
import Image from "next/image";

type Project = {
  id: number;
  name: string;
  description: string;
  responsibilities: string[];
  stack: string[];
  tags: string[];
  url: string | null;
  image_url: string | null;
  impact: string | null;
};

function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className="group border-foreground/10 hover:border-foreground/20 hover:bg-foreground/2 flex flex-col gap-5 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base leading-snug font-medium tracking-tight">{project.name}</h3>
          {project.url && (
            <span className="text-foreground/20 group-hover:text-foreground/60 mt-0.5 shrink-0 transition-colors duration-300">
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
          )}
        </div>
        <p className="text-foreground/85 text-xs leading-relaxed">{project.description}</p>
      </div>

      {/* Image */}
      {project.image_url && (
        <div className="overflow-hidden rounded-lg">
          <Image
            src={project.image_url}
            alt={project.name}
            width={600}
            height={340}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <span className="">Responsibilities</span>
      {/* Responsibilities */}
      <ul className="space-y-1.5">
        {project.responsibilities.map((item, i) => (
          <li
            key={i}
            className="text-foreground/85 flex items-start gap-2.5 text-xs leading-relaxed"
          >
            <span className="bg-foreground/20 mt-1.75 size-1 shrink-0 rounded-full" />
            {item}
          </li>
        ))}
      </ul>
      <span className="">Impact</span>
      {project.impact && (
        <ul className="space-y-1.5">
          {project.impact
            .split("\n")
            .filter(Boolean)
            .map((line, i) => (
              <li
                key={i}
                className="text-foreground/85 flex items-start gap-2.5 text-xs leading-relaxed"
              >
                <span className="bg-foreground/20 mt-1.75 size-1 shrink-0 rounded-full" />
                {line}
              </li>
            ))}
        </ul>
      )}

      <div className="mt-auto space-y-3">
        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="bg-foreground/4 text-foreground/85 group-hover:bg-foreground/7 group-hover:text-foreground/85 rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="border-foreground/8 text-foreground/50 group-hover:border-foreground/15 group-hover:text-foreground/65 rounded-md border px-2 py-0.5 text-[10px] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }

  return card;
}

export default async function Projects() {
  const projects = (await sql`
    SELECT * FROM projects ORDER BY sort_order, id
  `) as Project[];

  return (
    <section id="projects" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Projects</h2>
        <p className="text-foreground/65 text-sm">
          Selected frontend projects focused on scalable architecture, product development, and
          modern user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
