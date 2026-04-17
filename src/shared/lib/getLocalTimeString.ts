/**
 * Форматирует дату в полном текстовом формате (например, «15 января 2025 г.»).
 *
 * @param language - Код языка (например, `"ru"`, `"en"`).
 * @param date - Дата для форматирования.
 * @returns Локализованная строка даты.
 */
export function getLocalTimeString(language: string, date: Date | string) {
    return new Intl.DateTimeFormat(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
}
