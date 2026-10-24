import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { notifySuccess, notifyError } from '../utilities/notifications';
import { unescapeString } from '../utilities/unscapeString';
import { MAX_AUDIO_QUEUE_SONGS } from '../utilities/constant/maxAudioQueueSongs';
import { shuffle } from '../utilities/shuffle';
import { usePlayerStore } from './usePlayerStore';

export const useQueueStore = create(
    persist(
        (set, get) => ({
            audioQueueSongs: [],
            audioOriginalQueueSongs: [],
            audioCurrentQueueSongIndex: -1,
            isAudioShuffle: false,

            audioCurrentSongInQueue: () => {
                const audioCurrentSong = usePlayerStore.getState().audioCurrentSong;
                const { audioQueueSongs } = get();
                return Boolean(audioQueueSongs.find(queueSong => queueSong.id === audioCurrentSong.id));
            },
            setAudioQueueSongs: (song) => {
                const setIsAudioCurrentSong = usePlayerStore.getState().setIsAudioCurrentSong;
                const { audioQueueSongs, audioOriginalQueueSongs, isAudioShuffle } = get();
                const addSongTitle = unescapeString(`${song.name} - ${song.artist_name}`);

                const isFullQueueSongs = audioQueueSongs.length >= MAX_AUDIO_QUEUE_SONGS;
                const isDuplicateQueueSong = audioQueueSongs.some(queueSong => queueSong.id === song.id);

                if (isFullQueueSongs) return notifyError(`Antrean sudah penuh (Maksimal ${MAX_AUDIO_QUEUE_SONGS} lagu). Kosongkan beberapa lagu terlebih dahulu`);
                if (isDuplicateQueueSong) return notifyError(`Lagu "${addSongTitle}" sudah ada di antrean`);

                const newAudioQueueSongs = [...audioQueueSongs, song];

                const isAudioCurrentSong = setIsAudioCurrentSong(song.id);
                const queueSongIndex = newAudioQueueSongs.findIndex(queueSong => queueSong.id === song.id);

                if (isAudioCurrentSong && queueSongIndex !== -1) set({ audioCurrentQueueSongIndex: queueSongIndex });
                if (isAudioShuffle) set({ audioOriginalQueueSongs: [...audioOriginalQueueSongs, song] });

                set({ audioQueueSongs: newAudioQueueSongs });
                notifySuccess(`Lagu "${addSongTitle}" ditambahkan ke antrean`);
            },
            setIsAudioShuffle: (isAudioShuffle) => {
                const audioCurrentSong = usePlayerStore.getState().audioCurrentSong;
                const { audioQueueSongs, audioOriginalQueueSongs, audioCurrentSongInQueue } = get();

                if (!isAudioShuffle) {
                    const queueSongIndex = audioOriginalQueueSongs.findIndex(queueSong => queueSong.id === audioCurrentSong.id);
                    set({ audioQueueSongs: audioOriginalQueueSongs, audioOriginalQueueSongs: [], audioCurrentQueueSongIndex: queueSongIndex });
                } else {
                    const isAudioCurrentSongInQueue = audioCurrentSongInQueue();
                    const shuffleAudioQueueSongs = shuffle(audioQueueSongs.filter(queueSong => queueSong.id !== audioCurrentSong.id));
                    const finalShuffleAudioQueueSongs = isAudioCurrentSongInQueue ? [audioCurrentSong, ...shuffleAudioQueueSongs] : [...shuffleAudioQueueSongs];

                    set({ audioQueueSongs: finalShuffleAudioQueueSongs, audioOriginalQueueSongs: [...audioQueueSongs], audioCurrentQueueSongIndex: isAudioCurrentSongInQueue ? 0 : -1 });
                };

                set({ isAudioShuffle })
            },
            navigateAudioQueueSongs: (direction) => {
                const { audioRepeatMode, setAudioCurrentSong } = usePlayerStore.getState();
                const { audioQueueSongs, audioCurrentQueueSongIndex } = get();

                const firstQueueSongIndex = 0;
                const lastQueueSongIndex = audioQueueSongs.length - 1;

                const isBackToLastQueueSong = audioRepeatMode === "repeat-all" && audioQueueSongs.length > 1 && audioCurrentQueueSongIndex === firstQueueSongIndex;
                const isBackToFirstQueueSong = audioRepeatMode === "repeat-all" && audioQueueSongs.length > 1 && audioCurrentQueueSongIndex === lastQueueSongIndex;

                const queueSongIndex = direction === "next" ? isBackToFirstQueueSong ? firstQueueSongIndex : audioCurrentQueueSongIndex + 1 : isBackToLastQueueSong ? lastQueueSongIndex : audioCurrentQueueSongIndex - 1;

                const queueSong = audioQueueSongs.find((_, index) => index === queueSongIndex);
                if (!queueSong) return;

                setAudioCurrentSong(queueSong);
                set({ audioCurrentQueueSongIndex: queueSongIndex });
            },
            removeAudioQueueSongs: (id) => {
                const setAudioCurrentSong = usePlayerStore.getState().setAudioCurrentSong;
                const { audioQueueSongs, audioCurrentQueueSongIndex, audioCurrentSongInQueue } = get();
                const newAudioQueueSongs = audioQueueSongs.filter(queueSong => queueSong.id !== id);

                const removeQueueSongIndex = audioQueueSongs.findIndex(queueSong => queueSong.id === id);
                const lastQueueSongIndex = audioQueueSongs.length - 1;

                const isAudioCurrentSongInQueue = audioCurrentSongInQueue();

                const isRemoveBackwardQueueSong = removeQueueSongIndex < audioCurrentQueueSongIndex;
                const isRemoveCurrentLastQueueSong = removeQueueSongIndex === lastQueueSongIndex;
                const isRemoveCurrentQueueSong = (removeQueueSongIndex === audioCurrentQueueSongIndex) && !isRemoveCurrentLastQueueSong;

                if (isAudioCurrentSongInQueue) {
                    if (isRemoveBackwardQueueSong) {
                        set({ audioCurrentQueueSongIndex: audioCurrentQueueSongIndex - 1 });
                    } else {
                        if (audioQueueSongs.length <= 1 && isRemoveCurrentLastQueueSong) {
                            usePlayerStore.setState({ audioCurrentSong: null });
                            set({ audioCurrentQueueSongIndex: -1 });
                        } else {
                            const queueSongIndex = isRemoveCurrentLastQueueSong ? audioCurrentQueueSongIndex - 1 : isRemoveCurrentQueueSong ? audioCurrentQueueSongIndex + 1 : audioCurrentQueueSongIndex;
                            const queueSong = audioQueueSongs.find((_, index) => index === queueSongIndex);
                            setAudioCurrentSong(queueSong);

                            if (isRemoveCurrentQueueSong) set({ audioCurrentQueueSongIndex });
                        };
                    };
                };

                const removeQueueSong = audioQueueSongs.find(queueSong => queueSong.id === id);
                const removeQueueSongTitle = unescapeString(`${removeQueueSong.name} - ${removeQueueSong.artist_name}`);

                set({ audioQueueSongs: newAudioQueueSongs });
                notifySuccess(`Lagu "${removeQueueSongTitle}" dihapus dari antrean`);
            },
            clearAudioQueueSongs: () => {
                const { audioCurrentSongInQueue } = get();
                const isAudioCurrentSongInQueue = audioCurrentSongInQueue();

                if (isAudioCurrentSongInQueue) usePlayerStore.setState({ audioCurrentSong: null });

                set({ audioQueueSongs: [], audioCurrentQueueSongIndex: -1 });
                notifySuccess("Antrean lagu berhasil dikosongkan");
            },
        }),
        {
            name: "user-queue-store",
            partialize: (state) => (
                {
                    audioQueueSongs: state.audioQueueSongs,
                    audioOriginalQueueSongs: state.audioOriginalQueueSongs,
                    audioCurrentQueueSongIndex: state.audioCurrentQueueSongIndex,
                    isAudioShuffle: state.isAudioShuffle
                }
            )
        }
    )
);