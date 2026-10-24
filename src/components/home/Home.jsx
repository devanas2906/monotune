import { useState, useEffect, useRef } from "react";
import { usePlayerStore } from "../../stores/usePlayerStore";
import { usePlayerUIStore } from "../../stores/usePlayerUIStore";
import { useShallow } from 'zustand/react/shallow';

import { AudioLines, Search, ListMusic } from "lucide-react";

import { MusicGenreButton } from "./MusicGenreButton";
import { MusicSection } from "./MusicSection";
import { SearchMusicResultContainer } from "./SearchMusicResultContainer";

import { AudioPlayer } from "./AudioPlayer";
import { FullScreenAudioPlayer } from "./FullScreenAudioPlayer";
import { AudioQueuePanel } from "./AudioQueuePanel";

import { musicSectionData } from "../../utilities/constant/musicSectionData";
import { musicGenres } from "../../utilities/constant/musicGenres";

import { debounceDelay } from "../../utilities/debounceDelay";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export const Home = () => {
    const { audioElement, audioCurrentSong, audioRepeatMode, setAudioElement, setAudioMaxTime, setIsAudioPlaying, handleAudioUpdateTime, handleAudioEnded } = usePlayerStore(useShallow(state => ({ audioElement: state.audioElement, audioCurrentSong: state.audioCurrentSong, audioRepeatMode: state.audioRepeatMode, setAudioElement: state.setAudioElement, setAudioMaxTime: state.setAudioMaxTime, setIsAudioPlaying: state.setIsAudioPlaying, handleAudioUpdateTime: state.handleAudioUpdateTime, handleAudioEnded: state.handleAudioEnded })));
    const { isAudioQueuePanel, isAudioFullScreen, setIsAudioQueuePanel } = usePlayerUIStore(useShallow(state => ({ isAudioQueuePanel: state.isAudioQueuePanel, isAudioFullScreen: state.isAudioFullScreen, setIsAudioQueuePanel: state.setIsAudioQueuePanel })));

    const debounceSearchMusicRef = useRef(null);

    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchMusicQuery, setSearchMusicQuery] = useState("");

    const isShouldSearchMusic = searchMusicQuery.length >= 3;
    const isAudioLoop = audioRepeatMode === "repeat-one";

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", (isShouldSearchMusic || isAudioFullScreen));
    }, [isShouldSearchMusic, isAudioFullScreen]);

    return (
        <main className="min-h-screen bg-[#090909] px-5 py-6 text-white sm:px-8 lg:px-12" >
            <div className="mx-auto max-w-7xl">
                <header className="fixed top-6 left-5 right-5 z-5 flex items-center gap-5 rounded-2xl border border-white/10 bg-[#121212]/80 p-4 before:content-[''] before:absolute before:inset-0 before:z-[-1] before:backdrop-blur-xl before:rounded-2xl">
                    <a href="/" className="flex items-center gap-2 text-xl font-semibold tracking-[0.18em]"><AudioLines size={23} /> {APPLICATION_NAME}</a>

                    <div className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-2.5">
                        <Search size={17} className="text-zinc-500" />
                        <input
                            onChange={(e) => debounceDelay(debounceSearchMusicRef, setSearchMusicQuery, e.target.value, 300)}
                            placeholder="Cari lagu atau artis..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
                            aria-label="Cari lagu atau artis"
                            autoFocus="true"
                        />
                    </div>

                    <button
                        aria-label="Buka panel antrean lagu"
                        title="Buka panel antrean lagu"
                        onClick={() => setIsAudioQueuePanel(true)}
                        className="grid place-content-center size-10 shrink-0 rounded-md border border-white/5 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                    >
                        <ListMusic size={14} />
                    </button>
                    {isShouldSearchMusic && <SearchMusicResultContainer searchMusicQuery={searchMusicQuery} />}
                </header>

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