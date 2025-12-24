import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto space-y-8">
                <Link href="/" className="text-slate-500 hover:text-amber-500 flex items-center gap-2 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
                <h1 className="text-4xl font-serif text-slate-100 mb-8">About the Shell Atlas</h1>
                
                <div className="space-y-6 text-slate-300 leading-relaxed">
                    <p>
                        I grew up with stories. Not the tidy kind that live in books, but the living kind — the ones that are told while people are cooking, travelling, waiting, warning you, calming you down, or quietly teaching you how to behave.
                    </p>
                    
                    <p>
                        <strong className="text-slate-100">Under the Tortoise Moon: Shell Atlas</strong> is my attempt to translate that kind of oral storytelling into a digital experience without flattening it into "content". The core archive is made from six stories told by my father (recorded as voice notes) and one story written by me: <em>The Girl Who Greeted the Moon Twice</em>. Each story page follows the same structure so it feels curated, not random: Listen → Read → Moral threads → Daughter note → Reflect → Contribute.
                    </p>
                    
                    <p>
                        This is a practice-based project, so the artefact isn't just a website — it's a designed encounter:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                        <li>You arrive to a night-sky shell.</li>
                        <li>You choose a scute (a story node).</li>
                        <li>You listen/read.</li>
                        <li>You sit with one reflection question.</li>
                        <li>You leave a small contribution that becomes part of the living archive.</li>
                    </ul>
                    
                    <h2 className="text-2xl font-serif text-slate-100 mt-8 mb-4">What I'm preserving (on purpose)</h2>
                    
                    <p>
                        Oral storytelling isn't only "what happened". It's how it's told: repetition, pauses, emphasis, humour, and the way morals are delivered without asking permission. Where possible, the transcript keeps those oral features instead of rewriting everything into a polished short story.
                    </p>
                    
                    <h2 className="text-2xl font-serif text-slate-100 mt-8 mb-4">Contributions (what visitors can add)</h2>
                    
                    <p>
                        To keep participation meaningful (and not chaotic), contributions are intentionally bounded:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                        <li>a similar story (short text)</li>
                        <li>a proverb/line (one sentence)</li>
                        <li>a voice note (up to 60 seconds)</li>
                    </ul>
                    
                    <p>
                        Visitors tag their contribution by theme and origin. Contributions appear as small stars around the shell — a quiet visual reminder that storytelling is communal.
                    </p>
                    
                    <h2 className="text-2xl font-serif text-slate-100 mt-8 mb-4">Accessibility</h2>
                    
                    <p>
                        Transcripts are always present. Pages are built with clear hierarchy, readable text, and simple interaction patterns. In an exhibit setting, the project is designed to be "headphone-first" and QR-supported.
                    </p>
                </div>
            </div>
        </div>
    );
}
