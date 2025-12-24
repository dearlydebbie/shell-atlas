import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft, Mic, Quote, Feather } from 'lucide-react';
import { Contribution } from '@/lib/types';

export const revalidate = 60; // Revalidate every minute

export default async function SkyPage() {
    const supabase = await createClient();

    // Public can read approved only (via RLS or explicit filter)
    const { data: contributions } = await supabase
        .from('contributions')
        .select('id, type, theme, origin_region, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors w-fit mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-medium">Back to Shell</span>
                    </Link>
                    <h1 className="text-4xl font-serif text-slate-100 mb-2">The Night Sky</h1>
                    <p className="text-slate-400 max-w-xl">
                        A constellation of voices, proverbs, and stories from our community.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {contributions?.map((c: any) => (
                        <Link
                            key={c.id}
                            href={`/sky/${c.id}`}
                            className="block bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-amber-500/30 hover:bg-slate-800 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                {c.type === 'voice' ? <Mic className="w-5 h-5 text-blue-400" /> :
                                    c.type === 'proverb' ? <Quote className="w-5 h-5 text-amber-400" /> :
                                        <Feather className="w-5 h-5 text-emerald-400" />}
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{c.origin_region}</span>
                            </div>
                            <h3 className="font-serif text-slate-200 group-hover:text-amber-100 mb-1 capitalize">
                                {c.theme}
                            </h3>
                            <p className="text-xs text-slate-500">
                                {new Date(c.created_at).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}

                    {(!contributions || contributions.length === 0) && (
                        <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                            <p>The sky is quiet right now.</p>
                            <Link href="/contribute" className="text-amber-500 hover:underline mt-2 inline-block">Be the first star.</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
