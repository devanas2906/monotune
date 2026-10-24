import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { notifyError } from '../utilities/notifications';
import { useQueueStore } from './useQueueStore';

export const usePlayerStore = create(
    persist(
        (set, get) => ({
            audioElement: null,
            audioCurrentSong: null,

            audioMaxTime: 0,
            audioCurrentTime: 0,
            audioVolume: 1,
            audioPreviousVolume: 1,
            audioRepeatMode: "repeat-off",

            isAudioProcessing: false,
            isAudioInputDragging: false,
            isAudioLoading: false,
            isAudioPlaying: false,
            isAudioMuted: false,

            setAudioElement: (audioElement) => set({ audioElement }),
            setAudioCurrentSong: (song) => {
                const audioQueueSongs = useQueueStore.getState().audioQueueSongs;
                const { isAudioPlaying, setIsAudioCurrentSong } = get();
                const isAudioCurrentSong = setIsAudioCurrentSong(song.id);

                if (!isAudioCurrentSong) {
                    const queueSongIndex = audioQueueSongs.findIndex(queueSong => queueSong.id === song.id);

                    set({ audioCurrentSong: song, isAudioPlaying: true });
                    useQueueStore.setState({ audioCurrentQueueSongIndex: queueSongIndex });
                } else {
                    set({ isAudioPlaying: !isAudioPlaying });
                };
            },
            setAudioMaxTime: (audioMaxTime) => set({ audioMaxTime }),
            setAudioCurrentTime: (audioCurrentTime) => {
                const { audioElement } = get();

                set({ audioCurrentTime });
                audioElement.currentTime = audioCurrentTime;
            },
            setAudioVolume: (newVolume) => {
                const { audioElement } = get();

                const audioVolume = Number(newVolume) / 100;
                if (audioVolume < 0 || audioVolume > 1) return;

                audioElement.volume = audioVolume;
                set({ audioVolume, audioPreviousVolume: audioVolume, isAudioMuted: audioVolume === 0 });
            },
            setAudioRepeatMode: () => {
                let newAudioRepeatMode = "";
                const { audioRepeatMode } = get();

                switch (audioRepeatMode) {
                    case "repeat-off":
                        newAudioRepeatMode = "repeat-all";
                        break;
                    case "repeat-all":
                        newAudioRepeatMode = "repeat-one";
                        break;
                    case "repeat-one":
                        newAudioRepeatMode = "repeat-off";
                        break;
                };

                set({ audioRepeatMode: newAudioRepeatMode });
            },
            setIsAudioCurrentSong: (id) => id === get().audioCurrentSong?.id,
            setIsAudioInputDragging: (isAudioInputDragging) => set({ isAudioInputDragging }),
            setIsAudioPlaying: (isAudioPlaying) => set({ isAudioPlaying }),
            setIsAudioMuted: (isAudioMuted) => {
                const { audioElement, audioPreviousVolume } = get();
                const newVolume = isAudioMuted ? 0 : audioPreviousVolume;

                audioElement.volume = newVolume;
                set({ audioVolume: newVolume, isAudioMuted })
            },

            toggleAudioPlayback: async () => {
                const { audioElement, isAudioProcessing, isAudioPlaying } = get();

                if (isAudioProcessing) return;
                set({ isAudioProcessing: true });

                try {
                    if (isAudioPlaying) {
                        set({ isAudioLoading: true });
                        await audioElement.play();
                        set({ isAudioLoading: false });
                    } else {
                        audioElement.pause();
                    };
                } catch (error) {
                    switch (error.name) {
                        case "NotSupportedError":
                            notifyError("Waduh, format media ini sepertinya tidak didukung oleh browsermu. Coba perbarui browser atau gunakan perangkat lain, ya!");
                            break;
                        case "AbortError": notifyError("Ups! Pemutaran sempat terhenti sebentar. Coba klik tombol putar lagi, ya!");
                            break;
                        default: notifyError("Terjadi kendala saat memuat media. Coba segarkan (refresh) halaman atau periksa koneksi internetmu, ya!");
                    };

                    set({ isAudioLoading: false, isAudioPlaying: false });
                } finally {
                    set({ isAudioProcessing: false });
                };
            },
            handleAudioUpdateTime: () => {
                const { audioElement, isAudioInputDragging } = get();
                if (isAudioInputDragging) return;

                set({ audioCurrentTime: Math.floor(audioElement.currentTime) });
            },
            handleAudioEnded: () => {
                const { audioQueueSongs, audioCurrentQueueSongIndex, navigateAudioQueueSongs } = useQueueStore.getState();
                const { audioRepeatMode } = get();

                if (audioRepeatMode === "repeat-off" || audioRepeatMode === "repeat-all") {
                    if (audioRepeatMode === "repeat-all") {
                        const lastQueueSongIndex = audioQueueSongs.length - 1;
                        const isCurrentLastQueueSong = audioCurrentQueueSongIndex === lastQueueSongIndex;

                        if (isCurrentLastQueueSong) useQueueStore.setState({ audioCurrentQueueSongIndex: -1 });
                    };

                    navigateAudioQueueSongs("next");
                };
            }
        }),
        {
            name: "user-player-store",
            partialize: (state) => (
                {
                    audioCurrentSong: state.audioCurrentSong,
                    audioVolume: state.audioVolume,
                    audioRepeatMode: state.audioRepeatMode
                }
            )
        }
    )
)