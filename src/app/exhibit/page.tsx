// qrcode import removed
// Or I can just omit the QR generation code and put a placeholder/link for now to avoid package bloat if not needed.
// User said "A QR code pointing to /exhibit/remote".
// I'll use a placeholder div or an external QR API for simplicity without deps: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=...`
// Or just text. I'll use the API.

export default function ExhibitPage() {
    const remoteUrl = "https://shell-atlas.netlify.app/exhibit/remote"; // Placeholder domain

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-12 text-center">
            <h1 className="text-5xl font-serif text-amber-500 mb-2 tracking-wide">Under the Tortoise Moon</h1>
            <p className="text-xl text-slate-400 font-light mb-16 max-w-2xl">
                A living archive of stories.
            </p>

            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl w-full">
                <div className="space-y-8 text-left">
                    <h2 className="text-3xl font-serif text-slate-200">How to participate</h2>
                    <ol className="space-y-6 text-xl text-slate-300">
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-bold shrink-0">1</span>
                            <span>Scan the QR code to join from your phone.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 font-bold shrink-0">2</span>
                            <span>Put on your headphones.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 font-bold shrink-0">3</span>
                            <span>Choose a shell scute to listen.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 font-bold shrink-0">4</span>
                            <span>Leave a thread in the sky.</span>
                        </li>
                    </ol>
                </div>

                <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl">
                    {/* QR Code Placeholder - In prod use dynamic URL */}
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(remoteUrl)}`}
                        alt="Scan to enter"
                        className="w-64 h-64 mb-4"
                    />
                    <p className="text-slate-900 font-mono text-sm">shellatlas.netlify.app/exhibit/remote</p>
                </div>
            </div>
        </div>
    );
}
