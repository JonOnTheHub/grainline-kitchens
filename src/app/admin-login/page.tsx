"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState(false);
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-base flex flex-col">
      {/* Top bar */}
      <div className="border-b border-ink px-6 md:px-8 h-nav flex items-center">
        <span className="font-display font-black text-xl uppercase tracking-[-0.04em]">
          GRAINLINE
        </span>
        <span className="font-mono text-data-sm uppercase tracking-widest text-ink-muted ml-4">
          / ADMIN
        </span>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="border border-ink">
            {/* Header */}
            <div className="px-8 py-6 border-b border-ink bg-ink text-base">
              <p className="label tracking-widest">RESTRICTED ACCESS</p>
              <h1 className="font-display font-black uppercase text-headline-md mt-1">
                ADMIN LOGIN
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">
              <div className="flex flex-col gap-2">
                <label className="label text-ink-muted">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border-b border-ink bg-transparent py-3
                             font-display font-bold text-lg uppercase
                             focus:border-ochre focus:outline-none
                             placeholder:text-ink-muted
                             transition-colors duration-0"
                  autoFocus
                />
                {error && (
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-red-600">
                    INVALID PASSWORD — TRY AGAIN
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-ink text-base font-display font-black uppercase
                           tracking-[0.12em] text-[0.75rem] py-5
                           hover:bg-ochre hover:text-ink
                           disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors duration-0"
              >
                {loading ? "VERIFYING..." : "ENTER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}