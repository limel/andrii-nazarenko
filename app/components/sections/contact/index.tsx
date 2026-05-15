import { sql } from "@/lib/db";

type Contact = {
  email: string | null;
  github: string | null;
  linkedin: string | null;
  telegram: string | null;
  twitter: string | null;
};

const links: { key: keyof Contact; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "telegram", label: "Telegram" },
  { key: "twitter", label: "Twitter" },
];

export default async function Contact() {
  const [contact] = (await sql`SELECT * FROM contact WHERE id = 1`) as Contact[];

  const visible = links.filter(({ key }) => contact?.[key]);
  if (!visible.length) return null;

  return (
    <section id="contact" className="mx-auto w-full space-y-6 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Contact</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {visible.map(({ key, label }) => (
          <a
            key={key}
            href={key === "email" ? `mailto:${contact[key]}` : contact[key]!}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noopener noreferrer"}
            className="border-foreground/10 hover:border-foreground/25 hover:bg-foreground/3 text-foreground/70 hover:text-foreground flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all duration-200"
          >
            {key === "email" ? contact[key] : label}
            <span className="text-foreground/30">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
