import { AudioLines, Search, ListMusic } from "lucide-react";
import { useState, useEffect } from "react";

import { usePlayerUIStore } from "../../stores/usePlayerUIStore";
import { useShallow } from 'zustand/react/shallow';

import { SearchMusicResultContainer } from "./SearchMusicResultContainer";

import { useDebounce } from "../../hooks/useDebounce";

export const SearchMusicHeader = ({ applicationName }) => {
    const { isAudioQueuePanel, isAudioFullScreen, setIsAudioQueuePanel } = usePlayerUIStore(useShallow(state => ({ isAudioQueuePanel: state.isAudioQueuePanel, isAudioFullScreen: state.isAudioFullScreen, setIsAudioQueuePanel: state.setIsAudioQueuePanel })));

    const [searchMusicQuery, setSearchMusicQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchMusicQuery, 300);
    const isShouldSearchMusic = debouncedSearchQuery.length >= 3;

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", (isShouldSearchMusic || isAudioQueuePanel || isAudioFullScreen));
    }, [isShouldSearchMusic, isAudioQueuePanel, isAudioFullScreen]);

    return (
        <header className="fixed top-6 left-5 right-5 z-5 flex items-center gap-5 rounded-2xl border border-white/10 bg-[#121212]/80 p-4 before:content-[''] before:absolute before:inset-0 before:z-[-1] before:backdrop-blur-xl before:rounded-2xl">
            <a href="/" className="flex items-center gap-2 text-xl font-semibold tracking-[0.18em]"><AudioLines size={23} /> <span className="hidden sm:block">{applicationName}</span></a>

            <div className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-2.5">
                <Search size={17} className="text-zinc-500" />
                <input
                    value={searchMusicQuery}
                    onChange={(e) => setSearchMusicQuery(e.target.value)}
                    placeholder="Cari lagu atau artis..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
                    aria-label="Cari lagu atau artis"
                    autoFocus={true}
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
            {isShouldSearchMusic && <SearchMusicResultContainer searchMusicQuery={searchMusicQuery} setSearchMusicQuery={setSearchMusicQuery} />}
        </header>
    );
};