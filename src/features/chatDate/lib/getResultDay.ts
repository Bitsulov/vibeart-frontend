import i18n from "i18next";
import {getLocalTimeString} from "shared/lib/getLocalTimeString";

/**
 * Возвращает человекочитаемую метку дня для разделителя в чате.
 * Сегодня и вчера возвращает локализованные строки, остальные — полную дату.
 *
 * @param language - Код языка (например, `"ru"`, `"en"`).
 * @param date - Дата сообщения в строковом формате.
 * @returns Строка `"Сегодня"`, `"Вчера"` или полная дата.
 */
export function getResultDay(language: string, date: string): string {
    const now = new Date();
    const target = new Date(date);

    const isToday =
        target.getDate() === now.getDate() &&
        target.getMonth() === now.getMonth() &&
        target.getFullYear() === now.getFullYear();

    if (isToday) return i18n.t("today");

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        target.getDate() === yesterday.getDate() &&
        target.getMonth() === yesterday.getMonth() &&
        target.getFullYear() === yesterday.getFullYear();

    if (isYesterday) return i18n.t("yesterday");

    return getLocalTimeString(language, date);
}
