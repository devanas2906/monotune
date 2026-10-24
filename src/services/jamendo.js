import { MusicEmptyResultError } from "../errors/musicEmptyResultError";
import { formatMusicData } from "../utilities/formats/formatMusicData";

const jamendoClientId = import.meta.env.VITE_JAMENDO_CLIENT_ID;
const jamendoBaseUrl = "https://api.jamendo.com/v3.0";

export const getMusicSection = async (category, selectedGenre, limit = 8) => {
    const chooseParam = selectedGenre ? `fuzzytags=${selectedGenre}&order=popularity_week` : `order=${category}`;
    const response = await fetch(`${jamendoBaseUrl}/tracks/?client_id=${jamendoClientId}&format=json&${chooseParam}&groupby=artist_id&type=single+albumtrack&durationbetween=180_300&include=musicinfo&limit=${limit}`);
    const musicData = (await response.json()).results;

    if (musicData.length === 0) throw new MusicEmptyResultError(selectedGenre ? selectedGenre : category);

    return formatMusicData({ musicData, usedBy: "section", additionalData: { selectedGenre } });
};

export const getMusicBySearch = async (query, limit = 10) => {
    const normalizeQuery = encodeURIComponent(query.toLowerCase().trim());
    const response = await fetch(`${jamendoBaseUrl}/tracks/?client_id=${jamendoClientId}&format=json&search=${normalizeQuery}&groupby=artist_id&type=single+albumtrack&durationbetween=180_300&include=musicinfo&limit=${limit}`);
    const musicData = (await response.json()).results;

    if (musicData.length === 0) throw new MusicEmptyResultError(query);

    return formatMusicData({ musicData, usedBy: "search", additionalData: null });
};