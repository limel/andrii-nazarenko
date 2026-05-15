import { sql } from "@/lib/db";
import { updateAbout } from "@/app/actions/resume";
import { AdminSection, ArrayField } from "@components/ui/";

export default async function AboutPage() {
  const [about] = await sql`SELECT * FROM about WHERE id = 1`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">About</h1>

      <AdminSection title="About Paragraphs">
        <form action={updateAbout} className="space-y-3">
          <ArrayField
            name="paragraphs"
            label="Paragraphs (one per line — each line becomes a paragraph)"
            defaultValue={about.paragraphs}
          />
          <button
            type="submit"
            className="bg-foreground text-background rounded-lg px-4 py-1.5 text-sm transition-opacity hover:opacity-75"
          >
            Save
          </button>
        </form>
      </AdminSection>
    </div>
  );
}
