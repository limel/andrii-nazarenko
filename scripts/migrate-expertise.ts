import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS expertise (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon_svg TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `);
  console.log("Table created");

  await sql`DELETE FROM expertise`;

  const cards = [
    {
      title: "Frontend Architecture",
      description:
        "Scalable component trees, state management patterns, and module boundaries for long-lived product applications.",
      icon_svg: `<path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />`,
    },
    {
      title: "Marketplace Platforms",
      description:
        "Multi-vendor listing flows, catalog systems, and transactional UIs for complex commerce products.",
      icon_svg: `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />`,
    },
    {
      title: "Performance Optimization",
      description:
        "Bundle reduction, Core Web Vitals tuning, and fast delivery through code splitting and caching strategies.",
      icon_svg: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />`,
    },
    {
      title: "Admin Dashboards",
      description:
        "Data-dense interfaces with real-time updates, advanced filtering, and role-based access patterns.",
      icon_svg: `<rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="11" width="7" height="9" rx="1" /><rect x="3" y="15" width="7" height="6" rx="1" />`,
    },
    {
      title: "API Integration",
      description:
        "REST and GraphQL connections with robust error handling, request deduplication, and optimistic UI updates.",
      icon_svg: `<path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />`,
    },
    {
      title: "Reusable UI Systems",
      description:
        "Design-system-aligned component libraries and token-based styling that scale across teams and products.",
      icon_svg: `<path d="M5 3a2 2 0 0 0-2 2" /><path d="M19 3a2 2 0 0 1 2 2" /><path d="M21 19a2 2 0 0 1-2 2" /><path d="M5 21a2 2 0 0 1-2-2" /><path d="M9 3h1" /><path d="M9 21h1" /><path d="M14 3h1" /><path d="M14 21h1" /><path d="M3 9v1" /><path d="M21 9v1" /><path d="M3 14v1" /><path d="M21 14v1" /><rect x="7" y="7" width="10" height="10" rx="1" />`,
    },
    {
      title: "SEO & SSR Applications",
      description:
        "Server-side rendering, metadata APIs, and structured data to maximize discoverability and page performance.",
      icon_svg: `<circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />`,
    },
    {
      title: "Analytics & A/B Testing",
      description:
        "Tracking pipelines, event schemas, and experimentation frameworks to drive data-informed product decisions.",
      icon_svg: `<line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />`,
    },
  ];

  for (let i = 0; i < cards.length; i++) {
    const { title, description, icon_svg } = cards[i];
    await sql`
      INSERT INTO expertise (title, description, icon_svg, sort_order)
      VALUES (${title}, ${description}, ${icon_svg}, ${i + 1})
    `;
  }

  console.log("Expertise seeded");
}

main().catch(console.error);
