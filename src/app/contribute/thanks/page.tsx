import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThanksPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-slate-900/50 p-8 rounded-2xl border border-slate-800 animate-fade-in-up">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-serif text-slate-100 mb-4">Thank you</h1>
                <p className="text-slate-300 mb-8 leading-relaxed">
                    Your contribution has been received. Once approved, it will appear as a glowing dot around the shell.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/sky"
                        className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-medium border border-slate-700"
                    >
                        View the Sky
                    </Link>
                    <Link
                        href="/"
                        className="block w-full py-3 px-4 text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
