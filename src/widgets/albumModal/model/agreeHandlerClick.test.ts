import {describe, it, expect, vi, afterEach} from "vitest";
import {agreeHandlerClick} from "./agreeHandlerClick";

describe("agreeHandlerClick - запускает закрытие модалки и вызывает confirmFn", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Немедленно устанавливает isDisappearring в true", () => {
        vi.useFakeTimers();
        const func = vi.fn();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();

        agreeHandlerClick(func, setIsDisappearring, 300, setIsShowModal);

        expect(setIsDisappearring).toHaveBeenCalledWith(true);
        expect(setIsShowModal).not.toHaveBeenCalled();
        expect(func).not.toHaveBeenCalled();
    });

    it("После transitionTime закрывает модалку, сбрасывает анимацию и вызывает func", () => {
        vi.useFakeTimers();
        const func = vi.fn();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();

        agreeHandlerClick(func, setIsDisappearring, 300, setIsShowModal);
        vi.advanceTimersByTime(300);

        expect(setIsShowModal).toHaveBeenCalledWith(false);
        expect(setIsDisappearring).toHaveBeenCalledWith(false);
        expect(func).toHaveBeenCalled();
    });
});
