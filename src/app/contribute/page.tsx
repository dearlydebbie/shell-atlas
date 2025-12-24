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
                    <h1 className="text-3xl font-serif text-slate-100 mb-2">Add a thread to the shell</h1>
                    <p className="text-slate-400 font-light">
                        Your voice and stories help build the night sky.
                    </p>
                </header>

                <section className="space-y-6">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-amber-400 text-sm uppercase tracking-widest font-medium mb-4">Contribution Rules</h2>
                        <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside marker:text-amber-500/50">
                            <li>Be respectful. This is a community archive.</li>
                            <li>No hate speech, bullying, or identifying information about others.</li>
                            <li>Stories should be short (under 1200 characters).</li>
                            <li>Voice notes max 60 seconds.</li>
                            <li>All submissions are <strong>pending approval</strong> before appearing publicly.</li>
                        </ul>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Link href={` /contribute/new?type=story${from ? `&from=${from}` : ''}`} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all group text-center">
                            <Feather className="w-8 h-8 mx-auto mb-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                            <span className="block font-medium text-slate-200">Share a Story</span>
                        </Link>
                        <Link href={` /contribute/new?type=proverb${from ? `&from=${from}` : ''}`} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all group text-center">
                            <MessageSquarePlus className="w-8 h-8 mx-auto mb-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                            <span className="block font-medium text-slate-200">Add a Proverb</span>
                        </Link>
                        <Link href={` /contribute/new?type=voice${from ? `&from=${from}` : ''}`} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all group text-center">
                            <Mic className="w-8 h-8 mx-auto mb-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                            <span className="block font-medium text-slate-200">Voice Note</span>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
