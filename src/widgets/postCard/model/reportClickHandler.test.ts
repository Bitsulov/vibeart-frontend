import {describe, it, expect, vi} from "vitest";
import {reportClickHandler} from "./reportClickHandler";

describe("reportClickHandler - отправляет жалобу один раз", () => {
    it("Устанавливает isReported в true, если ещё не отправлено", () => {
        const setIsReported = vi.fn();
        reportClickHandler(false, setIsReported);
        expect(setIsReported).toHaveBeenCalledWith(true);
    });

    it("Не вызывает setIsReported, если уже отправлено", () => {
        const setIsReported = vi.fn();
        reportClickHandler(true, setIsReported);
        expect(setIsReported).not.toHaveBeenCalled();
    });
});
