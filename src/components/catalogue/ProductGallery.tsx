import Image            from "next/image";
import { KitchenModel } from "@/lib/types";

type Props = { model: KitchenModel };

const SEED = [
  "https://picsum.photos/seed/gal-a/800/900",
  "https://picsum.photos/seed/gal-b/800/900",
  "https://picsum.photos/seed/gal-c/800/900",
];

export default function ProductGallery({ model }: Props) {
  const images = model.images.length >= 3 ? model.images : SEED;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
      {images.slice(0, 3).map((src, i) => (
        <div
          key={i}
          className={`
            relative overflow-hidden aspect-square md:aspect-[4/5]
            border-b md:border-b-0
            ${i < 2 ? "md:border-r border-ink" : ""}
            group
          `}
        >
          <Image
            src={src}
            alt={`${model.name} view ${i + 1}`}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          {/* Ochre tint overlay */}
          <div className="absolute inset-0 bg-ochre/5 pointer-events-none" />

          {/* Image index label */}
          <div className="absolute bottom-0 left-0 px-4 py-3 border-t border-ink/20">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/50">
              {String(i + 1).padStart(2, "0")} / 03
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}