import { sql } from "@/lib/db";
import { createExpertise, updateExpertise, deleteExpertise } from "@/app/actions/resume";
import { AdminSection, Field } from "@components/ui/";
import { DeleteButton } from "@components/ui/";

type ExpertiseRow = { id: number; title: string; description: string; icon_svg: string; icon_viewbox: string };

export default async function ExpertisePage() {
  const rows = (await sql`SELECT * FROM expertise ORDER BY sort_order, id`) as ExpertiseRow[];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Expertise</h1>

      <div className="space-y-4">
        {rows.map((card) => (
          <AdminSection key={card.id} title={card.title}>
            <form
              action={async (fd) => {
                "use server";
                await updateExpertise(card.id, fd);
              }}
              className="space-y-3"
            >
              <Field name="title" label="Title" defaultValue={card.title} required />
              <Field
                name="description"
                label="Description"
                defaultValue={card.description}
                textarea
                required
              />
              <div className="space-y-1">
                <label className="text-xs text-foreground/60">
                  Icon SVG — paste the inner path/shape elements only (no{" "}
                  <code className="font-mono">{`<svg>`}</code> wrapper)
                </label>
                <textarea
                  name="icon_svg"
                  defaultValue={card.icon_svg}
                  rows={3}
                  className="w-full rounded-lg border border-foreground/15 bg-transparent px-3 py-2 font-mono text-xs outline-none focus:border-foreground/30"
                />
                <Field
                  name="icon_viewbox"
                  label="viewBox"
                  defaultValue={card.icon_viewbox || "0 0 24 24"}
                />
                {/* Live preview uses the saved viewBox */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-foreground/40">Preview:</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox={card.icon_viewbox || "0 0 24 24"}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: card.icon_svg }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-foreground px-4 py-1.5 text-sm text-background hover:opacity-75 transition-opacity"
                >
                  Save
                </button>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteExpertise(card.id);
                  }}
                />
              </div>
            </form>
          </AdminSection>
        ))}
      </div>

      <AdminSection title="Add New Card">
        <form action={createExpertise} className="space-y-3">
          <Field name="title" label="Title" required />
          <Field name="description" label="Description" textarea required />
          <div className="space-y-1">
            <label className="text-xs text-foreground/60">
              Icon SVG — inner path/shape elements only
            </label>
            <textarea
              name="icon_svg"
              rows={3}
              placeholder={`<path d="M12 2 2 7l10 5 10-5-10-5z" />`}
              className="w-full rounded-lg border border-foreground/15 bg-transparent px-3 py-2 font-mono text-xs outline-none focus:border-foreground/30"
            />
            <Field name="icon_viewbox" label="viewBox" defaultValue="0 0 24 24" />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-foreground px-4 py-1.5 text-sm text-background hover:opacity-75 transition-opacity"
          >
            Add
          </button>
        </form>
      </AdminSection>
    </div>
  );
}
