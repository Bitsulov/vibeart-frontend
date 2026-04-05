import {describe, it, expect, vi, beforeEach, afterEach} from "vitest";
import {getLocalTimeAgoString} from "./getLocalTimeAgoString";

vi.mock("i18next", () => ({
    default: { t: (key: string) => key },
}));

describe("getLocalTimeAgoString - Возвращает строку относительного времени в локальном виде", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-05T12:00:00.000Z"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("Возвращает ключ justNow для даты в пределах 1 секунды", () => {
        const date = new Date("2026-04-05T12:00:00.500Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("justNow");
    });

    it("Возвращает строку в секундах для разницы в 30 секунд", () => {
        const date = new Date("2026-04-05T11:59:30.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("30 seconds ago");
    });

    it("Возвращает строку в минутах для разницы в 2 минуты", () => {
        const date = new Date("2026-04-05T11:58:00.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("2 minutes ago");
    });

    it("Возвращает строку в часах для разницы в 3 часа", () => {
        const date = new Date("2026-04-05T09:00:00.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("3 hours ago");
    });

    it("Возвращает строку в днях для разницы в 5 дней", () => {
        const date = new Date("2026-03-31T12:00:00.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("5 days ago");
    });

    it("Возвращает строку в неделях для разницы в 2 недели", () => {
        const date = new Date("2026-03-22T12:00:00.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("2 weeks ago");
    });

    it("Возвращает строку в месяцах для разницы в 2 месяца", () => {
        const date = new Date("2026-02-03T12:00:00.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("2 months ago");
    });

    it("Возвращает строку в годах для разницы в 2 года", () => {
        const date = new Date("2024-04-05T12:00:00.000Z").toISOString();
        expect(getLocalTimeAgoString("en", date)).toBe("2 years ago");
    });

    it("Принимает объект Date напрямую", () => {
        const date = new Date("2026-04-05T11:58:00.000Z");
        expect(getLocalTimeAgoString("en", date)).toBe("2 minutes ago");
    });

    it("Поддерживает русский язык — возвращает строку с числом", () => {
        const date = new Date("2026-04-05T11:58:00.000Z").toISOString();
        const result = getLocalTimeAgoString("ru", date);
        expect(typeof result).toBe("string");
        expect(result).toContain("2");
    });
});
