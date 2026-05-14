import { sql } from "@/lib/db";
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from "@/app/actions/resume";
import { AdminSection, Field, ArrayField, DeleteButton } from "@components/ui/";

export default async function CaseStudiesPage() {
  const rows = await sql`SELECT * FROM case_studies ORDER BY sort_order, id`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Case Studies</h1>

      <div className="space-y-4">
        {rows.map((cs) => (
          <AdminSection key={cs.id} title={cs.title}>
            <form
              action={async (fd) => {
                "use server";
                await updateCaseStudy(cs.id, fd);
              }}
              className="space-y-3"
            >
              <Field name="title" label="Title" defaultValue={cs.title} required />
              <Field name="problem" label="Problem" defaultValue={cs.problem} textarea required />
              <Field
                name="solution"
                label="Solution"
                defaultValue={cs.solution}
                textarea
                required
              />
              <ArrayField
                name="responsibilities"
                label="Responsibilities (one per line)"
                defaultValue={cs.responsibilities}
              />
              <Field name="result" label="Result" defaultValue={cs.result} textarea required />
              <ArrayField name="stack" label="Stack (one per line)" defaultValue={cs.stack} />
              <ArrayField name="tags" label="Tags (one per line)" defaultValue={cs.tags} />
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
                    await deleteCaseStudy(cs.id);
                  }}
                />
              </div>
            </form>
          </AdminSection>
        ))}
      </div>

      <AdminSection title="Add New Case Study">
        <form action={createCaseStudy} className="space-y-3">
          <Field name="title" label="Title" required />
          <Field name="problem" label="Problem" textarea required />
          <Field name="solution" label="Solution" textarea required />
          <ArrayField name="responsibilities" label="Responsibilities (one per line)" />
          <Field name="result" label="Result" textarea required />
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
