import { BookOpen } from "lucide-react";

export function StoryTranscript({ text }: { text: string[] }) {
    return (
        <div>
            <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-6 sticky top-0 bg-slate-950 py-4 z-10">
                <BookOpen className="w-4 h-4" /> Read
            </h2>
            <article className="prose prose-invert prose-lg prose-p:font-light prose-p:leading-8 max-w-none text-slate-300">
                {text.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </article>
        </div>
    );
}
