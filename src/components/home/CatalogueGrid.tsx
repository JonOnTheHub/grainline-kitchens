import Link from "next/link";
import { KitchenModel } from "@/lib/types";
import Image from "next/image";

// Seed images — replace with real Supabase URLs
const SEED_IMAGES = [
    "/images/the-arden/arden-catalogue.jpeg",
    "/images/the-burford/buford-full-kitchen.jpeg",
    "/images/the-langford/langford-catalogue.jpeg",
];

type Props = { models: KitchenModel[] };

export default function CatalogueGrid({ models }: Props) {
    // Fallback seed data if DB is empty
    const items = models.length > 0 ? models : FALLBACK_MODELS;

    return (
        <section id="catalogue" className="border-b border-ink">
            {/* Section header */}
            <div className="px-6 md:px-8 py-8 border-b border-ink flex items-baseline justify-between flex-wrap gap-4">
                <div>
                    <p className="label mb-1">OUR RANGE</p>
                    <h2 className="font-display font-black uppercase tracking-[-0.03em] text-display-xl">
                        CATALOGUE
                    </h2>
                </div>
                <Link
                    href="/catalogue"
                    className="font-mono text-data-sm uppercase tracking-widest text-ink-muted
                     hover:text-ink border-b border-ink-muted hover:border-ink
                     transition-colors duration-0"
                >
                    VIEW ALL →
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3">
                {items.slice(0, 3).map((model, i) => (
                    <Link
                        key={model.id}
                        href={`/catalogue/${model.slug}`}
                        className={`
              group flex flex-col border-b border-ink
              ${i < 2 ? "md:border-r md:border-b-0" : "md:border-b-0"}
            `}
                    >
                        {/* Series header */}
                        <div
                            className={`
                px-6 py-4 border-b border-ink
                flex items-baseline justify-between
                ${i === 0 ? "bg-ochre text-ink" : i === 1 ? "bg-ink text-base" : "bg-terracotta text-base"}
              `}
                        >
                            <span className="font-mono text-data-sm uppercase tracking-widest opacity-70">
                                SERIES 00{i + 1}
                            </span>
                            <span className="font-display font-black text-[0.72rem] tracking-[0.1em] uppercase">
                                {model.name} / {model.finish.toUpperCase()}
                            </span>
                        </div>

                        {/* Image */}
                        <div className="aspect-square relative overflow-hidden border-b border-ink">
                            <img
                                src={model.images[0] ?? SEED_IMAGES[i]}
                                alt={model.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-ochre/5 pointer-events-none" />
                        </div>

                        {/* Body */}
                        <div className="px-6 py-8 flex flex-col justify-between grow gap-8">
                            <p className="font-body text-body-md text-ink-muted leading-relaxed">
                                {model.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-data-sm uppercase">
                                    FROM £{model.price_from.toLocaleString()}
                                </span>
                                <span className="font-display font-black text-[0.7rem] tracking-widest uppercase
                                 group-hover:text-ochre transition-colors duration-0">
                                    VIEW →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

// ── Fallback until DB is seeded ───────────────────────────────────────────────
const FALLBACK_MODELS: KitchenModel[] = [
    {
        id: "1", slug: "the-burford", name: "THE BURFORD", series: "001",
        finish: "oak", description: "Heavy-duty raw oak carcass with a distinctive warm grain. Built for high-traffic culinary environments that demand structural honesty.",
        philosophy: null, price_from: 14200, currency: "GBP",
        specs: [], images: [], is_featured: true, created_at: "",
    },
    {
        id: "2", slug: "the-arden", name: "THE ARDEN", series: "002",
        finish: "walnut", description: "Natural textures meeting industrial rigidity. A tactile exploration of neutral tones and exposed joinery.",
        philosophy: null, price_from: 12800, currency: "GBP",
        specs: [], images: [], is_featured: false, created_at: "",
    },
    {
        id: "3", slug: "the-langford", name: "THE LANGFORD", series: "003",
        finish: "painted", description: "Earthy, resilient, unapologetically bold. High-density core with organic pigmentation across 14 custom colours.",
        philosophy: null, price_from: 15500, currency: "GBP",
        specs: [], images: [], is_featured: false, created_at: "",
    },
];