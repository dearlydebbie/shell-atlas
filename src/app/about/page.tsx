import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto space-y-8">
                <Link href="/" className="text-slate-500 hover:text-amber-500 flex items-center gap-2 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
                <h1 className="text-4xl font-serif text-slate-100">About the Atlas</h1>
                <div className="prose prose-invert prose-slate">
                    <p>
                        **Under the Tortoise Moon: Shell Atlas** is a digital installation exploring memory, diaspora, and the stories we carry.
                    </p>
                    <p>
                        Modeled after the myth of the Tortoise who carries his home on his back, this project asks:
                        *If we are far from our origin, what makes us at home?*
                    </p>
                    <p>
                        The 7 stories presented here are a mix of oral tradition passed down from father to daughter, and new stories written to bridge the gap between Lagos and London.
                    </p>
                    <hr className="border-slate-800" />
                    <h3>Credits</h3>
                    <p>
                        Concept & Stories: Deborah Adeoye<br />
                        Development: Antigravity Agent
                    </p>
                </div>
            </div>
        </div>
    );
}
