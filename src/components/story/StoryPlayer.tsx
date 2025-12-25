import { Play, Mic } from 'lucide-react';

export function StoryPlayer({ title }: { title: string }) {
    return (
        <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-4">
                <Mic className="w-4 h-4" /> Listen (currently unavailable)
            </h2>
            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <button className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-full text-slate-900 hover:bg-amber-400 transition-colors shrink-0">
                    <Play className="w-5 h-5 ml-1" />
                </button>
                <div className="flex-1 space-y-2">
                    <div className="h-1 bg-slate-700 rounded-full w-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>0:00</span>
                        <span>0:00</span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Audio playback is paused out of respect for storyteller consent. The full transcript is available below.</p>
        </section>
    );
}
