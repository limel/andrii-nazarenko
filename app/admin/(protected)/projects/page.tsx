import { sql } from "@/lib/db";
import { createProject, updateProject, deleteProject, moveProject } from "@/app/actions/resume";
import { AdminSection, Field, ArrayField, DeleteButton } from "@components/ui/";
import Image from "next/image";

export default async function ProjectsPage() {
  const rows = await sql`SELECT * FROM projects ORDER BY sort_order, id`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Projects</h1>

      <div className="space-y-4">
        {rows.map((proj, i) => (
          <div key={proj.id} className="space-y-2">
            <AdminSection title={proj.name}>
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
                <Field name="url" label="URL" defaultValue={proj.url ?? ""} />
                <ArrayField
                  name="responsibilities"
                  label="Responsibilities (one per line)"
                  defaultValue={proj.responsibilities}
                />
                <ArrayField name="stack" label="Stack (one per line)" defaultValue={proj.stack} />
                <ArrayField name="tags" label="Tags (one per line)" defaultValue={proj.tags} />
                <div className="space-y-1">
                  <label className="text-foreground/60 text-xs">Image</label>
                  {proj.image_url && (
                    <div className="mb-1">
                      <Image
                        src={proj.image_url}
                        alt={proj.name}
                        width={160}
                        height={90}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="text-foreground/70 text-sm"
                  />
                </div>
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
            <div className="flex gap-2 px-1">
              <form action={async () => { "use server"; await moveProject(proj.id, "up"); }}>
                <button
                  type="submit"
                  disabled={i === 0}
                  className="rounded-lg border border-foreground/15 px-3 py-1 text-sm transition-opacity hover:opacity-75 disabled:opacity-25"
                >
                  ↑
                </button>
              </form>
              <form action={async () => { "use server"; await moveProject(proj.id, "down"); }}>
                <button
                  type="submit"
                  disabled={i === rows.length - 1}
                  className="rounded-lg border border-foreground/15 px-3 py-1 text-sm transition-opacity hover:opacity-75 disabled:opacity-25"
                >
                  ↓
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <AdminSection title="Add New Project">
        <form action={createProject} className="space-y-3">
          <Field name="name" label="Name" required />
          <Field name="description" label="Description" textarea required />
          <Field name="url" label="URL" />
          <ArrayField name="responsibilities" label="Responsibilities (one per line)" />
          <ArrayField name="stack" label="Stack (one per line)" />
          <ArrayField name="tags" label="Tags (one per line)" />
          <div className="space-y-1">
            <label className="text-foreground/60 text-xs">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="text-foreground/70 text-sm"
            />
          </div>
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
