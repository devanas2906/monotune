export const unescapeString = (string) => {
    if (!string) return "";
    return new DOMParser().parseFromString(string, "text/html").body.textContent;
};