export const formatMusicDuration = (duration) => {
    if (!duration) return "00:00";

    const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
    const seconds = String(Math.floor(duration % 60)).padStart(2, "0");

    return `${minutes}:${seconds}`;
};