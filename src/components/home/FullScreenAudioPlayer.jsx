import { useEffect, useRef } from 'react';
import { X, ListMusic, RotateCw, Play, Pause, SkipBack, SkipForward, Shuffle, RepeatOff, Repeat, Repeat1, VolumeX, Volume, Volume1, Volume2, Download, Lock, ListPlus } from 'lucide-react';

import { usePlayerStore } from '../../stores/usePlayerStore';
import { useQueueStore } from '../../stores/useQueueStore';
import { usePlayerUIStore } from '../../stores/usePlayerUIStore';
import { useShallow } from 'zustand/react/shallow';

import { unescapeString } from '../../utilities/unscapeString';
import { formatMusicDuration } from '../../utilities/formats/formatMusicDuration';

export const FullScreenAudioPlayer = () => {
    const audioProgressBarSliderRef = useRef(null);
    const audioVolumeSliderRef = useRef(null);

    const { audioCurrentSong, audioRepeatMode, audioMaxTime, audioCurrentTime, audioVolume, isAudioLoading, isAudioPlaying, isAudioMuted, setAudioCurrentTime, setAudioVolume, setAudioRepeatMode, setIsAudioPlaying, setIsAudioMuted, setIsAudioInputDragging } = usePlayerStore(useShallow(state => ({ audioCurrentSong: state.audioCurrentSong, audioRepeatMode: state.audioRepeatMode, audioMaxTime: state.audioMaxTime, audioCurrentTime: state.audioCurrentTime, audioVolume: state.audioVolume, setAudioRepeatMode: state.setAudioRepeatMode, isAudioLoading: state.isAudioLoading, isAudioPlaying: state.isAudioPlaying, isAudioMuted: state.isAudioMuted, setAudioCurrentTime: state.setAudioCurrentTime, setAudioVolume: state.setAudioVolume, setIsAudioPlaying: state.setIsAudioPlaying, setIsAudioMuted: state.setIsAudioMuted, setIsAudioInputDragging: state.setIsAudioInputDragging })));
    const { isAudioShuffle, setAudioQueueSongs, setIsAudioShuffle, navigateAudioQueueSongs } = useQueueStore(useShallow(state => ({ isAudioShuffle: state.isAudioShuffle, setAudioQueueSongs: state.setAudioQueueSongs, setIsAudioShuffle: state.setIsAudioShuffle, navigateAudioQueueSongs: state.navigateAudioQueueSongs })));
    const { setIsAudioQueuePanel, setIsAudioFullScreen } = usePlayerUIStore(useShallow(state => ({ setIsAudioQueuePanel: state.setIsAudioQueuePanel, setIsAudioFullScreen: state.setIsAudioFullScreen })));

    const { name, image, artist_name, duration, genre, audiodownload_allowed, audiodownload } = audioCurrentSong;

    useEffect(() => {
        const audioProgressBarSliderPercent = isNaN(audioCurrentTime / audioMaxTime) ? 0 : (audioCurrentTime / audioMaxTime) * 100;
        audioProgressBarSliderRef.current.style.setProperty("--audio-progress-bar-slider-percent", `${audioProgressBarSliderPercent}%`);
    }, [audioCurrentTime, audioMaxTime]);

    useEffect(() => {
        audioVolumeSliderRef.current.value = isAudioMuted ? 0 : audioVolume * 100;

        const audioVolumeSliderPercent = (Number(audioVolumeSliderRef.current.value) / Number(audioVolumeSliderRef.current.max)) * 100;
        audioVolumeSliderRef.current.style.setProperty("--audio-volume-slider-percent", `${audioVolumeSliderPercent}%`);
    }, [isAudioMuted, audioVolume]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#09090b]/90 p-6 backdrop-blur-xl">
            <div className='flex items-center justify-between'>
                <button
                    aria-label="Tutup pemutar layar penuh"
                    title="Tutup pemutar layar penuh"
                    onClick={() => setIsAudioFullScreen(false)}
                    className="grid place-content-center size-10 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer active:scale-95"
                >
                    <X size={20} />
                </button>

                <button
                    aria-label="Buka panel antrean lagu"
                    title="Buka panel antrean lagu"
                    onClick={() => setIsAudioQueuePanel(true)}
                    className="grid place-content-center size-10 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer active:scale-95"
                >
                    <ListMusic size={20} />
                </button>
            </div>

            <div className="mb-3 flex flex-col items-center text-center max-w-2xl mx-auto w-full">
                <div className="group size-60 overflow-hidden rounded-2xl bg-zinc-800 shadow-2xl border border-white/10 mb-4">
                    <img src={image} alt={name} className="size-full object-cover transition-transform group-hover:scale-105" />
                </div>

                <div className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white truncate mb-1">{unescapeString(name)}</h2>
                    <p className="text-sm text-zinc-400 truncate">
                        {unescapeString(artist_name)} <span className="text-zinc-600 mx-1">•</span> <span className="capitalize text-zinc-500">{genre}</span>
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto w-full">
                <div className="mb-3 flex justify-between items-center gap-3">
                    <span className='text-[11px] font-mono text-zinc-500'>{formatMusicDuration(audioCurrentTime)}</span>
                    <input
                        ref={audioProgressBarSliderRef}
                        type="range"
                        className="w-full appearance-none audio-progress-bar-slider"
                        min="0"
                        value={audioCurrentTime}
                        max={audioMaxTime}
                        onMouseDown={() => setIsAudioInputDragging(true)}
                        onMouseUp={() => setIsAudioInputDragging(false)}
                        onChange={(e) => setAudioCurrentTime(Number(e.target.value))}
                    />
                    <span className='text-[11px] font-mono text-zinc-500'>{formatMusicDuration(duration - audioCurrentTime)}</span>
                </div>

                <div className="flex items-center justify-center gap-6 sm:gap-8 mb-5">
                    <button
                        aria-label={isAudioShuffle ? 'Matikan mode acak' : 'Acak urutan lagu'}
                        title={isAudioShuffle ? 'Matikan mode acak' : 'Acak urutan lagu'}
                        onClick={() => setIsAudioShuffle(!isAudioShuffle)}
                        className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                        <Shuffle size={18} />
                    </button>
                    <button
                        aria-label="Lagu sebelumnya"
                        title="Lagu sebelumnya"
                        onClick={() => navigateAudioQueueSongs("previous")}
                        className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                        <SkipBack size={22} />
                    </button>

                    <button
                        aria-label={isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                        title={isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                        disabled={isAudioLoading}
                        onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                        className="grid place-content-center size-13 rounded-full bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer active:scale-95 shadow-lg"
                    >
                        {
                            isAudioLoading ? <RotateCw size={20} className="animate-spin" /> :
                                isAudioPlaying ? <Pause size={20} className="fill-current" /> :
                                    <Play size={20} className="fill-current" />
                        }
                    </button>

                    <button
                        aria-label="Lagu berikutnya"
                        title="Lagu berikutnya"
                        onClick={() => navigateAudioQueueSongs("next")}
                        className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                        <SkipForward size={22} />
                    </button>
                    <button
                        aria-label={
                            audioRepeatMode === "repeat-one" ? "Ulangi lagu ini" :
                                audioRepeatMode === "repeat-all" ? "Ulangi semua lagu" :
                                    "Pengulangan: Mati"
                        }
                        title={
                            audioRepeatMode === "repeat-one" ? "Ulangi lagu ini" :
                                audioRepeatMode === "repeat-all" ? "Ulangi semua lagu" :
                                    "Pengulangan: Mati"
                        }
                        onClick={() => setAudioRepeatMode()}
                        className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                        {
                            audioRepeatMode === "repeat-one" ? <Repeat1 size={18} /> :
                                audioRepeatMode === "repeat-all" ? <Repeat size={18} /> :
                                    <RepeatOff size={18} />
                        }
                    </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2.5">
                        <button
                            aria-label={isAudioMuted ? 'Nyalakan Suara' : 'Bungkam Suara'}
                            title={isAudioMuted ? 'Nyalakan Suara' : 'Bungkam Suara'}
                            className='grid place-content-center size-9 rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer'
                            onClick={() => setIsAudioMuted(!isAudioMuted)}
                        >
                            {
                                audioVolume > 0.7 ? <Volume2 size={14} /> :
                                    audioVolume > 0.3 ? <Volume1 size={14} /> :
                                        audioVolume > 0 ? <Volume size={14} /> :
                                            <VolumeX size={14} />
                            }
                        </button>
                        <input
                            ref={audioVolumeSliderRef}
                            type='range'
                            min="0"
                            max="100"
                            defaultValue="100"
                            className='appearance-none audio-volume-slider'
                            onChange={(e) => setAudioVolume(Number(e.target.value))}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {audiodownload_allowed ? (
                            <a
                                href={audiodownload}
                                className="grid place-content-center size-9 rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer"
                                title="Unduh lagu"
                            >
                                <Download size={16} />
                            </a>
                        ) : (
                            <div
                                className="grid place-content-center size-9 rounded-xl bg-zinc-800/40 text-zinc-600 cursor-not-allowed"
                                title="Unduh tidak tersedia"
                            >
                                <Lock size={15} />
                            </div>
                        )}

                        <button
                            aria-label="Tambah ke antrean"
                            title="Tambah ke antrean"
                            onClick={() => setAudioQueueSongs(audioCurrentSong)}
                            className="grid place-content-center size-9 rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer"
                        >
                            <ListPlus size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div >
    );
}