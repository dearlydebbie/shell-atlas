"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-slate-800 p-4 rounded-full">
                        <Lock className="w-6 h-6 text-amber-500" />
                    </div>
                </div>
                <h1 className="text-xl text-center text-slate-200 mb-6 font-serif">Admin Access</h1>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">Admin Token</label>
                        <input
                            type="password"
                            name="token"
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 outline-none"
                            placeholder="Enter secret token"
                        />
                    </div>

                    {state?.error && <p className="text-red-400 text-sm text-center">{state.error}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isPending ? 'Verifying...' : 'Enter Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
