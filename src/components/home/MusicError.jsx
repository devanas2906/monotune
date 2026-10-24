import { RotateCcw, AlertCircle } from 'lucide-react';

export const MusicError = ({ title = "Gagal memuat musik", message = "Koneksi terganggu atau server sedang lambat. Coba muat ulang.", onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-zinc-900/40 border border-zinc-800/80 my-4">
            <div className="p-3 mb-3 rounded-full bg-zinc-800/60 text-zinc-400">
                <AlertCircle size={24} strokeWidth={1.5} />
            </div>

            <h3 className="text-base font-medium text-zinc-200 mb-1">{title}</h3>
            <p className="text-xs text-zinc-400 max-w-xs mb-5 leading-relaxed">{message}</p>

            <button onClick={onRetry} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded-lg transition-all cursor-pointer">
                <RotateCcw size={14} />
                <span>Coba Lagi</span>
            </button>
        </div>
    );
};