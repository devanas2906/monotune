import { useQuery } from "@tanstack/react-query";
import { usePlayerStore } from "../../stores/usePlayerStore";
import { useShallow } from 'zustand/react/shallow';

import { MusicEmptyResultError } from "../../errors/musicEmptyResultError";
import { getMusicBySearch } from "../../services/jamendo";

import { SearchEmptyMusicResult } from "./SearchEmptyMusicResult";
import { SearchMusicResultError } from "./SearchMusicResultError";

import { SearchMusicResultCardSkeleton } from "./skeletons/SearchMusicResultCardSkeleton";
import { SearchMusicResultCard } from "./SearchMusicResultCard";

import { MUSIC_LIMIT_PER_SEARCH } from "../../utilities/constant/searchMusicData";

export const SearchMusicResultContainer = ({ searchMusicQuery, setSearchMusicQuery }) => {
    const { audioElement, audioCurrentSong } = usePlayerStore(useShallow(state => ({ audioElement: state.audioElement, audioCurrentSong: state.audioCurrentSong })));

    const { isPending, isError, error, data: searchMusicResults, refetch } = useQuery({
        queryKey: [`search-music-${searchMusicQuery}`],
        queryFn: () => getMusicBySearch(searchMusicQuery, MUSIC_LIMIT_PER_SEARCH),
        retry: 3
    });

    const totalSearcMusicResult = searchMusicResults?.length || 0;
    const titleSearcMusicResult = isPending ? "Sedang melakukan pencarian..." : `Menampilkan ${totalSearcMusicResult} lagu`;

    const isEmptyResult = error instanceof MusicEmptyResultError;

    return (
        <div className="absolute top-[115%] left-0 right-0 rounded-2xl border border-white/10 bg-[#121212]/80 p-4 backdrop-blur-xl">
            <div className="border-b border-white/10 pb-3 mb-5">
                <h2 className="text-[1.1rem] font-medium text-white mb-2 truncate">Hasil pencarian untuk <span className="text-zinc-300">"{searchMusicQuery}"</span></h2>
                <div className="flex justify-between items-center">
                    <p className="text-[0.85rem] text-zinc-400">{titleSearcMusicResult}</p>
                    <button type="button" onClick={() => setSearchMusicQuery("")} className="grid place-content-center p-2 text-sm rounded-md bg-zinc-800 text-zinc-300 transition-all group-hover:bg-white group-hover:text-black cursor-pointer active:scale-95">Reset</button>
                </div>
            </div>
            <div className={`flex flex-col gap-5 max-h-100 overflow-y-scroll scrollbar-none ${audioElement && audioCurrentSong ? "pb-16 sm:pb-19" : ""}`}>
                {isPending && [...Array(MUSIC_LIMIT_PER_SEARCH)].map((_, index) => <SearchMusicResultCardSkeleton key={index} />)}
                {isError && isEmptyResult && <SearchEmptyMusicResult query={searchMusicQuery} />}
                {isError && !isEmptyResult && <SearchMusicResultError onRetry={refetch} />}
                {searchMusicResults && searchMusicResults.map(musicResult => <SearchMusicResultCard key={musicResult.id} searchMusicData={musicResult} />)}
            </div>
        </div>
    );
};