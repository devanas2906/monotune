import { create } from 'zustand';

export const usePlayerUIStore = create((set) => ({
    isAudioQueuePanel: false,
    isAudioFullScreen: false,

    setIsAudioQueuePanel: (isAudioQueuePanel) => set({ isAudioQueuePanel }),
    setIsAudioFullScreen: (isAudioFullScreen) => set({ isAudioFullScreen }),
}));