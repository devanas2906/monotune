import { Search } from 'lucide-react';

export const SearchEmptyMusicResult = ({ query }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-3">
            <div className="p-3 mb-3 rounded-full bg-zinc-900 text-zinc-500"><Search size={22} strokeWidth={1.5} /></div>

            <h3 className="text-sm font-medium text-zinc-300 mb-1">Lagu tidak ditemukan</h3>

            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                {query ? (
                    <>
                        Tidak ada hasil untuk <span className="text-zinc-400">"{query}"</span>. Coba cari nama artis atau kata kunci lain.
                    </>
                ) : (
                    'Coba masukkan kata kunci pencarian yang berbeda.'
                )}
            </p>
        </div>
    );
};