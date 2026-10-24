export const SearchMusicResultCardSkeleton = () => {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-3 animate-pulse">
            <div className="h-12 w-12 shrink-0 rounded-lg bg-zinc-800/80" />

            <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 w-1/3 rounded bg-zinc-800/80" />
                <div className="h-3 w-1/4 rounded bg-zinc-800/50" />
            </div>

            <div className="hidden sm:block">
                <div className="h-6 w-16 rounded-md bg-zinc-800/60" />
            </div>

            <div className="hidden sm:block">
                <div className="h-4 w-10 rounded bg-zinc-800/50" />
            </div>

            <div className="size-8 rounded-xl bg-zinc-800/80" />
            <div className="size-8 rounded-full bg-zinc-800/80" />
        </div>
    );
};