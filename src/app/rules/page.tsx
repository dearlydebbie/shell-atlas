import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RulesPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto space-y-8">
                <Link href="/" className="text-slate-500 hover:text-amber-500 flex items-center gap-2 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
                <h1 className="text-4xl font-serif text-slate-100">Community Rules</h1>
                <div className="prose prose-invert prose-slate">
                    <p>
                        Our sky is built by many voices. To ensure this space remains safe and welcomming, we ask you to observe the following boundaries:
                    </p>
                    <ul>
                        <li><strong>Respect Privacy:</strong> Do not share personal details (names, addresses, phones) of yourself or others.</li>
                        <li><strong>Respect Origins:</strong> When sharing a story that isn't yours, credit the teller if you can.</li>
                        <li><strong>No Hate:</strong> Cruelty, discrimination, and harassment have no place here.</li>
                    </ul>

                    <h3>Moderation</h3>
                    <p>
                        All contributions are <strong>pending</strong> by default. A human moderator reviews every story, proverb, and voice note.
                        While we try to approve quickly, some contributions may not be accepted if they violate these rules or the spirit of the project.
                    </p>
                </div>
            </div>
        </div>
    );
}
