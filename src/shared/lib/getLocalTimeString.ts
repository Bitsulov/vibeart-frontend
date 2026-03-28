export function getLocalTimeString(language: string, date: Date | string) {
    return new Intl.DateTimeFormat(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
}
