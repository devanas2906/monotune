export const formatMusicData = ({ musicData, usedBy, additionalData }) => {
    const isUsedBySection = usedBy === "section";

    return musicData.map(data => {
        const { id, name, image, artist_name, duration, audio, audiodownload_allowed, audiodownload, musicinfo: { tags: { genres } } } = data;
        let genre = genres.length ? genres[0].charAt(0).toUpperCase() + genres[0].slice(1) : "Unknown Genre";

        if (isUsedBySection) {
            const { selectedGenre } = additionalData;
            const findIndexSelectedGenre = genres.indexOf(selectedGenre);
            const indexSelectedGenre = (!selectedGenre || findIndexSelectedGenre === -1) ? 0 : findIndexSelectedGenre;
            genre = genres.length ? genres[indexSelectedGenre].charAt(0).toUpperCase() + genres[indexSelectedGenre].slice(1) : "Unknown Genre";
        };

        return { id, name, image, artist_name, genre, duration, audio, audiodownload_allowed, audiodownload };
    });
};