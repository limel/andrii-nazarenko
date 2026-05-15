import { requireSession } from "@/lib/session";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireSession();

  return (
    <div className="min-h-screen">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            <a href="/admin" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Dashboard
            </a>
            <a href="/admin/hero" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Hero
            </a>
            <a href="/admin/about" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              About
            </a>
            <a href="/admin/expertise" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Expertise
            </a>
            <a href="/admin/experience" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Experience
            </a>
            <a href="/admin/projects" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Projects
            </a>
            <a href="/admin/case-studies" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Case Studies
            </a>
            <a href="/admin/tech-stack" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Tech Stack
            </a>
            <a href="/admin/contact" className="text-foreground/60 hover:text-foreground transition-colors px-2 py-1 rounded">
              Contact
            </a>
          </nav>
          <form action={logout}>
            <button type="submit" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
