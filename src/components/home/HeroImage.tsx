import Image from "next/image";

const HERO_URL =
  "https://yciprniwhgktibczuyql.supabase.co/storage/v1/object/public/kitchen-images/the-burford/Buford,%20Hero.jpeg";

export default function HeroImage() {
  return (
    <section className="border-b border-ink relative overflow-hidden h-[50vw] max-h-[680px] min-h-[320px]">
      <Image
        src={HERO_URL}
        alt="The Burford — Grainline Kitchens"
        fill
        className="object-cover grayscale brightness-90"
        priority
      />
      <div className="absolute inset-0 bg-ochre/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 px-6 md:px-8 py-4 flex justify-between items-center">
        <span className="font-mono text-data-sm uppercase text-white/60 tracking-widest">
          SERIES 001 — THE BURFORD
        </span>
        <span className="font-mono text-data-sm uppercase text-white/60 tracking-widest">
          RAW OAK / BRUSHED STEEL
        </span>
      </div>
    </section>
  );
}