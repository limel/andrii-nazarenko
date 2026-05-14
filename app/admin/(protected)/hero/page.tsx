import { sql } from "@/lib/db";
import { updateHero } from "@/app/actions/resume";
import { AdminSection, Field } from "@components/ui/";

export default async function HeroPage() {
  const [hero] = await sql`SELECT * FROM hero WHERE id = 1`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Hero</h1>

      <AdminSection title="Hero Content">
        <form action={updateHero} className="space-y-3">
          <Field name="name" label="Name" defaultValue={hero.name} required />
          <Field name="badge" label="Badge label" defaultValue={hero.badge} required />
          <Field name="role" label="Role / subtitle" defaultValue={hero.role} required />
          <Field
            name="description"
            label="Description"
            defaultValue={hero.description}
            textarea
            required
          />
          <Field name="cv_url" label="CV file URL" defaultValue={hero.cv_url} required />
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
