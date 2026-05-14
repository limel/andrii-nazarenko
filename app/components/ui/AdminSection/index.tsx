interface AdminSectionProps {
  title: string;
  children: React.ReactNode;
}

export function AdminSection({ title, children }: AdminSectionProps) {
  return (
    <div className="border-foreground/10 space-y-4 rounded-xl border p-5">
      <h2 className="text-foreground/60 text-sm font-medium tracking-widest uppercase">{title}</h2>
      {children}
    </div>
  );
}
