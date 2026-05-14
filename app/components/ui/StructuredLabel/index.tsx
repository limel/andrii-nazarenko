export function StructuredLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-foreground/60 mb-2 block font-mono text-[9px] tracking-widest uppercase">
      {children}
    </span>
  );
}
