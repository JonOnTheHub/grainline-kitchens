"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { label: "CATALOGUE", href: "/#catalogue" },
  { label: "PROCESS",   href: "/#process"   },
  { label: "HERITAGE",  href: "/#heritage"  },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main nav bar ─────────────────────────────────────────── */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 h-nav",
          "flex items-center justify-between px-6 md:px-8",
          "border-b border-ink bg-base",
          "transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_#111111]"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-black text-xl tracking-[-0.04em] uppercase text-ink"
          onClick={() => setMobileOpen(false)}
        >
          GRAINLINE
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "font-display font-bold text-[0.7rem] tracking-[0.12em] uppercase",
                "transition-colors duration-0",
                pathname === l.href
                  ? "text-ink border-b border-ink pb-0.5"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className="hidden md:block font-display font-black text-[0.7rem] tracking-[0.12em] uppercase
                     bg-ink text-base px-5 py-3
                     hover:bg-ochre hover:text-ink
                     transition-colors duration-0"
        >
          GET QUOTE
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={clsx(
              "block w-6 h-[1.5px] bg-ink transition-transform duration-200",
              mobileOpen && "translate-y-[6.5px] rotate-45"
            )}
          />
          <span
            className={clsx(
              "block w-6 h-[1.5px] bg-ink transition-opacity duration-200",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "block w-6 h-[1.5px] bg-ink transition-transform duration-200",
              mobileOpen && "translate-y-[-6.5px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* ── Mobile menu overlay ───────────────────────────────────── */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-base flex flex-col justify-between",
          "px-6 pt-nav pb-12",
          "transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Links */}
        <div className="flex flex-col border-t border-ink mt-8">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "font-display font-black uppercase tracking-[-0.02em]",
                "text-[2.5rem] leading-none",
                "border-b border-ink py-6",
                "transition-colors duration-0 hover:text-ochre",
                "opacity-0 translate-y-4",
                mobileOpen && "opacity-100! translate-y-0! transition-all duration-300"
              )}
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className={clsx(
              "font-display font-black uppercase tracking-[-0.02em]",
              "text-[2.5rem] leading-none",
              "border-b border-ink py-6",
              "text-ochre hover:text-ink",
              "transition-colors duration-0",
              "opacity-0 translate-y-4",
              mobileOpen && "opacity-100! translate-y-0! transition-all duration-300"
            )}
            style={{ transitionDelay: mobileOpen ? `${links.length * 60}ms` : "0ms" }}
          >
            GET QUOTE
          </Link>
        </div>

        {/* Footer info */}
        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
          <p>GRAINLINE KITCHENS</p>
          <p className="mt-1">BUILT FOR PERMANENCE</p>
        </div>
      </div>
    </>
  );
}