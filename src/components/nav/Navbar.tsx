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
  const [scrolled] = useState(false);
  const pathname   = usePathname();

  useEffect(() => {
    const onScroll = () => {};
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 h-nav",
        "hidden md:flex items-center justify-between px-8",
        "border-b border-ink bg-base",
        "transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_0_#111111]"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display font-black text-xl tracking-[-0.04em] uppercase text-ink"
      >
        GRAINLINE
      </Link>

      {/* Desktop links */}
      <div className="flex items-center gap-8">
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

      {/* CTA */}
      <Link
        href="/#contact"
        className="font-display font-black text-[0.7rem] tracking-[0.12em] uppercase
                   bg-ink text-base px-5 py-3
                   hover:bg-ochre hover:text-ink
                   transition-colors duration-0"
      >
        GET QUOTE
      </Link>
    </nav>
  );
}