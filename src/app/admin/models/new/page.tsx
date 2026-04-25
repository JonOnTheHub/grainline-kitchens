import ModelForm from "@/components/admin/ModelForm";

export default function NewModelPage() {
  return (
    <main>
      <div className="border-b border-ink px-6 md:px-8 py-8">
        <p className="label text-ink-muted mb-1">ADMIN / MODELS</p>
        <h1 className="font-display font-black uppercase tracking-[-0.03em] text-display-xl">
          ADD MODEL
        </h1>
      </div>
      <ModelForm />
    </main>
  );
}