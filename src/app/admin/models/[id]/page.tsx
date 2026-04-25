import { notFound }     from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { KitchenModel } from "@/lib/types";
import ModelForm        from "@/components/admin/ModelForm";

type Props = { params: { id: string } };

export default async function EditModelPage({ params }: Props) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("kitchen_models")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) notFound();

  return (
    <main>
      <div className="border-b border-ink px-6 md:px-8 py-8">
        <p className="label text-ink-muted mb-1">ADMIN / MODELS / EDIT</p>
        <h1 className="font-display font-black uppercase tracking-[-0.03em] text-display-xl">
          {(data as KitchenModel).name}
        </h1>
      </div>
      <ModelForm model={data as KitchenModel} />
    </main>
  );
}