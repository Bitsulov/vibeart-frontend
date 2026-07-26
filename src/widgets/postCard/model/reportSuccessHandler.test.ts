import { describe, it, expect, vi } from "vitest";
import { reportSuccessHandler } from "./reportSuccessHandler";

describe("reportSuccessHandler - фиксирует успешную отправку жалобы", () => {
    it("Устанавливает isReported в true", () => {
        const setIsReported = vi.fn();
        const setReports = vi.fn();

        reportSuccessHandler(setIsReported, setReports);

        expect(setIsReported).toHaveBeenCalledWith(true);
    });

    it("Увеличивает счетчик жалоб на 1", () => {
        const setIsReported = vi.fn();
        const setReports = vi.fn();

        reportSuccessHandler(setIsReported, setReports);

        const updater = setReports.mock.calls[0][0] as (n: number) => number;
        expect(updater(2)).toBe(3);
    });
});
