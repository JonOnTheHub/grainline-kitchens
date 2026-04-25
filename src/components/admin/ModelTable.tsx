"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { KitchenModel } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

type Props = { models: KitchenModel[] };

export default function ModelTable({ models }: Props) {
    const router = useRouter();
    const supabase = createClient();

    async function handleDelete(id: string, name: string) {
        if (!confirm(`DELETE ${name}? THIS CANNOT BE UNDONE.`)) return;

        const res = await fetch("/api/admin/models", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            const json = await res.json();
            alert("DELETE FAILED — " + json.error);
        } else {
            router.refresh();
        }
    }

    if (models.length === 0) {
        return (
            <div className="px-6 md:px-8 py-16 border-b border-ink text-center">
                <p className="font-mono text-data-sm uppercase tracking-widest text-ink-muted">
                    NO MODELS YET — ADD YOUR FIRST KITCHEN MODEL
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[768px] font-mono text-data-sm uppercase text-left">
                <thead>
                    <tr className="bg-ink text-base border-b border-ink">
                        {["SERIES", "NAME", "FINISH", "PRICE FROM", "FEATURED", "ACTIONS"].map((h) => (
                            <th
                                key={h}
                                className="px-6 md:px-8 py-5 font-mono font-normal tracking-widest
                           border-r border-white/10 last:border-r-0"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr
                            key={model.id}
                            className="border-b border-ink hover:bg-ink/5 transition-colors duration-0"
                        >
                            <td className="px-6 md:px-8 py-5 border-r border-ink text-ink-muted">
                                {model.series}
                            </td>
                            <td className="px-6 md:px-8 py-5 border-r border-ink font-black">
                                {model.name}
                            </td>
                            <td className="px-6 md:px-8 py-5 border-r border-ink">
                                {model.finish}
                            </td>
                            <td className="px-6 md:px-8 py-5 border-r border-ink text-ochre">
                                £{model.price_from.toLocaleString()}
                            </td>
                            <td className="px-6 md:px-8 py-5 border-r border-ink">
                                {model.is_featured ? "YES" : "—"}
                            </td>
                            <td className="px-6 md:px-8 py-5">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/admin/models/${model.id}`}
                                        className="text-ink-muted hover:text-ink border-b border-ink-muted
                               hover:border-ink transition-colors duration-0"
                                    >
                                        EDIT
                                    </Link>
                                    <span className="text-ink-faint">|</span>
                                    <button
                                        onClick={() => handleDelete(model.id, model.name)}
                                        className="text-red-600 hover:text-red-800 border-b border-red-300
                               hover:border-red-600 transition-colors duration-0"
                                    >
                                        DELETE
                                    </button>
                                    <span className="text-ink-faint">|</span>
                                    <Link
                                        href={`/catalogue/${model.slug}`}
                                        target="_blank"
                                        className="text-ink-muted hover:text-ink border-b border-ink-muted
                               hover:border-ink transition-colors duration-0"
                                    >
                                        VIEW ↗
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}