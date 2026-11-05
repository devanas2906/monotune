import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { MusicCard } from "./MusicCard";
import { MusicCardSkeleton } from "./skeletons/MusicCardSkeleton";
import { MusicError } from "./MusicError";

import { getMusicSection } from "../../services/jamendo";
import { MUSIC_LIMIT_PER_SECTION } from "../../utilities/constant/musicSectionData";

export const MusicSection = ({ sectionData: { type, category, genre, title, description }, selectedCategory, selectedGenre, changeCategory }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const uniqueQueryKey = type === "category" ? `${category}-category` : `${genre}-genre`;
    const hasSelected = selectedCategory || selectedGenre;

    const { isPending, isError, data: songs, refetch } = useQuery({
        queryKey: [`music-${uniqueQueryKey}-section`, offset],
        queryFn: () => getMusicSection(category, selectedGenre, offset, MUSIC_LIMIT_PER_SECTION),
        retry: 3,
    });

    const paginateMusicSection = (direction) => {
        const newCurrentPage = direction === "previous" ? currentPage - 1 : currentPage + 1;

        if (direction === "previous" && newCurrentPage < 1) return;
        if (direction === "next" && songs.length <= MUSIC_LIMIT_PER_SECTION) return;

        const newOffset = (newCurrentPage - 1) * MUSIC_LIMIT_PER_SECTION;

        setCurrentPage(newCurrentPage);
        setOffset(newOffset);
    };

    if (isError) return <MusicError onRetry={refetch} />;

    return <section className={`${hasSelected ? "mb-5" : "mb-15"}`}>
        <div className="flex justify-between items-start gap-3">
            <div>
                <h2 className="text-xl font-medium sm:text-2xl">{title}</h2>
                <p className="mb-6 mt-2 text-sm text-zinc-500">{description}</p>
            </div>

            {type === "category" && (<span className="text-sm text-zinc-500 truncate cursor-pointer" onClick={() => changeCategory(selectedCategory ? "" : category)}>{selectedCategory ? "Reset" : "Lihat Semua"}</span>)}
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isPending && [...Array(MUSIC_LIMIT_PER_SECTION)].map((_, index) => <MusicCardSkeleton key={index} />)}
            {!isPending && songs.slice(0, MUSIC_LIMIT_PER_SECTION).map(song => <MusicCard key={song.id} song={song} />)}
        </div>

        {/* pagination */}
        {
            hasSelected &&
            (
                <div className="mt-5 flex justify-center items-center py-6 bg-transparent">
                    <div className="flex items-center gap-6 text-zinc-400 font-sans text-xs">
                        <button
                            aria-label="Lagu Sebelumnya"
                            title="Lagu Sebelumnya"
                            disabled={isPending}
                            type="button"
                            className={`flex items-center p-3 rounded-lg bg-[#27272a] text-white ${isPending ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-zinc-700 transition-colors`}
                            onClick={() => paginateMusicSection("previous")}
                        >
                            Sebelumnya
                        </button>

                        <span className="tracking-wide text-zinc-400">Halaman <span className="text-zinc-200 font-medium">{currentPage}</span></span>

                        <button
                            aria-label="Lagu Selanjutnya"
                            title="Lagu Selanjutnya"
                            disabled={isPending}
                            type="button"
                            className={`flex items-center p-3 rounded-lg bg-[#27272a] text-white ${isPending ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-zinc-700 transition-colors`}
                            onClick={() => paginateMusicSection("next")}
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            )
        }
    </section>
};