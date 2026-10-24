import { Clock3, Download, Lock, ListPlus, RotateCw, Play, Pause } from "lucide-react";
import { unescapeString } from "../../utilities/unscapeString";
import { formatMusicDuration } from "../../utilities/formats/formatMusicDuration";

import { usePlayerStore } from "../../stores/usePlayerStore";
import { useQueueStore } from "../../stores/useQueueStore";
import { useShallow } from 'zustand/react/shallow';

export const MusicCard = ({ song }) => {
    const { id, name, image, artist_name, duration, genre, audiodownload_allowed, audiodownload } = song;
    const { isAudioPlaying, isAudioLoading, setAudioCurrentSong, setIsAudioCurrentSong, } = usePlayerStore(useShallow(state => ({ isAudioPlaying: state.isAudioPlaying, isAudioLoading: state.isAudioLoading, setAudioCurrentSong: state.setAudioCurrentSong, setIsAudioCurrentSong: state.setIsAudioCurrentSong })));
    const { setAudioQueueSongs } = useQueueStore(useShallow(state => ({ setAudioQueueSongs: state.setAudioQueueSongs })));

    const isAudioCurrentSong = setIsAudioCurrentSong(id);

    return (
        <div className="group rounded-2xl border border-white/10 bg-white/4 p-3 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/6">
            <div className="h-40 sm:h-48 w-full rounded-xl overflow-hidden">
                <img
                    src={image}
                    alt={`Cover ${name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex items-start justify-between gap-3 px-1 pt-4">
                <div className="min-w-0">
                    <h3 className="truncate font-medium">{unescapeString(name)}</h3>
                    <p className="truncate mt-1 text-sm text-zinc-500">{unescapeString(artist_name)}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-zinc-500">
                    <Clock3 size={13} /> {formatMusicDuration(duration)}
                </span>
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-white/10 px-1 pt-3">
                <span title={genre} className="flex-1 truncate text-xs text-zinc-500">{genre}</span>
                {
                    audiodownload_allowed ?
                        (<a href={audiodownload} title="Unduh lagu" className="shrink-0 grid place-content-center size-9 rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer active:scale-95"><Download size={17} /></a>)
                        :
                        (<div className="shrink-0 grid place-content-center size-9 rounded-xl bg-zinc-800/80 text-zinc-30 cursor-not-allowed" title="Unduh tidak tersedia untuk lagu ini"><Lock size={17} /></div>)
                }

                <button
                    aria-label="Tambah ke antrean"
                    title="Tambah ke antrean"
                    onClick={() => setAudioQueueSongs(song)}
                    className="shrink-0 grid place-content-center size-9 rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer"
                >
                    <ListPlus size={17} />
                </button>

                <button
                    aria-label={isAudioCurrentSong && isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                    title={isAudioCurrentSong && isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                    disabled={isAudioLoading}
                    className="shrink-0 grid place-content-center size-9 rounded-full bg-zinc-100 text-black hover:bg-zinc-200 transition-all cursor-pointer active:scale-95"
                    onClick={() => setAudioCurrentSong(song)}
                >
                    {
                        (isAudioCurrentSong && isAudioLoading) ? <RotateCw size={17} className="animate-spin" /> :
                            (isAudioCurrentSong && isAudioPlaying) ? <Pause size={17} fill="currentColor" /> :
                                <Play size={17} fill="currentColor" />
                    }
                </button>
            </div>
        </div>
    );
};