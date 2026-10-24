export const debounceDelay = (debounceRef, setValue, value, delay) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
        setValue(value);
    }, delay);
};