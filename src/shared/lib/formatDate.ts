import { monthesRu } from "./monthesRu";
import { t } from "i18next";

export function formatDate(date: Date) {
    const currentDate = new Date();
    const difDays = currentDate.getDate() - date.getDate();
    const isThisMonth = date.getMonth() === currentDate.getMonth();
    const isThisYear = date.getFullYear() === currentDate.getFullYear();
    if (!isThisYear) {
        return `${date.getDate()} ${monthesRu()[date.getMonth() + 1]} ${date.getFullYear()}`;
    } else if (difDays === 0 && isThisMonth) {
        return t("Today");
    } else if (difDays === 1 && isThisMonth) {
        return t("Yesterday");
    } else {
        return `${date.getDate()} ${monthesRu()[date.getMonth() + 1]}`;
    }
}
