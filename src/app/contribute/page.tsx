import Link from 'next/link';
import { ArrowLeft, MessageSquarePlus, Mic, Feather } from 'lucide-react';

export default async function ContributePage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
    const { from } = await searchParams;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center">
            <div className="max-w-2xl w-full">
                <header className="mb-8 border-b border-slate-800 pb-6">
                    <Link
                        href={from ? `/stories/${from}` : "/"}
                        className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors w-fit mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-medium">Back</span>
                    </Link>
                    <h1 className="text-3xl font-serif text-slate-100 mb-4">Contribute to the Community Sky</h1>
                    <p className="text-slate-400 font-light leading-relaxed">
                        This archive is meant to live. If one of these stories reminds you of something you were told — by a parent, auntie, teacher, neighbour, church elder, or friend — you can add a small piece of your own.
                    </p>
                </header>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-lg font-serif text-slate-200 mb-4">Choose one path:</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Link href={` /contribute/new?type=story${from ? `&from=${from}` : ''}`} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all group text-center">
                                <Feather className="w-8 h-8 mx-auto mb-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                                <span className="block font-medium text-slate-200 mb-2">Option A — Similar story (short text)</span>
                                <span className="text-sm text-slate-400">A story you know that carries a similar moral.</span>
                            </Link>
                            <Link href={` /contribute/new?type=proverb${from ? `&from=${from}` : ''}`} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all group text-center">
                                <MessageSquarePlus className="w-8 h-8 mx-auto mb-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                                <span className="block font-medium text-slate-200 mb-2">Option B — Proverb / line (one sentence)</span>
                                <span className="text-sm text-slate-400">A line you grew up hearing — something that still follows you.</span>
                            </Link>
                            <Link href={` /contribute/new?type=voice${from ? `&from=${from}` : ''}`} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all group text-center">
                                <Mic className="w-8 h-8 mx-auto mb-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                                <span className="block font-medium text-slate-200 mb-2">Option C — Voice note (up to 60 seconds)</span>
                                <span className="text-sm text-slate-400">Tell it in your own voice.</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-amber-400 text-sm uppercase tracking-widest font-medium mb-3">Tags (required)</h3>
                        <p className="text-slate-300 text-sm">Theme + where it's from.</p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-amber-400 text-sm uppercase tracking-widest font-medium mb-3">Lineage (optional)</h3>
                        <p className="text-slate-300 text-sm">Who told you?</p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-amber-400 text-sm uppercase tracking-widest font-medium mb-3">Consent note</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Please don't include private personal details (phone numbers, addresses, medical info). If your story involves someone else, keep them anonymous.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
