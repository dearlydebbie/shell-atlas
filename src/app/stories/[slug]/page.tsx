import { stories } from '@/lib/stories';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StoryPlayer } from '@/components/story/StoryPlayer';
import { StoryReflection } from '@/components/story/StoryReflection';
import { StoryTranscript } from '@/components/story/StoryTranscript';

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
                        <StoryPlayer title={story.title} />
                        <StoryReflection story={story} />
                    </div>

                    {/* Right Column: Reading */}
                    <StoryTranscript text={story.transcript} />
                </div>
            </div>
        </div>
    );
}
