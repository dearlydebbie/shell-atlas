import { stories } from '@/lib/stories';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Play, Pause, Mic, BookOpen } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Generate static params for all stories
export function generateStaticParams() {
    return stories.map((story) => ({
        slug: story.slug,
    }));
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const story = stories.find((s) => s.slug === slug);

    if (!story) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-amber-400/30">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex flex-col gap-6">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-medium">Back to Shell</span>
                    </Link>

                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif font-medium mb-3 text-amber-50 leading-tight">
                            {story.title}
                        </h1>
                        <p className="text-slate-400 italic font-light text-sm md:text-base border-l-2 border-slate-700 pl-4 py-1">
                            {story.provenance}
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {story.tags.map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider text-amber-400 px-3 py-1 bg-amber-950/30 border border-amber-900/50 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="grid md:grid-cols-[1fr,1.5fr] gap-12">
                    {/* Left Column: Audio & Reflection */}
                    <div className="space-y-12">

                        {/* Audio Player Placeholder */}
                        <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-4">
                                <Mic className="w-4 h-4" /> Listen
                            </h2>
                            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                <button className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-full text-slate-900 hover:bg-amber-400 transition-colors shrink-0">
                                    <Play className="w-5 h-5 ml-1" />
                                </button>
                                <div className="flex-1 space-y-2">
                                    <div className="h-1 bg-slate-700 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-1/3"></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                        <span>0:00</span>
                                        <span>0:00</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 text-center">Audio coming soon</p>
                        </section>

                        {/* Daughter Note */}
                        <section className="relative p-6 bg-slate-900 rounded-2xl border-l-4 border-amber-500/50">
                            <h3 className="text-amber-500 font-serif text-lg mb-2">Daughter's Note</h3>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                "{story.daughterNote}"
                            </p>
                        </section>

                        {/* Contribute CTA */}
                        <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50">
                            <h3 className="font-serif text-xl mb-2 text-slate-200">What did this story teach you?</h3>
                            <p className="text-sm text-slate-400 mb-6">{story.reflectionPrompt}</p>
                            <Link
                                href={`/contribute?from=${story.slug}`}
                                className="flex justify-center w-full py-3 px-6 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-amber-400 transition-colors"
                            >
                                Add a Thread
                            </Link>
                        </div>

                    </div>

                    {/* Right Column: Reading */}
                    <div>
                        <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-6 sticky top-0 bg-slate-950 py-4 z-10">
                            <BookOpen className="w-4 h-4" /> Read
                        </h2>
                        <article className="prose prose-invert prose-lg prose-p:font-light prose-p:leading-8 max-w-none text-slate-300">
                            {story.transcript.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
