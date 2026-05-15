import { sql } from "@/lib/db";
import { updateContact } from "@/app/actions/resume";
import { AdminSection, Field } from "@components/ui/";

export default async function ContactPage() {
  const [contact] = await sql`SELECT * FROM contact WHERE id = 1`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Contact</h1>

      <AdminSection title="Contact Links">
        <form action={updateContact} className="space-y-3">
          <Field name="email" label="Email" defaultValue={contact?.email ?? ""} />
          <Field name="github" label="GitHub username" defaultValue={contact?.github ?? ""} />
          <Field name="linkedin" label="LinkedIn username" defaultValue={contact?.linkedin ?? ""} />
          <Field name="telegram" label="Telegram username" defaultValue={contact?.telegram ?? ""} />
          <Field name="twitter" label="Twitter / X username" defaultValue={contact?.twitter ?? ""} />
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
