import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto space-y-8">
                <Link href="/" className="text-slate-500 hover:text-amber-500 flex items-center gap-2 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
                <h1 className="text-4xl font-serif text-slate-100">Privacy Policy</h1>
                <div className="prose prose-invert prose-slate">
                    <p>
                        This site is a public archive. Here is how we handle your data:
                    </p>
                    <ul>
                        <li><strong>No Accounts:</strong> You do not need to create an account to browse or contribute.</li>
                        <li><strong>Contributions:</strong> Any text or audio you submit is stored securely. If approved, it becomes public. If rejected or deleted, it is removed from public view (audio files may be permanently deleted).</li>
                    </ul>
                    <p className="text-sm text-slate-400">
                        Last updated: December 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
