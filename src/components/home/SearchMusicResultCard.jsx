import { Download, Lock, ListPlus, RotateCw, Play, Pause } from 'lucide-react';

import { unescapeString } from '../../utilities/unscapeString';
import { formatMusicDuration } from '../../utilities/formats/formatMusicDuration';

import { usePlayerStore } from "../../stores/usePlayerStore";
import { useQueueStore } from "../../stores/useQueueStore";
import { useShallow } from 'zustand/react/shallow';

export const SearchMusicResultCard = ({ searchMusicData }) => {
    const { id, name, image, artist_name, duration, genre, audiodownload_allowed, audiodownload } = searchMusicData;
    const { isAudioPlaying, isAudioLoading, setAudioCurrentSong, setIsAudioCurrentSong } = usePlayerStore(useShallow(state => ({ isAudioPlaying: state.isAudioPlaying, isAudioLoading: state.isAudioLoading, setAudioCurrentSong: state.setAudioCurrentSong, setIsAudioCurrentSong: state.setIsAudioCurrentSong })));
    const { setAudioQueueSongs } = useQueueStore(useShallow(state => ({ setAudioQueueSongs: state.setAudioQueueSongs })));

    const isAudioCurrentSong = setIsAudioCurrentSong(id);

    return (
        <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-3 transition-all hover:border-white/10 hover:bg-zinc-800/50">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="truncate text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">{unescapeString(name)}</h4>
                <p className="truncate text-xs text-zinc-500 mt-0.5">{unescapeString(artist_name)}</p>
            </div>

            <span className="hidden sm:inline-block rounded-md border border-white/10 bg-zinc-800/60 px-2.5 py-1 text-[11px] text-zinc-400 capitalize shrink-0">{genre}</span>
            <span className="hidden sm:inline-block mr-3 w-10 text-right font-mono text-xs text-zinc-500 shrink-0">{formatMusicDuration(duration)}</span>

            {
                audiodownload_allowed ?
                    (<a href={audiodownload} title='Unduh lagu' className="grid place-content-center size-8 rounded-xl bg-zinc-800 text-zinc-300 transition-all group-hover:bg-white group-hover:text-black cursor-pointer active:scale-95"><Download size={14} /></a>)
                    :
                    (<div className="grid place-content-center size-8 rounded-xl bg-zinc-800 text-zinc-300 cursor-not-allowed" title="Unduh tidak tersedia untuk lagu ini"><Lock size={14} /></div>)

            }

            <button
                aria-label="Tambah ke antrean"
                title="Tambah ke antrean"
                onClick={() => setAudioQueueSongs(searchMusicData)}
                className="grid place-content-center size-8 rounded-xl bg-zinc-800 text-zinc-300 transition-all group-hover:bg-white group-hover:text-black cursor-pointer active:scale-95"
            >
                <ListPlus size={14} />
            </button>

            <button
                aria-label={isAudioCurrentSong && isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                title={isAudioCurrentSong && isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                disabled={isAudioLoading}
                className="grid place-content-center size-8 rounded-full bg-zinc-800 text-zinc-300 transition-all group-hover:bg-white group-hover:text-black cursor-pointer active:scale-95"
                onClick={() => setAudioCurrentSong(searchMusicData)}
            >
                {
                    (isAudioCurrentSong && isAudioLoading) ? <RotateCw size={14} className="animate-spin" /> :
                        (isAudioCurrentSong && isAudioPlaying) ? <Pause size={14} fill="currentColor" /> :
                            <Play size={14} fill="currentColor" />
                }
            </button>
        </div>
    );
};