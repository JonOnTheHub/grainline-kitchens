"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { KitchenModel, KitchenFinish } from "@/lib/types";
import Link from "next/link";

type Props = { model?: KitchenModel };

const FINISHES: KitchenFinish[] = ["oak", "walnut", "painted", "steel", "linoleum"];

export default function ModelForm({ model }: Props) {
    const isEdit = !!model;
    const router = useRouter();
    const supabase = createClient();

    const [form, setForm] = useState({
        name: model?.name ?? "",
        slug: model?.slug ?? "",
        series: model?.series ?? "",
        finish: model?.finish ?? "oak",
        description: model?.description ?? "",
        philosophy: model?.philosophy ?? "",
        price_from: model?.price_from ?? 0,
        is_featured: model?.is_featured ?? false,
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function slugify(name: string) {
        return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        setForm((f) => ({ ...f, name, slug: isEdit ? f.slug : slugify(name) }));
    }

    async function uploadImages(): Promise<string[]> {
        const urls: string[] = model?.images ?? [];
        for (const file of imageFiles) {
            const ext = file.name.split(".").pop();
            const path = `${form.slug}/${Date.now()}.${ext}`;
            const { error } = await supabase.storage
                .from("kitchen-images")
                .upload(path, file, { upsert: true });
            if (error) throw new Error(error.message);
            const { data } = supabase.storage
                .from("kitchen-images")
                .getPublicUrl(path);
            urls.push(data.publicUrl);
        }
        return urls;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setUploading(true);

        try {
            const images = await uploadImages();
            const payload = { ...form, images };

            const res = isEdit
                ? await fetch("/api/admin/models", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: model!.id, ...payload }),
                })
                : await fetch("/api/admin/models", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error ?? "REQUEST FAILED");
            }

            setSuccess(true);
            setTimeout(() => router.push("/admin"), 1000);
        } catch (err) {
            const message = err instanceof Error ? err.message : "UNKNOWN ERROR";
            setError(message);
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="divide-y divide-ink">

                {/* Name + slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink">
                    <Field label="MODEL NAME" required>
                        <input
                            type="text"
                            value={form.name}
                            onChange={handleNameChange}
                            placeholder="THE BURFORD"
                            required
                            className="w-full bg-transparent border-b border-ink py-3
           font-display font-bold text-base uppercase text-ink
           placeholder:text-ink-muted focus:border-ochre
           outline-none transition-colors duration-0"
                        />
                    </Field>
                    <Field label="SLUG (URL)">
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                            placeholder="the-burford"
                            required
                            className="w-full bg-transparent border-b border-ink py-3
           font-display font-bold text-base uppercase text-ink
           placeholder:text-ink-muted focus:border-ochre
           outline-none transition-colors duration-0"
                        />
                    </Field>
                </div>

                {/* Series + finish */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink">
                    <Field label="SERIES NUMBER">
                        <input
                            type="text"
                            value={form.series}
                            onChange={(e) => setForm((f) => ({ ...f, series: e.target.value }))}
                            placeholder="001"
                            required
                            className="w-full bg-transparent border-b border-ink py-3
           font-display font-bold text-base uppercase text-ink
           placeholder:text-ink-muted focus:border-ochre
           outline-none transition-colors duration-0"
                        />
                    </Field>
                    <Field label="FINISH">
                        <select
                            value={form.finish}
                            onChange={(e) => setForm((f) => ({ ...f, finish: e.target.value as KitchenFinish }))}
                            className="w-full bg-transparent border-b border-ink py-3
           font-display font-bold text-base uppercase text-ink
           placeholder:text-ink-muted focus:border-ochre
           outline-none transition-colors duration-0"
                        >
                            {FINISHES.map((f) => (
                                <option key={f} value={f}>{f.toUpperCase()}</option>
                            ))}
                        </select>
                    </Field>
                </div>

                {/* Price + featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink">
                    <Field label="PRICE FROM (£)">
                        <input
                            type="number"
                            value={form.price_from}
                            onChange={(e) => setForm((f) => ({ ...f, price_from: Number(e.target.value) }))}
                            placeholder="14200"
                            required
                            min={0}
                            className="w-full bg-transparent border-b border-ink py-3
           font-display font-bold text-base uppercase text-ink
           placeholder:text-ink-muted focus:border-ochre
           outline-none transition-colors duration-0"
                        />
                    </Field>
                    <Field label="FEATURED ON HOMEPAGE">
                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, is_featured: !f.is_featured }))}
                                className={`
                  px-6 py-3 font-mono text-[0.65rem] uppercase tracking-widest
                  border border-ink transition-colors duration-0
                  ${form.is_featured ? "bg-ink text-base" : "bg-base text-ink hover:bg-ink hover:text-base"}
                `}
                            >
                                {form.is_featured ? "YES — FEATURED" : "NO — STANDARD"}
                            </button>
                        </div>
                    </Field>
                </div>

                {/* Description */}
                <Field label="DESCRIPTION (CATALOGUE CARD)">
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder="SHORT DESCRIPTION FOR CATALOGUE CARDS..."
                        rows={3}
                        required
                        className="w-full bg-transparent border-b border-ink py-3
           font-display font-bold text-base uppercase text-ink
           placeholder:text-ink-muted focus:border-ochre
           outline-none transition-colors duration-0"
                    />
                </Field>

                {/* Philosophy */}
                <Field label="PHILOSOPHY / INTENT (PRODUCT PAGE)">
                    <textarea
                        value={form.philosophy}
                        onChange={(e) => setForm((f) => ({ ...f, philosophy: e.target.value }))}
                        placeholder="LONGER EDITORIAL DESCRIPTION FOR THE PRODUCT DETAIL PAGE..."
                        rows={5}
                        className="field-input resize-none"
                    />
                </Field>

                {/* Images */}
                <Field label="IMAGES (UPLOAD UP TO 3)">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImageFiles(Array.from(e.target.files ?? []).slice(0, 3))}
                        className="font-mono text-data-sm uppercase tracking-widest text-ink-muted
                       file:mr-4 file:py-2 file:px-4
                       file:border file:border-ink
                       file:font-mono file:text-[0.65rem] file:uppercase file:tracking-widest
                       file:bg-base file:text-ink
                       file:hover:bg-ink file:hover:text-base
                       file:transition-colors file:duration-0
                       file:cursor-pointer"
                    />
                    {imageFiles.length > 0 && (
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted mt-2">
                            {imageFiles.length} FILE{imageFiles.length > 1 ? "S" : ""} SELECTED
                        </p>
                    )}
                    {model?.images && model.images.length > 0 && (
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted mt-1">
                            {model.images.length} EXISTING IMAGE{model.images.length > 1 ? "S" : ""} — NEW UPLOADS WILL APPEND
                        </p>
                    )}
                </Field>

            </div>

            {/* Submit */}
            <div className="border-t border-ink px-6 md:px-8 py-8 flex items-center gap-6 flex-wrap">
                <button
                    type="submit"
                    disabled={uploading || success}
                    className="font-display font-black uppercase tracking-[0.12em] text-[0.75rem]
                     bg-ink text-base px-8 py-5
                     hover:bg-ochre hover:text-ink
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors duration-0"
                >
                    {success ? "SAVED ✓" : uploading ? "SAVING..." : isEdit ? "SAVE CHANGES" : "CREATE MODEL"}
                </button>
                <Link
                    href="/admin"
                    className="font-mono text-data-sm uppercase tracking-widest text-ink-muted
                     hover:text-ink border-b border-ink-muted hover:border-ink
                     transition-colors duration-0"
                >
                    CANCEL
                </Link>
                {error && (
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-red-600">
                        ERROR: {error}
                    </p>
                )}
            </div>
        </form>
    );
}

function Field({
    label, children, required,
}: {
    label: string; children: React.ReactNode; required?: boolean;
}) {
    return (
        <div className="px-6 md:px-8 py-8">
            <label className="label text-ink-muted block mb-4">
                {label}{required && <span className="text-ochre ml-1">*</span>}
            </label>
            {children}
        </div>
    );
}