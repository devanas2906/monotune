import { AlertCircle, RotateCcw } from 'lucide-react';

export const SearchMusicResultError = ({ onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="p-3 mb-3 rounded-full bg-zinc-800/60 text-zinc-400"><AlertCircle size={22} strokeWidth={1.5} /></div>

            <h3 className="text-sm font-medium text-zinc-200 mb-1">Gagal memuat hasil pencarian</h3>
            <p className="text-xs text-zinc-500 max-w-xs mb-5 leading-relaxed">Terjadi masalah koneksi atau server sedang tidak merespons. Silakan coba lagi.</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded-lg transition-all cursor-pointer"
                >
                    <RotateCcw size={14} />
                    <span>Coba Lagi</span>
                </button>
            )}
        </div>
    );
};