import { sql } from "@/lib/db";
import { updateAbout } from "@/app/actions/resume";
import { AdminSection, ArrayField } from "@components/ui/";

export default async function AboutPage() {
  const [about] = await sql`SELECT * FROM about WHERE id = 1` as any[];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">About</h1>

      <AdminSection title="About Paragraphs">
        <form action={updateAbout} className="space-y-3">
          <ArrayField
            name="paragraphs"
            label="Paragraphs (one per line — each line becomes a paragraph)"
            defaultValue={about.paragraphs}
            rows={8}
          />
          <button
            type="submit"
            className="rounded-lg bg-foreground px-4 py-1.5 text-sm text-background hover:opacity-75 transition-opacity"
          >
            Save
          </button>
        </form>
      </AdminSection>
    </div>
  );
}
