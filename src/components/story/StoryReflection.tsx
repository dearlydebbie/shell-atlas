import Link from "next/link";
import { Story } from "@/lib/types";

export function StoryReflection({ story }: { story: Story }) {
    return (
        <>
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
        </>
    );
}
