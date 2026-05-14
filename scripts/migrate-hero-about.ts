import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS hero (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      badge TEXT NOT NULL,
      description TEXT NOT NULL,
      cv_url TEXT NOT NULL DEFAULT '/Andrii-Nazarenko-CV.pdf'
    )
  `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      paragraphs TEXT[] NOT NULL DEFAULT '{}'
    )
  `);

  console.log("Tables created");

  await sql`
    INSERT INTO hero (id, name, role, badge, description, cv_url)
    VALUES (
      1,
      'Andrii Nazarenko',
      'Frontend Engineer — React / Next.js / TypeScript',
      'Product-Oriented Frontend Development',
      'Building scalable product-oriented applications with focus on maintainable architecture, performance optimization, and modern user experiences.',
      '/Andrii-Nazarenko-CV.pdf'
    )
    ON CONFLICT (id) DO NOTHING
  `;

  await sql`
    INSERT INTO about (id, paragraphs)
    VALUES (
      1,
      ARRAY[
        'Frontend Engineer with 6 years of experience building product-oriented web applications, marketplaces, admin dashboards, and customer-facing platforms.',
        'Specialized in React, Next.js, and TypeScript development with focus on scalable frontend architecture, maintainable UI systems, API integrations, and performance optimization.',
        'Experienced in SaaS platforms, e-commerce products, growth funnels, and modern frontend workflows within product and distributed teams.'
      ]
    )
    ON CONFLICT (id) DO NOTHING
  `;

  console.log("Seeded hero and about");
}

main().catch(console.error);
