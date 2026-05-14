import { sql } from "@/lib/db";

export default async function AdminPage() {
  const [expCount, projCount, caseCount, techCount] = await Promise.all([
    sql`SELECT COUNT(*) FROM experiences`,
    sql`SELECT COUNT(*) FROM projects`,
    sql`SELECT COUNT(*) FROM case_studies`,
    sql`SELECT COUNT(*) FROM tech_categories`,
  ]);

  const sections = [
    { label: "Experience", href: "/admin/experience", count: Number(expCount[0].count) },
    { label: "Projects", href: "/admin/projects", count: Number(projCount[0].count) },
    { label: "Case Studies", href: "/admin/case-studies", count: Number(caseCount[0].count) },
    { label: "Tech Stack", href: "/admin/tech-stack", count: Number(techCount[0].count) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sections.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="rounded-xl border border-foreground/10 p-5 hover:border-foreground/20 hover:bg-foreground/2 transition-all"
          >
            <p className="text-2xl font-medium">{s.count}</p>
            <p className="text-sm text-foreground/60 mt-1">{s.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
