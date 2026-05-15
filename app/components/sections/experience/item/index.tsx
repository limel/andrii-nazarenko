export interface Experience {
  id: number;
  company: string;
  domain: string | null;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  stack: string[];
  is_current: boolean;
}

export function ExperienceItem({
  experience,
  isLast,
}: {
  experience: Experience;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-5 sm:gap-7">
      {/* Timeline indicator column */}
      <div className="relative flex flex-col items-center pt-1.5">
        <div
          className={`relative z-10 size-2 shrink-0 rounded-full ${
            experience.is_current ? "bg-accent" : "bg-foreground/20"
          }`}
        >
          {experience.is_current && (
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
                <span className="border-foreground/10 text-foreground/60 rounded-md border px-2 py-0.5 text-[10px]">
                  {experience.domain}
                </span>
              )}
            </div>
            <p className="text-foreground/85 text-xs">{experience.role}</p>
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
              className="text-foreground/85 flex items-start gap-2.5 text-xs leading-relaxed"
            >
              <span className="bg-foreground/20 mt-1.75 size-1 shrink-0 rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {experience.stack.map((tech, i) => (
            <span
              key={tech + i}
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
