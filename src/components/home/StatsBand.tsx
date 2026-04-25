const stats = [
  { num: "140+", label: "KITCHENS INSTALLED" },
  { num: "98.3%",  label: "SATISFACTION RATE"  },
  { num: "10 YR",  label: "STRUCTURAL WARRANTY" },
  { num: "6–8 WKS", label: "AVG LEAD TIME"       },
];

export default function StatsBand() {
  return (
    <section
      id="process"
      className="grid grid-cols-2 md:grid-cols-4 border-b border-ink"
    >
      {stats.map(({ num, label }, i) => (
        <div
          key={label}
          className={`
            px-6 md:px-8 py-10 md:py-14
            border-b md:border-b-0
            ${i < stats.length - 1 ? "border-r border-ink" : ""}
            ${i < 2 ? "md:border-b-0" : ""}
          `}
        >
          <p className="font-mono text-[2.25rem] md:text-[3rem] font-black leading-none tracking-tighter mb-3">
            {num}
          </p>
          <p className="label text-ink-muted">{label}</p>
        </div>
      ))}
    </section>
  );
}