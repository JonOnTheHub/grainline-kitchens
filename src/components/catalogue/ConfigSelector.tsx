"use client";

import { useState }     from "react";
import { KitchenModel } from "@/lib/types";

type Props = { model: KitchenModel };

const FINISHES  = ["RAW OAK", "SMOKED LARCH", "LINOLEUM", "PAINTED MDF", "WALNUT"];
const HARDWARE  = ["INTEGRATED", "SURFACE MOUNT"];
const WORKTOPS  = ["STAINLESS STEEL", "HONED GRANITE", "SOLID OAK", "SINTERED STONE"];

export default function ConfigSelector({ model }: Props) {
  const [finish,  setFinish]  = useState(model.finish.toUpperCase());
  const [hardware,setHardware]= useState("INTEGRATED");
  const [worktop, setWorktop] = useState("STAINLESS STEEL");

  return (
    <section className="border-b border-ink">
      {/* header */}
      <div className="px-6 md:px-8 py-6 border-b border-ink">
        <p className="label text-ink-muted">CONFIGURE YOUR SPECIFICATION</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
        {/* Finish */}
        <BtnGroup
          label="CABINET FINISH"
          options={FINISHES}
          selected={finish}
          onSelect={setFinish}
          className="border-b md:border-b-0 md:border-r border-ink"
        />

        {/* Hardware */}
        <BtnGroup
          label="HARDWARE"
          options={HARDWARE}
          selected={hardware}
          onSelect={setHardware}
          className="border-b md:border-b-0 md:border-r border-ink"
        />

        {/* Worktop */}
        <BtnGroup
          label="WORKTOP"
          options={WORKTOPS}
          selected={worktop}
          onSelect={setWorktop}
        />
      </div>

      {/* Summary bar */}
      <div className="px-6 md:px-8 py-5 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex flex-wrap gap-6">
          {[
            { l: "FINISH",   v: finish   },
            { l: "HARDWARE", v: hardware },
            { l: "WORKTOP",  v: worktop  },
          ].map(({ l, v }) => (
            <div key={l}>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted block">
                {l}
              </span>
              <span className="font-mono text-data-sm uppercase">{v}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
          SELECTION NOTED — INCLUDE IN QUOTE REQUEST
        </p>
      </div>
    </section>
  );
}

function BtnGroup({
  label, options, selected, onSelect, className = "",
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`px-6 md:px-8 py-8 ${className}`}>
      <p className="label mb-5 text-ink-muted">{label}</p>
      <div
        className="grid gap-px bg-ink"
        style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 2)}, 1fr)` }}
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`
              px-4 py-4 font-mono text-[0.65rem] uppercase tracking-widest
              transition-colors duration-0
              ${selected === opt
                ? "bg-ink text-base"
                : "bg-base text-ink hover:bg-ink hover:text-base"
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}