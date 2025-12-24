import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { createAdminClient } from '@/lib/supabase/server';
import { ArrowLeft, Mic, Quote, Feather, Calendar } from 'lucide-react';
import { Contribution } from '@/lib/types';

export default async function ContributionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Use Admin client to fetch to ensure we can see it (though public policy allows approved).
    // Better to use Public client for fetching data to respect RLS, 
    // and Admin only for signing URL if needed.
    // Actually, RLS allows 'approved' select. So anon client works.

    // However, for storage signing, we need Admin if bucket is private and we don't have a public read policy.
    const adminSupabase = createAdminClient();

    // Fetch record
    const { data: contribution, error } = await adminSupabase
        .from('contributions')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !contribution || contribution.status !== 'approved') {
        notFound();
    }

    const typedContribution = contribution as Contribution;
    let signedUrl = null;

    if (typedContribution.type === 'voice' && typedContribution.audio_path) {
        const { data } = await adminSupabase
            .storage
            .from('contribution-audio')
            .createSignedUrl(typedContribution.audio_path, 3600); // 1 hour link
        signedUrl = data?.signedUrl;
    }

    const dateFormatted = new Date(typedContribution.created_at).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
            <div className="max-w-2xl w-full">
                <Link
                    href="/sky"
                    className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors w-fit mb-8"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-xs font-medium">Back to Sky</span>
                </Link>

                <article className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
                    {/* Type Icon Background */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-100 pointer-events-none">
                        {typedContribution.type === 'voice' ? <Mic size={120} /> :
                            typedContribution.type === 'proverb' ? <Quote size={120} /> : <Feather size={120} />}
                    </div>

                    <header className="mb-6 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${typedContribution.type === 'voice' ? 'text-blue-400 border-blue-900/50 bg-blue-950/30' :
                                    typedContribution.type === 'proverb' ? 'text-amber-400 border-amber-900/50 bg-amber-950/30' :
                                        'text-emerald-400 border-emerald-900/50 bg-emerald-950/30'
                                }`}>
                                {typedContribution.type}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {dateFormatted}
                            </span>
                        </div>
                        <h1 className="text-2xl font-serif text-slate-100">
                            {typedContribution.theme}
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            From {typedContribution.origin_region}
                            {typedContribution.origin_free_text && <span className="text-slate-500"> • {typedContribution.origin_free_text}</span>}
                        </p>
                    </header>

                    <div className="space-y-6 relative z-10">
                        {typedContribution.type === 'voice' && signedUrl ? (
                            <audio controls className="w-full rounded-md border border-slate-700 bg-slate-800">
                                <source src={signedUrl} type="audio/mpeg" />
                                <source src={signedUrl} type="audio/mp4" />
                                <source src={signedUrl} type="audio/wav" />
                                Your browser does not support the audio element.
                            </audio>
                        ) : (
                            <div className="text-lg leading-relaxed text-slate-200 font-serif italic">
                                "{typedContribution.text}"
                            </div>
                        )}

                        {typedContribution.lineage && (
                            <div className="pt-6 border-t border-slate-800">
                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Told By</p>
                                <p className="text-slate-400 text-sm">{typedContribution.lineage}</p>
                            </div>
                        )}

                        {typedContribution.from_story_slug && (
                            <div className="pt-2">
                                <p className="text-xs text-slate-500">
                                    Inspired by <Link href={`/stories/${typedContribution.from_story_slug}`} className="text-amber-500 hover:underline">Story link</Link>
                                </p>
                            </div>
                        )}
                    </div>

                </article>
            </div>
        </div>
    );
}
