import {describe, it, expect, vi, afterEach} from "vitest";
import {getResultDay} from "./getResultDay";

vi.mock("i18next", () => ({
    default: { t: (key: string) => key },
}));

const FIXED_NOW = new Date("2026-04-15T12:00:00.000Z");

afterEach(() => {
    vi.useRealTimers();
});

describe("getResultDay - возвращает строку для отображения даты в чате", () => {
    it("Возвращает 'today' для сегодняшней даты", () => {
        vi.useFakeTimers();
        vi.setSystemTime(FIXED_NOW);

        const result = getResultDay("ru", "2026-04-15T08:00:00.000Z");
        expect(result).toBe("today");
    });

    it("Возвращает 'yesterday' для вчерашней даты", () => {
        vi.useFakeTimers();
        vi.setSystemTime(FIXED_NOW);

        const result = getResultDay("ru", "2026-04-14T10:00:00.000Z");
        expect(result).toBe("yesterday");
    });

    it("Возвращает форматированную дату для старых сообщений", () => {
        vi.useFakeTimers();
        vi.setSystemTime(FIXED_NOW);

        const result = getResultDay("ru", "2024-01-15T14:23:00.000Z");
        expect(typeof result).toBe("string");
        expect(result).not.toBe("today");
        expect(result).not.toBe("yesterday");
    });
});
