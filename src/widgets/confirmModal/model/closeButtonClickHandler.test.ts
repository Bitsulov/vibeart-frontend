import {describe, it, expect, vi, afterEach} from "vitest";
import {closeButtonClickHandler} from "./closeButtonClickHandler";

describe("closeButtonClickHandler - обработчик закрытия модалки подтверждения", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Немедленно устанавливает isDisappearring в true", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();

        closeButtonClickHandler(setIsDisappearring, 300, setIsShowModal);

        expect(setIsDisappearring).toHaveBeenCalledWith(true);
        expect(setIsShowModal).not.toHaveBeenCalled();
    });

    it("После transitionTime скрывает модалку и сбрасывает isDisappearring", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();

        closeButtonClickHandler(setIsDisappearring, 300, setIsShowModal);
        vi.advanceTimersByTime(300);

        expect(setIsShowModal).toHaveBeenCalledWith(false);
        expect(setIsDisappearring).toHaveBeenCalledWith(false);
    });
});
