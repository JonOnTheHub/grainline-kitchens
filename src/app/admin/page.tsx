import { createClient } from "@/lib/supabase/server";
import { KitchenModel } from "@/lib/types";
import ModelTable       from "@/components/admin/ModelTable";
import Link             from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: models, error } = await supabase
    .from("kitchen_models")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main>
      {/* Page header */}
      <div className="border-b border-ink px-6 md:px-8 py-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="label text-ink-muted mb-1">CONTENT MANAGEMENT</p>
          <h1 className="font-display font-black uppercase tracking-[-0.03em] text-display-xl">
            KITCHEN MODELS
          </h1>
        </div>
        <Link
          href="/admin/models/new"
          className="font-display font-black uppercase tracking-[0.12em] text-[0.75rem]
                     bg-ochre text-ink px-6 py-4
                     hover:bg-ink hover:text-base
                     transition-colors duration-0"
        >
          + ADD MODEL
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-ink">
        {[
          { num: String(models?.length ?? 0), label: "TOTAL MODELS"    },
          { num: String(models?.filter((m) => m.is_featured).length ?? 0), label: "FEATURED" },
          { num: "3",  label: "FINISH TYPES"  },
          { num: "—",  label: "LAST UPDATED"  },
        ].map(({ num, label }, i) => (
          <div
            key={label}
            className={`px-6 md:px-8 py-8 ${i < 3 ? "border-r border-ink" : ""}`}
          >
            <p className="font-mono text-[2rem] font-black leading-none mb-2">{num}</p>
            <p className="label text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Model table */}
      {error ? (
        <div className="px-6 md:px-8 py-12">
          <p className="font-mono text-data-sm uppercase tracking-widest text-red-600">
            ERROR LOADING MODELS — CHECK SUPABASE CONNECTION
          </p>
        </div>
      ) : (
        <ModelTable models={(models as KitchenModel[]) ?? []} />
      )}
    </main>
  );
}