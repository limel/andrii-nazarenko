import { sql } from "@/lib/db";

type About = {
  paragraphs: string[];
};

export default async function About() {
  const [about] = (await sql`SELECT * FROM about WHERE id = 1`) as About[];

  return (
    <section id="about" className="mx-auto w-full space-y-4 py-6 text-center sm:text-left md:py-8">
      <h2 className="text-xl font-medium sm:text-2xl md:text-3xl">About</h2>

      <div className="space-y-3">
        {about.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-foreground/75 text-sm leading-7 whitespace-pre-wrap sm:text-base sm:leading-8"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
