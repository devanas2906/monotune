import { useQuery } from "@tanstack/react-query";

import { MusicCard } from "./MusicCard";
import { MusicCardSkeleton } from "./skeletons/MusicCardSkeleton";
import { MusicError } from "./MusicError";

import { getMusicSection } from "../../services/jamendo";
import { MUSIC_LIMIT_PER_SECTION } from "../../utilities/constant/musicSectionData";

export const MusicSection = ({ sectionData: { type, category, genre, title, description }, selectedGenre }) => {
    const uniqueQueryKey = type === "category" ? `${category}-category` : `${genre}-genre`;

    const { isPending, isError, data: songs, refetch } = useQuery({
        queryKey: [`music-${uniqueQueryKey}-section`],
        queryFn: () => getMusicSection(category, selectedGenre, MUSIC_LIMIT_PER_SECTION),
        retry: 3,
    });

    if (isError) return <MusicError onRetry={refetch} />;

    return <section className="mb-14">
        <h2 className="text-xl font-medium sm:text-2xl">{title}</h2>
        <p className="mb-6 mt-2 text-sm text-zinc-500">{description}</p>

        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
            {isPending && [...Array(MUSIC_LIMIT_PER_SECTION)].map((_, index) => <MusicCardSkeleton key={index} />)}
            {!isPending && songs.map(song => <MusicCard key={song.id} song={song} />)}
        </div>
    </section>
};