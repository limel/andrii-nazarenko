import { sql } from "@/lib/db";

type TechCategory = {
  id: number;
  name: string;
  technologies: string[];
};

function TechCategoryCard({ category }: { category: TechCategory }) {
  return (
    <div className="group flex flex-col gap-3.5 rounded-xl border border-foreground/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/2">
      <span className="font-mono text-[9px] tracking-widest text-foreground/45 uppercase">
        {category.name}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {category.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-foreground/4 px-2 py-0.5 text-xs text-foreground/70 transition-colors duration-300 group-hover:bg-foreground/7 group-hover:text-foreground/85"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function TechStack() {
  const categories = (await sql`
    SELECT * FROM tech_categories ORDER BY sort_order, id
  `) as TechCategory[];

  return (
    <section id="tech-stack" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Tech Stack</h2>
        <p className="text-sm text-foreground/85">
          Technologies and tools used for building scalable, modern frontend applications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <TechCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
