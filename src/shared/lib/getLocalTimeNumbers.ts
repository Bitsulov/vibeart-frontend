export function getLocalTimeNumbers(language: string, date: Date | string) {
    return new Intl.DateTimeFormat(language, {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}
