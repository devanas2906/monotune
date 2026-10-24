import { useEffect, useRef } from 'react';
import { RotateCw, Play, Pause, Shuffle, SkipBack, SkipForward, RepeatOff, Repeat, Repeat1, VolumeX, Volume, Volume1, Volume2, Download, Lock } from 'lucide-react';

import { usePlayerStore } from "../../stores/usePlayerStore";
import { useQueueStore } from "../../stores/useQueueStore";
import { usePlayerUIStore } from "../../stores/usePlayerUIStore";
import { useShallow } from 'zustand/react/shallow';

import { unescapeString } from '../../utilities/unscapeString';
import { formatMusicDuration } from '../../utilities/formats/formatMusicDuration';

export const AudioPlayer = () => {
    const audioProgressBarSliderRef = useRef(null);
    const audioVolumeSliderRef = useRef(null);

    const { audioElement, audioCurrentSong, audioMaxTime, audioCurrentTime, audioVolume, audioRepeatMode, isAudioPlaying, isAudioLoading, isAudioMuted, setAudioCurrentTime, setAudioVolume, setAudioRepeatMode, setIsAudioPlaying, setIsAudioMuted, setIsAudioInputDragging, toggleAudioPlayback } = usePlayerStore(useShallow(state => ({ audioElement: state.audioElement, audioCurrentSong: state.audioCurrentSong, audioMaxTime: state.audioMaxTime, audioCurrentTime: state.audioCurrentTime, audioVolume: state.audioVolume, audioRepeatMode: state.audioRepeatMode, isAudioPlaying: state.isAudioPlaying, isAudioLoading: state.isAudioLoading, isAudioMuted: state.isAudioMuted, setAudioCurrentTime: state.setAudioCurrentTime, setAudioVolume: state.setAudioVolume, setAudioRepeatMode: state.setAudioRepeatMode, setIsAudioPlaying: state.setIsAudioPlaying, setIsAudioMuted: state.setIsAudioMuted, setIsAudioInputDragging: state.setIsAudioInputDragging, toggleAudioPlayback: state.toggleAudioPlayback })));
    const { isAudioShuffle, setIsAudioShuffle, navigateAudioQueueSongs } = useQueueStore(useShallow(state => ({ isAudioShuffle: state.isAudioShuffle, setIsAudioShuffle: state.setIsAudioShuffle, navigateAudioQueueSongs: state.navigateAudioQueueSongs })));
    const { setIsAudioFullScreen } = usePlayerUIStore(useShallow(state => ({ setIsAudioFullScreen: state.setIsAudioFullScreen })));

    const { name, image, artist_name, duration, genre, audiodownload_allowed, audiodownload } = audioCurrentSong;

    useEffect(() => {
        if (audioElement && audioCurrentSong) toggleAudioPlayback();
    }, [audioElement, audioCurrentSong, toggleAudioPlayback, isAudioPlaying]);

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
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#121212]/80 px-5 py-3 backdrop-blur-xl">
            <div className="mx-auto flex items-end justify-between gap-5">

                <div
                    aria-label="Buka pemutar layar penuh"
                    title="Buka pemutar layar penuh"
                    onClick={() => setIsAudioFullScreen(true)}
                    className="flex items-center gap-3 shrink-0 w-1/5 cursor-pointer">
                    <div className="hidden sm:block size-12 shrink-0 overflow-hidden rounded-lg bg-zinc-800 border border-white/5">
                        <img src={image} alt={name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="truncate text-sm font-medium text-white">{name}</h4>
                        <p className="truncate text-xs text-zinc-400 mt-0.5">{unescapeString(artist_name)} - {genre}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 w-full">
                    <div className="flex items-center gap-4">
                        <button
                            aria-label={isAudioShuffle ? 'Matikan mode acak' : 'Acak urutan lagu'}
                            title={isAudioShuffle ? 'Matikan mode acak' : 'Acak urutan lagu'}
                            onClick={() => setIsAudioShuffle(!isAudioShuffle)}
                            className={`${isAudioShuffle ? "text-white hover:text-zinc-400" : "text-zinc-400 hover:text-white"} transition-colors cursor-pointer active:scale-95`}
                        >
                            <Shuffle size={14} />
                        </button>
                        <button
                            aria-label="Lagu sebelumnya"
                            title="Lagu sebelumnya"
                            onClick={() => navigateAudioQueueSongs("previous")}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95"
                        >
                            <SkipBack size={18} />
                        </button>

                        <button
                            aria-label={isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                            title={isAudioPlaying ? "Jeda lagu" : "Putar lagu"}
                            disabled={isAudioLoading}
                            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                            className="grid place-content-center size-10 rounded-full bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer active:scale-95"
                        >
                            {
                                isAudioLoading ? <RotateCw size={18} className="animate-spin" /> :
                                    isAudioPlaying ? <Pause size={18} className="fill-current" /> :
                                        <Play size={18} className="fill-current" />
                            }
                        </button>

                        <button
                            aria-label="Lagu berikutnya"
                            title="Lagu berikutnya"
                            onClick={() => navigateAudioQueueSongs("next")}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95"
                        >
                            <SkipForward size={18} />
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
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95"
                        >
                            {
                                audioRepeatMode === "repeat-one" ? <Repeat1 size={14} /> :
                                    audioRepeatMode === "repeat-all" ? <Repeat size={14} /> :
                                        <RepeatOff size={14} />
                            }
                        </button>
                    </div>

                    <div className="flex items-center gap-5 w-full">
                        <span className="hidden sm:block font-mono text-[11px] text-zinc-500 w-8">{formatMusicDuration(audioCurrentTime)}</span>
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
                        <span className="hidden sm:block font-mono text-[11px] text-zinc-500 w-8">{formatMusicDuration(duration - audioCurrentTime)}</span>
                    </div>
                </div>

                <div className="hidden sm:flex items-center justify-end shrink-0 gap-3 w-1/8">
                    {audiodownload_allowed ? (
                        <a
                            href={audiodownload}
                            className="grid place-content-center size-8 rounded-lg border border-white/5 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                            title="Unduh lagu"
                        >
                            <Download size={15} />
                        </a>
                    ) : (
                        <div
                            className="grid place-content-center size-8 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-600 cursor-not-allowed"
                            title="Unduh tidak tersedia untuk lagu ini"
                        >
                            <Lock size={14} />
                        </div>
                    )}

                    <div className='group relative grid place-content-center size-8 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer'>
                        <button
                            aria-label={isAudioMuted ? 'Nyalakan Suara' : 'Bungkam Suara'}
                            title={isAudioMuted ? 'Nyalakan Suara' : 'Bungkam Suara'}
                            onClick={() => setIsAudioMuted(!isAudioMuted)}
                            className="cursor-pointer"
                        >
                            {
                                audioVolume > 0.7 ? <Volume2 size={14} /> :
                                    audioVolume > 0.3 ? <Volume1 size={14} /> :
                                        audioVolume > 0 ? <Volume size={14} /> :
                                            <VolumeX size={14} />
                            }
                        </button>
                        <div className='scale-0 duration-0 delay-500 group-hover:scale-100 group-hover:delay-0 absolute bottom-23 grid -right-14 z-56 place-content-center h-8 bg-zinc-900 p-2 rounded-md -rotate-90'>
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
                    </div>
                </div>

            </div>
        </div>
    );
};