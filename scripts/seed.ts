import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join } from "path";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  // Create tables
  const schema = readFileSync(join(process.cwd(), "lib/db/schema.sql"), "utf-8");
  for (const statement of schema.split(";").filter((s) => s.trim())) {
    await sql.query(statement);
  }
  console.log("Tables created");

  // Seed experiences
  await sql`DELETE FROM experiences`;
  await sql`
    INSERT INTO experiences (company, domain, role, period, description, achievements, stack, is_current, sort_order)
    VALUES
    ('PLAYCARRY', 'Marketplace Platform', 'Frontend Developer', '2025 — Present',
     'Building customer-facing marketplace interfaces and internal admin systems using React and TypeScript.',
     ARRAY['Developed scalable frontend features with API-driven architecture','Improved maintainability through reusable UI patterns','Collaborated with backend and product teams','Worked on customer-facing and internal platform workflows'],
     ARRAY['React','TypeScript','API Integration','Marketplace Platform'],
     true, 1),
    ('DREAMHOST', 'Hosting Platform', 'Frontend Developer', '2024 — 2025',
     'Worked on internal dashboards and user-facing interfaces for a hosting platform environment.',
     ARRAY['Developed React components and frontend business logic','Integrated frontend applications with backend APIs','Improved internal dashboard workflows','Collaborated within a distributed product team'],
     ARRAY['React','TypeScript','Redux','REST API','Dashboard Systems'],
     false, 2),
    ('ZAGROZA AGENCY', 'Client Web Applications', 'Frontend Developer', '2022 — 2023',
     'Developed SEO-focused web applications using modern frontend technologies.',
     ARRAY['Built client-side applications with Next.js','Integrated headless CMS solutions','Focused on SEO and frontend performance optimization','Developed responsive and reusable UI components'],
     ARRAY['Next.js','React','TypeScript','Headless CMS','SEO'],
     false, 3),
    ('EARLY PROJECTS / CONTRACT WORK', NULL, 'Frontend Developer', '2020 — 2022',
     'Worked on multiple frontend projects using JavaScript, HTML, and CSS.',
     ARRAY['Developed responsive web interfaces','Worked with legacy frontend frameworks','Integrated APIs and frontend business logic','Built foundational frontend engineering experience'],
     ARRAY['JavaScript','HTML','CSS','API Integration'],
     false, 4)
  `;
  console.log("Experiences seeded");

  // Seed projects
  await sql`DELETE FROM projects`;
  await sql`
    INSERT INTO projects (name, description, responsibilities, stack, tags, sort_order)
    VALUES
    ('Growth Funnel Platform',
     'Scalable frontend architecture for multiple marketing funnels with reusable UI systems, analytics integrations, and API-driven business logic.',
     ARRAY['Developed reusable funnel components and step-based flows','Integrated analytics and tracking systems','Worked with A/B testing and experiment-driven UI logic','Improved maintainability across multiple funnel applications'],
     ARRAY['React','TypeScript','Analytics','A/B Testing','REST API'],
     ARRAY['Reusable UI','Product Funnels','Analytics','Performance','Experimentation'],
     1),
    ('Marketplace Platform',
     'Customer-facing marketplace application with scalable frontend architecture and internal admin functionality.',
     ARRAY['Developed marketplace UI using React and TypeScript','Integrated API-driven business workflows','Improved component maintainability and scalability','Collaborated with backend and product teams'],
     ARRAY['React','TypeScript','REST API','Marketplace Platform'],
     ARRAY['Marketplace','API Integration','Frontend Architecture','Reusable Components'],
     2),
    ('Admin Dashboard System',
     'Internal dashboard interfaces for operational and product management workflows.',
     ARRAY['Built dashboard components and frontend business logic','Integrated backend APIs and state management','Improved internal user experience and maintainability','Worked within distributed product teams'],
     ARRAY['React','Redux','TypeScript','Dashboard Systems'],
     ARRAY['Admin Dashboard','State Management','Internal Tools','Product Systems'],
     3),
    ('SEO-Focused Web Platform',
     'Modern Next.js application with headless CMS integration, focused on SEO optimization and scalable content delivery.',
     ARRAY['Developed SEO-friendly frontend architecture','Integrated headless CMS solutions','Built reusable and responsive UI components','Optimized frontend performance'],
     ARRAY['Next.js','React','TypeScript','Headless CMS','SEO'],
     ARRAY['Next.js','SSR','SEO','CMS Integration'],
     4)
  `;
  console.log("Projects seeded");

  // Seed case studies
  await sql`DELETE FROM case_studies`;
  await sql`
    INSERT INTO case_studies (title, problem, solution, responsibilities, result, stack, tags, sort_order)
    VALUES
    ('Scalable Funnel Architecture',
     'Multiple independent funnel applications created duplicated logic, inconsistent tracking integrations, and difficult maintenance workflows.',
     'Designed reusable frontend patterns and centralized UI logic to improve maintainability and scalability across funnel systems.',
     ARRAY['Built reusable step-based funnel components','Improved frontend architecture consistency','Integrated analytics and tracking systems','Worked with A/B testing and experiment-driven flows'],
     'Improved scalability and maintainability for multiple product funnel applications.',
     ARRAY['React','TypeScript','Analytics','A/B Testing','REST API'],
     ARRAY['Architecture','Funnels','Analytics','Reusable UI','Scalability'],
     1),
    ('Marketplace Frontend Experience',
     'Marketplace workflows required scalable frontend interfaces for customer-facing flows and internal platform management.',
     'Developed reusable frontend systems and API-driven UI architecture focused on maintainability and long-term platform growth.',
     ARRAY['Built customer-facing marketplace interfaces','Integrated backend business workflows','Improved reusable component architecture','Collaborated with product and backend teams'],
     'Improved frontend maintainability and platform consistency.',
     ARRAY['React','TypeScript','REST API','Marketplace Systems'],
     ARRAY['Marketplace','Frontend Systems','API Integration','Product Development'],
     2),
    ('SEO & Performance Optimization',
     'Content-driven applications required improved SEO structure, frontend performance, and scalable rendering approaches.',
     'Implemented Next.js-based frontend architecture with reusable components and SEO-focused rendering strategies.',
     ARRAY['Worked with SSR and SEO optimization','Integrated headless CMS solutions','Improved frontend performance and rendering','Developed responsive reusable UI systems'],
     'Created scalable SEO-focused frontend experiences for modern web applications.',
     ARRAY['Next.js','React','TypeScript','Headless CMS'],
     ARRAY['SEO','SSR','Performance','Next.js','CMS'],
     3)
  `;
  console.log("Case studies seeded");

  // Seed tech stack
  await sql`DELETE FROM tech_categories`;
  await sql`
    INSERT INTO tech_categories (name, technologies, sort_order)
    VALUES
    ('Frontend', ARRAY['React','Next.js','TypeScript','JavaScript','HTML5','CSS3'], 1),
    ('State Management', ARRAY['Redux Toolkit','Context API'], 2),
    ('UI & Styling', ARRAY['Tailwind CSS','MUI','Responsive Design','Reusable UI Components'], 3),
    ('Architecture', ARRAY['SSR','API-driven Architecture','Component-based Architecture','Frontend Scalability'], 4),
    ('Integrations', ARRAY['REST API','GraphQL','Analytics','A/B Testing','Headless CMS'], 5),
    ('Tooling', ARRAY['Webpack','Vite','Git','npm','yarn'], 6)
  `;
  console.log("Tech stack seeded");

  console.log("Done!");
}

main().catch(console.error);
