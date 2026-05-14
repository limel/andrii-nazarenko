import { sql } from "@/lib/db";
import { CaseStudyCard, CaseStudy } from "./card";

export default async function CaseStudies() {
  const caseStudies = (await sql`
    SELECT * FROM case_studies ORDER BY sort_order, id
  `) as CaseStudy[];

  return (
    <section id="case-studies" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Case Studies</h2>
        <p className="text-foreground/85 text-sm">
          Selected engineering challenges focused on scalability, maintainability, and
          product-oriented frontend architecture.
        </p>
      </div>

      <div className="space-y-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
