import i18n from "i18next";
import {getLocalTimeNumbers} from "./getLocalTimeNumbers";

/**
 * Форматирует дату для отображения в списке чатов.
 * Сегодняшние сообщения показывает как время, остальные — как относительное
 * число дней/месяцев назад или в формате DD.MM.YYYY для давних дат.
 *
 * @param language - Код языка (например, `"ru"`, `"en"`).
 * @param date - Дата сообщения.
 * @returns Отформатированная строка с датой.
 */
export function getChatDate(language: string, date: Date | string): string {
    const d = new Date(date);
    const now = new Date();

    const isToday =
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate();

    if (isToday) {
        return new Intl.DateTimeFormat(language, {
            hour: "2-digit",
            minute: "2-digit",
        }).format(d);
    }

    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    const diffMonths =
        (now.getFullYear() - d.getFullYear()) * 12 +
        (now.getMonth() - d.getMonth());

    if (diffDays < 365) {
        if (diffMonths >= 1) {
            return i18n.t("monthsAgo", { count: diffMonths });
        }

        return i18n.t("daysAgo", { count: diffDays });
    }

    return getLocalTimeNumbers(language, d);
}