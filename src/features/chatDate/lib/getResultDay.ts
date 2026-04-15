import i18n from "i18next";
import {getLocalTimeString} from "shared/lib/getLocalTimeString";

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
