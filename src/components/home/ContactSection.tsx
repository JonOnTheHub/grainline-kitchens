"use client";

import { useState } from "react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="border-b border-ink">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* ── Left — info ────────────────────────────────────────── */}
        <div className="px-6 md:px-8 py-12 md:py-16 border-b md:border-b-0 md:border-r border-ink flex flex-col justify-between gap-12">
          <div>
            <p className="label mb-6">COMMENCE YOUR BUILD</p>
            <h2 className="font-display font-black uppercase tracking-[-0.03em] text-headline-lg leading-tight">
              LET&apos;S PLAN<br />YOUR KITCHEN
            </h2>
            <p className="font-body text-body-md text-ink-muted mt-6 max-w-sm">
              Our technical team responds within one working day with a no-obligation quotation and spec sheet.
            </p>
          </div>

          <div className="space-y-5">
            {[
              { l: "SHOWROOM",  v: "14 MILLBROOK WAY, LEEDS LS1 4HQ" },
              { l: "TELEPHONE", v: "0113 496 2247"                    },
              { l: "EMAIL",     v: "SPEC@GRAINLINE.CO.UK"             },
              { l: "HOURS",     v: "MON–SAT  09:00–17:30"            },
            ].map(({ l, v }) => (
              <div key={l} className="border-b border-ink pb-4 last:border-b-0 last:pb-0">
                <p className="label text-ink-muted mb-1">{l}</p>
                <p className="font-mono text-data-sm uppercase">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — form ───────────────────────────────────────── */}
        <div className="px-6 md:px-8 py-12 md:py-16 bg-ink text-base">
          {sent ? (
            <div className="h-full flex flex-col justify-center items-start gap-4">
              <span className="font-mono text-data-sm uppercase tracking-widest text-ochre">
                INQUIRY RECEIVED
              </span>
              <p className="font-display font-black uppercase text-headline-md text-base">
                WE&apos;LL BE IN TOUCH<br />WITHIN 24 HOURS.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Row: name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField label="FIRST NAME" placeholder="JANE" type="text" />
                <FormField label="LAST NAME"  placeholder="SMITH" type="text" />
              </div>

              <FormField label="EMAIL ADDRESS" placeholder="JANE@EXAMPLE.COM" type="email" />
              <FormField label="TELEPHONE"     placeholder="07700 000 000"     type="tel" />

              {/* Select */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-base/50">
                  PROJECT TYPE
                </label>
                <select
                  className="w-full bg-transparent border-b border-base/30 focus:border-ochre
                             py-3 text-base font-display font-bold uppercase text-lg
                             appearance-none transition-colors duration-0"
                >
                  <option className="bg-ink">RESIDENTIAL / SINGLE UNIT</option>
                  <option className="bg-ink">MULTI-UNIT DEVELOPMENT</option>
                  <option className="bg-ink">COMMERCIAL / HOSPITALITY</option>
                </select>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-base/50">
                  SPECIFICATIONS
                </label>
                <textarea
                  rows={4}
                  placeholder="DIMENSIONS, FINISH PREFERENCE, TIMELINE..."
                  className="w-full bg-transparent border-b border-base/30 focus:border-ochre
                             py-3 text-base font-display font-bold uppercase text-lg
                             resize-none placeholder:text-base/20 transition-colors duration-0"
                />
              </div>

              <button
                onClick={() => setSent(true)}
                className="w-full bg-ochre text-ink py-5 font-display font-black uppercase
                           tracking-[0.15em] text-sm
                           hover:bg-base hover:text-ink
                           transition-colors duration-0"
              >
                TRANSMIT INQUIRY
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, placeholder, type,
}: {
  label: string; placeholder: string; type: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-base/50">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-base/30 focus:border-ochre
                   py-3 text-base font-display font-bold uppercase text-lg
                   placeholder:text-base/20 transition-colors duration-0"
      />
    </div>
  );
}