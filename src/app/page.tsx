import Shell from "@/components/Shell";
import Link from "next/link";
import { Info } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none mix-blend-screen"></div>

      <header className="z-10 text-center mb-8 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-serif text-slate-100 mb-2 tracking-wide">
          Under the Tortoise Moon
        </h1>
        <p className="text-slate-400 text-lg font-light tracking-widest uppercase text-sm">
          A Shell Atlas
        </p>
      </header>

      <div className="z-10 w-full flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-amber-400/80 mb-6 text-sm font-medium tracking-wide animate-pulse">
          Sit under the tortoise moon. Choose a shell.
        </p>

        <Shell />
      </div>

      <footer className="z-10 w-full max-w-5xl flex justify-between items-end text-xs text-slate-500 mt-12 mb-4">
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
          <Link href="/contribute" className="hover:text-amber-400 transition-colors">Contribute</Link>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link href="/exhibit" className="hover:text-amber-400 transition-colors">Exhibit Mode</Link>
          <span>&copy; {new Date().getFullYear()} Shell Atlas</span>
        </div>
      </footer>
    </main>
  );
}
