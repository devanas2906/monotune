import { X } from 'lucide-react';

import { usePlayerStore } from '../../stores/usePlayerStore';
import { useQueueStore } from '../../stores/useQueueStore';
import { usePlayerUIStore } from '../../stores/usePlayerUIStore';
import { useShallow } from 'zustand/react/shallow';

import { unescapeString } from '../../utilities/unscapeString';

import { AudioQueueItem } from './AudioQueueItem';

export const AudioQueuePanel = () => {
    const { audioCurrentSong } = usePlayerStore(useShallow(state => ({ audioCurrentSong: state.audioCurrentSong })));
    const { audioQueueSongs, clearAudioQueueSongs } = useQueueStore(useShallow(state => ({ audioQueueSongs: state.audioQueueSongs, clearAudioQueueSongs: state.clearAudioQueueSongs })));
    const { setIsAudioQueuePanel } = usePlayerUIStore(useShallow(state => ({ setIsAudioQueuePanel: state.setIsAudioQueuePanel })));

    const { name, image, artist_name } = audioCurrentSong || {};

    return (
        <div className="fixed inset-y-0 right-0 z-55 w-full max-w-sm bg-[#121212]/95 p-6 backdrop-blur-xl border-l border-white/10 flex flex-col justify-between shadow-2xl transition-all">

            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <h3 className="text-sm font-medium text-white tracking-wide">Antrean Lagu</h3>
                <button
                    onClick={() => setIsAudioQueuePanel(false)}
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 scrollbar-none overflow-y-auto">
                <div className="mb-5">
                    <span className="block text-[11px] font-semibold text-zinc-500 mb-2">{audioCurrentSong ? "Lagu yang sedang diputar" : "Tidak ada lagu yang diputar"}</span>
                    {audioCurrentSong &&
                        (<div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-800/60 border border-white/10">
                            <img
                                src={image}
                                alt={unescapeString(name)}
                                className="size-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="text-xs font-medium text-white truncate">{unescapeString(name)}</h4>
                                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{unescapeString(artist_name)}</p>
                            </div>
                        </div>)
                    }
                </div>

                <div className="flex items-center justify-between">
                    {
                        audioQueueSongs.length > 0 &&
                        (
                            <>
                                <span className="text-[11px] font-semibold text-zinc-500">Selanjutnya {audioQueueSongs.length}</span>
                                <button onClick={clearAudioQueueSongs} className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">Kosongkan</button>
                            </>
                        )
                    }
                </div>

                {
                    audioQueueSongs.length === 0 ?
                        <div className="py-8 text-center text-xs text-zinc-600">Belum ada lagu di antrean.</div> :
                        <div className="space-y-2">{audioQueueSongs.map(queueSong => <AudioQueueItem key={queueSong.id} queueSong={queueSong} />)}</div>
                }
            </div>

        </div>
    );
};