import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { logout, approveContribution, rejectContribution, deleteContribution } from "./actions";
import { Check, X, Trash2, Mic, FileText, Loader2, Play } from "lucide-react";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
        redirect("/admin/login");
    }

    const supabase = createAdminClient();
    const { data: pending } = await supabase
        .from("contributions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    // Helper for audio signing (server-side for admin view)
    const getSignedUrl = async (path: string) => {
        const { data } = await supabase.storage.from("contribution-audio").createSignedUrl(path, 3600);
        return data?.signedUrl;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12">
            <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
                <h1 className="text-2xl font-serif text-amber-500">Moderation Queue</h1>
                <form action={logout}>
                    <button className="text-sm text-slate-500 hover:text-slate-300">Logout</button>
                </form>
            </header>

            <div className="space-y-6 max-w-5xl mx-auto">
                {pending?.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">All caught up. No pending contributions.</div>
                ) : (
                    pending?.map(async (item) => {
                        const audioUrl = item.type === 'voice' && item.audio_path ? await getSignedUrl(item.audio_path) : null;

                        return (
                            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.type === 'voice' ? 'bg-blue-900/30 text-blue-400' :
                                                item.type === 'proverb' ? 'bg-amber-900/30 text-amber-400' : 'bg-green-900/30 text-green-400'
                                            }`}>
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</span>
                                    </div>

                                    <h3 className="font-serif text-lg">{item.theme} <span className="text-slate-600 text-sm font-sans mx-2">|</span> {item.origin_region}</h3>

                                    {item.text && (
                                        <p className="text-slate-300 italic p-3 bg-slate-950/50 rounded border border-slate-800/50">
                                            "{item.text}"
                                        </p>
                                    )}

                                    {audioUrl && (
                                        <audio controls src={audioUrl} className="w-full mt-2 h-8" />
                                    )}

                                    <div className="text-xs text-slate-500 pt-2 flex gap-4">
                                        {item.origin_free_text && <span>Place: {item.origin_free_text}</span>}
                                        {item.lineage && <span>By: {item.lineage}</span>}
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2 shrink-0 md:justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                                    <form action={approveContribution.bind(null, item.id)}>
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg text-sm font-medium transition-colors">
                                            <Check className="w-4 h-4" /> Approve
                                        </button>
                                    </form>
                                    <form action={rejectContribution.bind(null, item.id)}>
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                                            <X className="w-4 h-4" /> Reject
                                        </button>
                                    </form>
                                    <form action={deleteContribution.bind(null, item.id)}>
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors mt-2">
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
