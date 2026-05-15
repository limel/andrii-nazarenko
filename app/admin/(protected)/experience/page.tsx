import { sql } from "@/lib/db";
import { createExperience, updateExperience, deleteExperience, moveExperience } from "@/app/actions/resume";
import { AdminSection, Field, ArrayField, DeleteButton } from "@components/ui/";

export default async function ExperiencePage() {
  const rows = await sql`SELECT * FROM experiences ORDER BY sort_order, id`;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Experience</h1>
      </div>

      {/* Existing entries */}
      <div className="space-y-4">
        {rows.map((exp, i) => (
          <div key={exp.id} className="space-y-2">
            <AdminSection title={exp.company}>
              <form
                action={async (fd) => {
                  "use server";
                  await updateExperience(exp.id, fd);
                }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field name="company" label="Company" defaultValue={exp.company} required />
                  <Field name="domain" label="Domain" defaultValue={exp.domain ?? ""} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field name="role" label="Role" defaultValue={exp.role} required />
                  <Field name="period" label="Period" defaultValue={exp.period} required />
                </div>
                <Field
                  name="description"
                  label="Description"
                  defaultValue={exp.description}
                  textarea
                  required
                />
                <ArrayField
                  name="achievements"
                  label="Achievements (one per line)"
                  defaultValue={exp.achievements}
                />
                <ArrayField name="stack" label="Stack (one per line)" defaultValue={exp.stack} />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="is_current" defaultChecked={exp.is_current} />
                  Current position
                </label>
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
                      await deleteExperience(exp.id);
                    }}
                  />
                </div>
              </form>
            </AdminSection>
            <div className="flex gap-2 px-1">
              <form action={async () => { "use server"; await moveExperience(exp.id, "up"); }}>
                <button
                  type="submit"
                  disabled={i === 0}
                  className="rounded-lg border border-foreground/15 px-3 py-1 text-sm transition-opacity hover:opacity-75 disabled:opacity-25"
                >
                  ↑
                </button>
              </form>
              <form action={async () => { "use server"; await moveExperience(exp.id, "down"); }}>
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

      {/* Add new */}
      <AdminSection title="Add New Experience">
        <form action={createExperience} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field name="company" label="Company" required />
            <Field name="domain" label="Domain" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field name="role" label="Role" required />
            <Field name="period" label="Period" required />
          </div>
          <Field name="description" label="Description" textarea required />
          <ArrayField name="achievements" label="Achievements (one per line)" />
          <ArrayField name="stack" label="Stack (one per line)" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_current" />
            Current position
          </label>
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
