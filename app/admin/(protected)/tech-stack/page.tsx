import { sql } from "@/lib/db";
import { createTechCategory, updateTechCategory, deleteTechCategory } from "@/app/actions/resume";
import { AdminSection, Field, ArrayField, DeleteButton } from "@components/ui/";

export default async function TechStackPage() {
  const rows = await sql`SELECT * FROM tech_categories ORDER BY sort_order, id`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Tech Stack</h1>

      <div className="space-y-4">
        {rows.map((cat) => (
          <AdminSection key={cat.id} title={cat.name}>
            <form
              action={async (fd) => {
                "use server";
                await updateTechCategory(cat.id, fd);
              }}
              className="space-y-3"
            >
              <Field name="name" label="Category Name" defaultValue={cat.name} required />
              <ArrayField
                name="technologies"
                label="Technologies (one per line)"
                defaultValue={cat.technologies}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-foreground text-background rounded-lg px-4 py-1.5 text-sm transition-opacity hover:opacity-75"
                >
                  Save
                </button>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteTechCategory(cat.id);
                  }}
                />
              </div>
            </form>
          </AdminSection>
        ))}
      </div>

      <AdminSection title="Add New Category">
        <form action={createTechCategory} className="space-y-3">
          <Field name="name" label="Category Name" required />
          <ArrayField name="technologies" label="Technologies (one per line)" />
          <button
            type="submit"
            className="bg-foreground text-background rounded-lg px-4 py-1.5 text-sm transition-opacity hover:opacity-75"
          >
            Add
          </button>
        </form>
      </AdminSection>
    </div>
  );
}
