import Link             from "next/link";
import { KitchenModel } from "@/lib/types";

type Props = { model: KitchenModel };

export default function ProductDetails({ model }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
      {/* Philosophy — 2 cols */}
      <div className="md:col-span-2 px-6 md:px-8 py-12 md:py-16 border-b md:border-b-0 md:border-r border-ink">
        <p className="label mb-8 text-ink-muted">PHILOSOPHY / INTENT</p>
        <p className="font-display font-black uppercase tracking-[-0.02em] text-headline-md leading-snug max-w-2xl">
          {model.philosophy ?? model.description}
        </p>
        <p className="font-body text-body-md text-ink-muted mt-8 max-w-xl leading-relaxed">
          Engineered for architectural permanence. Every joint is exposed,
          every dimension is intentional, every finish matures with the
          space it inhabits.
        </p>
      </div>

      {/* Price + CTA — 1 col */}
      <div className="px-6 md:px-8 py-12 md:py-16 flex flex-col justify-between gap-12 bg-white/20">
        <div>
          <p className="label mb-4 text-ink-muted">INVESTMENT</p>
          <p className="font-mono font-black text-[3rem] md:text-[3.5rem] leading-none text-ochre">
            £{model.price_from.toLocaleString()}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted mt-2">
            *EXCL. INSTALLATION &amp; APPLIANCES
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/#contact"
            className="w-full block text-center font-display font-black uppercase
                       tracking-[0.12em] text-[0.75rem]
                       bg-ochre text-ink py-5
                       hover:bg-ink hover:text-base
                       transition-colors duration-0"
          >
            GET QUOTE
          </Link>
          <Link
            href="/#catalogue"
            className="w-full block text-center font-display font-bold uppercase
                       tracking-[0.12em] text-[0.75rem]
                       border border-ink text-ink py-5
                       hover:bg-ink hover:text-base
                       transition-colors duration-0"
          >
            ← BACK TO CATALOGUE
          </Link>
        </div>
      </div>
    </section>
  );
}