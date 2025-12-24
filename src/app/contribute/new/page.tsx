"use client";

import { useActionState, useEffect, useState, Suspense } from "react";
import { submitContribution } from "@/app/contribute/actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

const THEMES = [
    "greed", "cleverness", "community", "consequence",
    "trickster", "forgiveness", "pride", "patience",
    "justice", "love", "duty", "other"
];

const REGIONS = [
    "Nigeria", "UK", "Ghana", "Kenya", "South Africa",
    "USA", "Caribbean", "Europe", "Asia", "Prefer not to say", "Other"
];

function ContributionForm() {
    const searchParams = useSearchParams();
    const defaultType = searchParams.get("type") || "story";
    const fromSlug = searchParams.get("from") || "";

    const [state, formAction, isPending] = useActionState(submitContribution, null);
    const [type, setType] = useState(defaultType);

    useEffect(() => {
        if (defaultType) setType(defaultType);
    }, [defaultType]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex justify-center py-12">
            <div className="max-w-xl w-full">
                <Link
                    href="/contribute"
                    className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors w-fit mb-6"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-xs font-medium">Back</span>
                </Link>

                <h1 className="text-2xl font-serif mb-6 text-slate-100">
                    New {type === 'voice' ? 'Voice Note' : type === 'proverb' ? 'Proverb' : 'Story'}
                </h1>

                <form action={formAction} className="space-y-6">
                    <input type="hidden" name="type" value={type} />
                    <input type="hidden" name="from_story_slug" value={fromSlug} />

                    {/* Content Field */}
                    {type === 'voice' ? (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Audio (Max 5MB)</label>
                            <input
                                type="file"
                                name="audio"
                                accept="audio/*"
                                capture="environment"
                                required
                                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-amber-400 hover:file:bg-slate-700 cursor-pointer"
                            />
                            <p className="text-xs text-slate-500">Supported formats: mp3, m4a, wav.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">
                                {type === 'proverb' ? 'Proverb Text' : 'Story Text'}
                            </label>
                            <textarea
                                name="text"
                                required
                                rows={type === 'proverb' ? 3 : 8}
                                placeholder={type === 'proverb' ? "Writing is the painting of the voice..." : "Once upon a time..."}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                                maxLength={type === 'proverb' ? 200 : 1200}
                            />
                            <p className="text-xs text-slate-500 text-right">
                                Max {type === 'proverb' ? 200 : 1200} chars
                            </p>
                        </div>
                    )}

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Theme</label>
                            <select name="theme" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 outline-none">
                                <option value="">Select a theme</option>
                                {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Region/Origin</label>
                            <select name="origin_region" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 outline-none">
                                <option value="">Select region</option>
                                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">Specific Place (Optional)</label>
                        <input
                            type="text"
                            name="origin_free_text"
                            placeholder="e.g. Lagos, Nigeria or Brixton, London"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">Who told you? (Optional)</label>
                        <input
                            type="text"
                            name="lineage"
                            placeholder="e.g. My grandmother, Friend, Internet"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 outline-none"
                        />
                    </div>

                    {/* Consent */}
                    <div className="pt-4 border-t border-slate-800 space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500" />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300">
                                I understand my contribution may be displayed publicly if approved.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500" />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300">
                                I confirm I’m not sharing identifying personal information about other people.
                            </span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        {state?.error && (
                            <p className="text-red-400 text-sm mb-4">{state.error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Contribution'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default function NewContributionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading...</div>}>
            <ContributionForm />
        </Suspense>
    );
}
