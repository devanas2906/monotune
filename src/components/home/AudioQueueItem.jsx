import { Trash2 } from 'lucide-react';

import { usePlayerStore } from '../../stores/usePlayerStore';
import { useQueueStore } from '../../stores/useQueueStore';
import { useShallow } from 'zustand/react/shallow';

import { unescapeString } from '../../utilities/unscapeString';

export const AudioQueueItem = ({ queueSong }) => {
    const { setAudioCurrentSong } = usePlayerStore(useShallow(state => ({ setAudioCurrentSong: state.setAudioCurrentSong })));
    const { removeAudioQueueSongs } = useQueueStore(useShallow(state => ({ removeAudioQueueSongs: state.removeAudioQueueSongs })));

    const { id, name, image, artist_name } = queueSong;

    return <div className="group flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-zinc-800/40 transition-all border border-transparent hover:border-white/5">
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => setAudioCurrentSong(queueSong)}>
            <img
                src={image}
                alt={unescapeString(name)}
                className="size-9 rounded-md object-cover"
            />
            <div className="max-w-55">
                <h5 className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">{unescapeString(name)}</h5>
                <p className="text-[11px] text-zinc-500 truncate">{unescapeString(artist_name)}</p>
            </div>

        </div>

        <button
            aria-label="Hapus dari antrean"
            title="Hapus dari antrean"
            onClick={() => removeAudioQueueSongs(id)}
            className="text-zinc-600 hover:text-zinc-300 p-1 rounded transition-colors cursor-pointer"
        >
            <Trash2 size={14} />
        </button>
    </div>
};