import { KitchenModel } from "@/lib/types";

type Props = { model: KitchenModel };

export default function SpecsTable({ model }: Props) {
  const specs = model.specs.length > 0 ? model.specs : [
    { component: "BASE MODULE",    dimension: "600W × 870H × 600D", material: "PER FINISH",      tolerance: "+0.5MM" },
    { component: "WORKTOP",        dimension: "3000W × 40T × 650D", material: "PER SELECTION",   tolerance: "+0.1MM" },
    { component: "DRAWER RUNNERS", dimension: "450L / 550L",        material: "BLUM MOVENTO",    tolerance: "STRESS TESTED" },
    { component: "PLINTH",         dimension: "VARIES × 100H",      material: "ANODISED ALU",    tolerance: "+1.0MM" },
    { component: "WALL UNIT",      dimension: "600W × 720H × 320D", material: "PER FINISH",      tolerance: "+0.5MM" },
  ];

  return (
    <section className="border-b border-ink">
      {/* Header */}
      <div className="px-6 md:px-8 py-6 border-b border-ink">
        <p className="label text-ink-muted">TECHNICAL SPECIFICATIONS</p>
      </div>

      {/* Table — horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] font-mono text-data-sm uppercase text-left">
          <thead>
            <tr className="bg-ink text-base border-b border-ink">
              {["COMPONENT", "DIMENSION", "MATERIAL", "TOLERANCE"].map((h) => (
                <th key={h} className="px-6 md:px-8 py-5 font-mono font-normal tracking-widest border-r border-white/10 last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((row, i) => (
              <tr
                key={i}
                className="border-b border-ink hover:bg-ink/5 transition-colors duration-0"
              >
                <td className="px-6 md:px-8 py-5 border-r border-ink font-black">{row.component}</td>
                <td className="px-6 md:px-8 py-5 border-r border-ink">{row.dimension}</td>
                <td className="px-6 md:px-8 py-5 border-r border-ink">{row.material}</td>
                <td className="px-6 md:px-8 py-5 text-ochre">{row.tolerance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="px-6 md:px-8 py-5 border-t border-ink">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
          ALL DIMENSIONS IN MILLIMETRES. CUSTOM SIZING AVAILABLE ON REQUEST. TOLERANCES SUBJECT TO MATERIAL SELECTION.
        </p>
      </div>
    </section>
  );
}