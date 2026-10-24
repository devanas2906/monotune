import { useState } from "react";

import { usePlayerStore } from "../../stores/usePlayerStore";
import { usePlayerUIStore } from "../../stores/usePlayerUIStore";
import { useShallow } from 'zustand/react/shallow';

import { SearchMusicHeader } from "./SearchMusicHeader";

import { MusicGenreButton } from "./MusicGenreButton";
import { MusicSection } from "./MusicSection";

import { AudioPlayer } from "./AudioPlayer";
import { FullScreenAudioPlayer } from "./FullScreenAudioPlayer";
import { AudioQueuePanel } from "./AudioQueuePanel";

import { musicSectionData } from "../../utilities/constant/musicSectionData";
import { musicGenres } from "../../utilities/constant/musicGenres";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export const Home = () => {
    const { audioElement, audioCurrentSong, audioRepeatMode, setAudioElement, setAudioMaxTime, setIsAudioPlaying, handleAudioUpdateTime, handleAudioEnded } = usePlayerStore(useShallow(state => ({ audioElement: state.audioElement, audioCurrentSong: state.audioCurrentSong, audioRepeatMode: state.audioRepeatMode, setAudioElement: state.setAudioElement, setAudioMaxTime: state.setAudioMaxTime, setIsAudioPlaying: state.setIsAudioPlaying, handleAudioUpdateTime: state.handleAudioUpdateTime, handleAudioEnded: state.handleAudioEnded })));
    const { isAudioQueuePanel, isAudioFullScreen } = usePlayerUIStore(useShallow(state => ({ isAudioQueuePanel: state.isAudioQueuePanel, isAudioFullScreen: state.isAudioFullScreen, setIsAudioQueuePanel: state.setIsAudioQueuePanel })));

    const [selectedGenre, setSelectedGenre] = useState("");
    const isAudioLoop = audioRepeatMode === "repeat-one";

    return (
        <main className="min-h-screen bg-[#090909] px-5 py-6 text-white sm:px-8 lg:px-12" >
            <div className="mx-auto max-w-7xl">
                <SearchMusicHeader applicationName={APPLICATION_NAME} />

                <section className="mt-23 mb-12">
                    <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">Dengar lebih dalam. <span className="mt-2 block text-zinc-500">Rasakan setiap nada.</span></h1>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">Temukan musik favoritmu dan nikmati setiap momen bersama suara pilihan.</p>
                </section>

                <section className="mb-16">
                    <h2 className="mb-5 text-xl font-medium">Jelajahi Genre</h2>
                    <button type="button" className={`${selectedGenre ? 'block' : 'hidden'} mb-3 ml-auto p-3 text-[0.85rem] rounded-xl border border-white/10 bg-white/4 text-zinc-300 hover:bg-white/8 cursor-pointer`} onClick={() => setSelectedGenre("")}>Reset</button>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{musicGenres.map(({ name, Icon }) => <MusicGenreButton key={name} name={name} Icon={Icon} selectedGenre={selectedGenre} changeGenre={setSelectedGenre} />)}</div>
                </section>

                <section>{
                    musicSectionData
                        .filter(sectionData => {
                            const currentType = sectionData.type;
                            const currentGenre = sectionData.genre;

                            if (selectedGenre === currentGenre && currentType === "genre") return true;
                            if (!selectedGenre && currentType === "category") return true;
                        })
                        .map(sectionData => <MusicSection key={sectionData.title} sectionData={sectionData} selectedGenre={selectedGenre} />)
                }</section>

                {audioElement && audioCurrentSong && <AudioPlayer />}
                {isAudioFullScreen && audioCurrentSong && <FullScreenAudioPlayer />}
                {isAudioQueuePanel && <AudioQueuePanel />}

                {
                    audioCurrentSong &&
                    <audio
                        ref={setAudioElement}
                        src={audioCurrentSong.audio}
                        loop={isAudioLoop}
                        onLoadedMetadata={(e) => setAudioMaxTime(Math.floor(e.target.duration))}
                        onPlaying={() => setIsAudioPlaying(true)}
                        onPause={() => setIsAudioPlaying(false)}
                        onTimeUpdate={handleAudioUpdateTime}
                        onEnded={handleAudioEnded}
                    />
                }

                <footer className={`mt-20 pt-6 ${audioElement && audioCurrentSong ? "pb-22" : "pb-3"} border-t border-white/10 text-center text-xs text-zinc-600`}>© 2026 {APPLICATION_NAME} Music. Made for music lovers.</footer>
            </div>
        </main >
    );
};