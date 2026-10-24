export class MusicEmptyResultError extends Error {
    constructor(query) {
        const message = query ? `Data musik tidak ditemukan untuk "${query}"` : 'Data musik tidak ditemukan.';

        super(message);
        this.name = 'MusicEmptyResultError';
    };
};