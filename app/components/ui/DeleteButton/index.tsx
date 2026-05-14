"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
  action: () => Promise<void>;
}

export function DeleteButton({ action }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("Delete this entry?")) {
          startTransition(() => action());
        }
      }}
      className="rounded-lg border border-red-500/30 px-4 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
