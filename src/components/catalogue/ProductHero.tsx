import Link          from "next/link";
import { KitchenModel } from "@/lib/types";

type Props = { model: KitchenModel };

export default function ProductHero({ model }: Props) {
  return (
    <section className="pt-nav border-b border-ink">
      {/* Breadcrumb */}
      <div className="px-6 md:px-8 py-4 border-b border-ink">
        <p className="font-mono text-data-sm uppercase tracking-widest text-ink-muted">
          <Link href="/#catalogue" className="hover:text-ink transition-colors duration-0">
            CATALOGUE
          </Link>
          {" "}/{" "}
          <span className="text-ink">{model.name}</span>
        </p>
      </div>

      {/* Hero grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-ink">
        {/* Headline */}
        <div className="md:col-span-8 px-6 md:px-8 py-12 md:py-16 border-b md:border-b-0 md:border-r border-ink">
          <p className="label mb-4 text-ink-muted">SERIES {model.series}</p>
          <h1 className="font-display font-black uppercase leading-[0.88] tracking-[-0.04em] text-display-2xl">
            {model.name}
          </h1>
          <p className="font-body text-body-lg text-ink-muted mt-8 max-w-lg leading-relaxed">
            {model.description}
          </p>
        </div>

        {/* Data manifest */}
        <div className="md:col-span-4 px-6 md:px-8 py-12 md:py-16 flex flex-col justify-between gap-8">
          <div className="space-y-3">
            {[
              { k: "SERIES",   v: `SERIES ${model.series}`         },
              { k: "FINISH",   v: model.finish.toUpperCase()        },
              { k: "CURRENCY", v: model.currency                    },
              { k: "FROM",     v: `£${model.price_from.toLocaleString()}` },
              { k: "WARRANTY", v: "10 YEARS"                        },
              { k: "LEAD TIME",v: "6–8 WEEKS"                       },
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
        </div>
      </div>
    </section>
  );
}