import { StructuredLabel } from "@components/ui/";

export interface CaseStudy {
  id: number;
  title: string;
  problem: string;
  solution: string;
  responsibilities: string[];
  result: string;
  stack: string[];
  tags: string[];
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group border-foreground/10 hover:border-foreground/20 hover:bg-foreground/2 space-y-5 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-6">
      <h3 className="text-base font-medium tracking-tight">{study.title}</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <StructuredLabel>Problem</StructuredLabel>
          <p className="text-foreground/85 text-xs leading-relaxed">{study.problem}</p>
        </div>
        <div>
          <StructuredLabel>Solution</StructuredLabel>
          <p className="text-foreground/85 text-xs leading-relaxed">{study.solution}</p>
        </div>
      </div>

      <div>
        <StructuredLabel>Responsibilities</StructuredLabel>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {study.responsibilities.map((item) => (
            <li
              key={item}
              className="text-foreground/85 flex items-start gap-2.5 text-xs leading-relaxed"
            >
              <span className="bg-foreground/20 mt-1.75 size-1 shrink-0 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-foreground/8 bg-foreground/2.5 group-hover:border-foreground/12 group-hover:bg-foreground/3.5 rounded-lg border px-4 py-3 transition-colors duration-300">
        <StructuredLabel>Result</StructuredLabel>
        <p className="text-foreground/85 text-xs leading-relaxed">{study.result}</p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="bg-foreground/4 text-foreground/85 group-hover:bg-foreground/7 group-hover:text-foreground/85 rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="border-foreground/8 text-foreground/50 group-hover:border-foreground/15 group-hover:text-foreground/85 rounded-md border px-2 py-0.5 text-[10px] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
