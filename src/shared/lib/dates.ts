import { monthesRu } from "./monthesRu";

export function checkDateYear(date: string) {
    const currentDate = new Date(date);
    return currentDate.getFullYear() === new Date().getFullYear()
        ? `${currentDate.getDate()} ${monthesRu()[currentDate.getMonth() + 1]}`
        : `${currentDate.getDate()} ${monthesRu()[currentDate.getMonth() + 1]} ${currentDate.getFullYear()}`;
}
