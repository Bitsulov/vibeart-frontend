import { describe, it, expect, vi } from "vitest";
import { closeButtonClickHandler } from "./closeButtonClickHandler";

describe("closeButtonClickHandler - обработчик закрытия модалки", () => {
    it("Устанавливает isDisappearring в true", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowChangeLanguage = vi.fn();

        closeButtonClickHandler(setIsDisappearring, 300, setIsShowChangeLanguage);

        expect(setIsDisappearring).toHaveBeenCalledWith(true);
        expect(setIsShowChangeLanguage).not.toHaveBeenCalled();

        vi.useRealTimers();
    });

    it("После transitionTime скрывает модалку и сбрасывает isDisappearring", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowChangeLanguage = vi.fn();

        closeButtonClickHandler(setIsDisappearring, 300, setIsShowChangeLanguage);

        vi.advanceTimersByTime(300);

        expect(setIsShowChangeLanguage).toHaveBeenCalledWith(false);
        expect(setIsDisappearring).toHaveBeenCalledWith(false);

        vi.useRealTimers();
    });
});