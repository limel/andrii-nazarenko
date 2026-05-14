interface ArrayFieldProps {
  name: string;
  label: string;
  defaultValue?: string[];
  rows?: number;
}

export function ArrayField({ name, label, defaultValue = [], rows = 4 }: ArrayFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-foreground/60 text-xs">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue.join("\n")}
        rows={rows}
        className="border-foreground/15 focus:border-foreground/30 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}
