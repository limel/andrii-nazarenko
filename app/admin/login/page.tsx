"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form action={action} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-medium">Admin</h1>

        <div className="space-y-1">
          <label htmlFor="password" className="text-foreground/85 text-sm">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="border-foreground/15 focus:border-foreground/30 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-foreground text-background w-full rounded-lg px-4 py-2 text-sm transition-opacity hover:opacity-75 disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
