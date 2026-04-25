import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-nav border-b border-ink">
      {/* ── Headline row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-ink">
        {/* Large headline */}
        <div className="md:col-span-8 px-6 md:px-8 py-12 md:py-16 border-b md:border-b-0 md:border-r border-ink">
          <p className="label mb-6">MODULAR RTA KITCHENS — EST. 2024</p>
          <h1 className="font-display font-black uppercase leading-[0.88] tracking-[-0.04em] text-display-2xl">
            SYSTEMS<br />FOR<br />PERMANENCE
          </h1>
        </div>

        {/* Data manifest sidebar */}
        <div className="md:col-span-4 px-6 md:px-8 py-12 md:py-16 flex flex-col justify-end gap-3">
          {[
            { k: "YEAR",       v: "2024"       },
            { k: "TYPE",       v: "MODULAR RTA" },
            { k: "LEAD TIME",  v: "6–8 WKS"    },
            { k: "WARRANTY",   v: "10 YEARS"   },
            { k: "DELIVERY",   v: "NATIONWIDE" },
          ].map(({ k, v }) => (
            <div
              key={k}
              className="flex justify-between items-baseline border-b border-ink pb-2 last:border-b-0 last:pb-0"
            >
              <span className="font-mono text-data-sm text-ink-muted uppercase">{k}</span>
              <span className="font-mono text-data-sm uppercase">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sub-headline + CTA row ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-8 px-6 md:px-8 py-8 border-b md:border-b-0 md:border-r border-ink">
          <p className="font-display font-bold uppercase text-headline-md max-w-2xl leading-snug">
            MODULAR RTA KITCHENS BUILT ON BRUTALIST PRINCIPLES.
          </p>
        </div>
        <div className="md:col-span-4 px-6 md:px-8 py-8 flex items-center gap-4 flex-wrap">
          <Link
            href="/#catalogue"
            className="font-display font-black text-[0.7rem] tracking-[0.12em] uppercase
                       bg-ink text-base px-6 py-4
                       hover:bg-ochre hover:text-ink
                       transition-colors duration-0"
          >
            VIEW CATALOGUE
          </Link>
          <Link
            href="/#contact"
            className="font-display font-bold text-[0.7rem] tracking-[0.12em] uppercase
                       border border-ink text-ink px-6 py-4
                       hover:bg-ink hover:text-base
                       transition-colors duration-0"
          >
            GET QUOTE
          </Link>
        </div>
      </div>
    </section>
  );
}