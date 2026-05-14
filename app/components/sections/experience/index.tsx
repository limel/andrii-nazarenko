import { sql } from "@/lib/db";
import { ExperienceItem, Experience as ExperienceType } from "./item";

export default async function Experience() {
  const experiences = (await sql`
    SELECT * FROM experiences ORDER BY sort_order, id
  `) as ExperienceType[];

  return (
    <section id="experience" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Professional Experience</h2>
        <p className="text-foreground/85 text-sm">
          Building frontend applications for marketplaces, product platforms, and modern web
          experiences.
        </p>
      </div>

      <ol className="space-y-4">
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.id} experience={exp} isLast={i === experiences.length - 1} />
        ))}
      </ol>
    </section>
  );
}
