interface FieldProps {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  textarea?: boolean;
}

export function Field({ name, label, defaultValue = "", required, textarea }: FieldProps) {
  const base =
    "w-full rounded-lg border border-foreground/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground/30";

  return (
    <div className="space-y-1">
      <label className="text-foreground/60 text-xs">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={3}
          className={base}
        />
      ) : (
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          required={required}
          className={base}
        />
      )}
    </div>
  );
}
