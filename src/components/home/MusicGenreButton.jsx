export const MusicGenreButton = ({ name, Icon, selectedGenre, changeGenre }) => {
    const genre = name.replace("-", "").toLowerCase();
    const isSelectedGenre = genre === selectedGenre;

    return <button
        onClick={() => changeGenre(genre)}
        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition border-white/10 ${isSelectedGenre ? "bg-zinc-100 text-black hover:bg-zinc-300" : "bg-white/4 text-zinc-300 hover:bg-white/8"} cursor-pointer`}>
        <Icon size={19} /> <span className="text-sm font-medium">{name}</span>
    </button>
};