/**
 * Форматирует дату в числовом формате DD.MM.YYYY.
 *
 * @param language - Код языка (например, `"ru"`, `"en"`).
 * @param date - Дата для форматирования.
 * @returns Строка в формате DD.MM.YYYY.
 */
export function getLocalTimeNumbers(language: string, date: Date | string) {
    return new Intl.DateTimeFormat(language, {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}
