export function copyClickHandler(text: string) {
    navigator.clipboard.writeText(text)
        .catch(err => console.error(`copy error: ${err}`));
}
