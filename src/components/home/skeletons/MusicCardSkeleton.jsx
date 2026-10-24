export const MusicCardSkeleton = () => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/4 p-3 animate-pulse">
            <div className="h-48 w-full rounded-xl bg-zinc-800"></div>

            <div className="flex items-start justify-between gap-3 px-1 pt-4">
                <div className="min-w-0">
                    <div className="w-34.5 h-6 rounded-md bg-zinc-800 mb-3"></div>
                    <div className="w-25 h-5 rounded-md bg-zinc-800"></div>
                </div>
                <div className="w-11 h-4 rounded-md bg-zinc-800"></div>
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-white/10 px-1 pt-3">
                <div className="mr-auto w-8 h-4 rounded-md bg-zinc-800"></div>
                <div className="size-9 rounded-xl bg-zinc-800"></div>
                <div className="size-9 rounded-xl bg-zinc-800"></div>
                <div className="size-9 rounded-full bg-zinc-800"></div>
            </div>
        </div>
    );
};