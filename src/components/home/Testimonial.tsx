export default function Testimonial() {
  return (
    <section
      id="heritage"
      className="border-b border-ink px-6 md:px-8 py-24 md:py-36 flex flex-col items-center text-center"
    >
      {/* Oversized quotemark */}
      <span
        className="font-display font-black text-[8rem] leading-none text-ink-faint select-none mb-4"
        aria-hidden
      >
        &quot;
      </span>

      <blockquote className="font-display font-black uppercase tracking-[-0.025em] text-headline-lg max-w-4xl leading-tight">
        THE KITCHEN AS A WORKSHOP, NOT A SHOWROOM.
      </blockquote>

      <cite className="mt-10 not-italic">
        <span className="label text-ink-muted">— ARNE MEYER, ARCHITECT / OSLO</span>
      </cite>

      {/* Divider */}
      <div className="mt-16 w-px h-16 bg-ink-faint" />
    </section>
  );
}