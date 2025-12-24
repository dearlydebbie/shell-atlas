import Link from "next/link";
import { Headphones, Wind } from "lucide-react";

export default function RemotePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">
            <header className="mb-12 text-center">
                <h1 className="text-3xl font-serif text-slate-100 mb-2">Welcome</h1>
                <p className="text-slate-400">You are now under the moon.</p>
            </header>

            <div className="grid gap-6 w-full max-w-md">
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center p-8 bg-slate-900 border-2 border-slate-800 rounded-2xl hover:border-amber-500 transition-colors group"
                >
                    <Wind className="w-12 h-12 text-slate-500 group-hover:text-amber-400 mb-4 transition-colors" />
                    <span className="text-xl font-serif font-medium">Enter the Shell</span>
                    <span className="text-sm text-slate-500 mt-2">Listen to stories</span>
                </Link>

                <Link
                    href="/contribute"
                    className="flex flex-col items-center justify-center p-8 bg-slate-900 border-2 border-slate-800 rounded-2xl hover:border-amber-500 transition-colors group"
                >
                    <Headphones className="w-12 h-12 text-slate-500 group-hover:text-amber-400 mb-4 transition-colors" />
                    <span className="text-xl font-serif font-medium">Add a Thread</span>
                    <span className="text-sm text-slate-500 mt-2">Record your voice</span>
                </Link>
            </div>

            <Link href="/" className="mt-12 text-sm text-slate-600 uppercase tracking-widest hover:text-slate-400">
                Visit Website
            </Link>
        </div>
    );
}
