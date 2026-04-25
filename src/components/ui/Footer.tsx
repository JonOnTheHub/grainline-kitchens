import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink bg-base">
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-8 py-12 gap-8">

        {/* Left */}
        <div className="flex flex-col justify-between gap-8 md:border-r border-ink md:pr-8">
          <div>
            <p className="font-display font-black text-xl uppercase tracking-[-0.04em]">
              GRAINLINE
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted mt-3 max-w-xs leading-relaxed">
              PERMANENT SOLUTIONS FOR MODERN HABITATION.<br />
              BUILT FOR THE LONG ARC OF HISTORY.
            </p>
          </div>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            © 2026 GRAINLINE KITCHENS LTD.
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="label text-ink-muted">NAVIGATE</p>
            <ul className="space-y-3">
              {["CATALOGUE", "PROCESS", "HERITAGE", "CONTACT"].map((l) => (
                <li key={l}>
                  <Link
                    href={`/#${l.toLowerCase()}`}
                    className="font-mono text-[0.65rem] uppercase tracking-widest
                               text-ink-muted hover:text-ink transition-colors duration-0"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="label text-ink-muted">LEGAL</p>
            <ul className="space-y-3">
              {["PRIVACY", "TERMS", "TECHNICAL DATA"].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="font-mono text-[0.65rem] uppercase tracking-widest
                               text-ink-muted hover:text-ink transition-colors duration-0"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}