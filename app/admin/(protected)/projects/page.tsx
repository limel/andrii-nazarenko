import { sql } from "@/lib/db";
import { createProject, updateProject, deleteProject } from "@/app/actions/resume";
import { AdminSection, Field, ArrayField, DeleteButton } from "@components/ui/";

export default async function ProjectsPage() {
  const rows = await sql`SELECT * FROM projects ORDER BY sort_order, id`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Projects</h1>

      <div className="space-y-4">
        {rows.map((proj) => (
          <AdminSection key={proj.id} title={proj.name}>
            <form
              action={async (fd) => {
                "use server";
                await updateProject(proj.id, fd);
              }}
              className="space-y-3"
            >
              <Field name="name" label="Name" defaultValue={proj.name} required />
              <Field
                name="description"
                label="Description"
                defaultValue={proj.description}
                textarea
                required
              />
              <ArrayField
                name="responsibilities"
                label="Responsibilities (one per line)"
                defaultValue={proj.responsibilities}
              />
              <ArrayField name="stack" label="Stack (one per line)" defaultValue={proj.stack} />
              <ArrayField name="tags" label="Tags (one per line)" defaultValue={proj.tags} />
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
                    await deleteProject(proj.id);
                  }}
                />
              </div>
            </form>
          </AdminSection>
        ))}
      </div>

      <AdminSection title="Add New Project">
        <form action={createProject} className="space-y-3">
          <Field name="name" label="Name" required />
          <Field name="description" label="Description" textarea required />
          <ArrayField name="responsibilities" label="Responsibilities (one per line)" />
          <ArrayField name="stack" label="Stack (one per line)" />
          <ArrayField name="tags" label="Tags (one per line)" />
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
