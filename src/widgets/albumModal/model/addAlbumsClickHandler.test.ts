import {describe, it, expect, vi, afterEach} from "vitest";
import {addAlbumsClickHandler} from "./addAlbumsClickHandler";

describe("addAlbumsClickHandler - закрывает модальное окно добавления постов в альбом", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Немедленно устанавливает isDisappearring в true", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();
        const setSelectedPosts = vi.fn();

        addAlbumsClickHandler(setIsDisappearring, 300, setIsShowModal, setSelectedPosts);

        expect(setIsDisappearring).toHaveBeenCalledWith(true);
        expect(setIsShowModal).not.toHaveBeenCalled();
        expect(setSelectedPosts).not.toHaveBeenCalled();
    });

    it("После transitionTime скрывает модальное окно и сбрасывает isDisappearring", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();
        const setSelectedPosts = vi.fn();

        addAlbumsClickHandler(setIsDisappearring, 300, setIsShowModal, setSelectedPosts);
        vi.advanceTimersByTime(300);

        expect(setIsShowModal).toHaveBeenCalledWith(false);
        expect(setIsDisappearring).toHaveBeenCalledWith(false);
    });

    it("После transitionTime сбрасывает список выбранных постов", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();
        const setSelectedPosts = vi.fn();

        addAlbumsClickHandler(setIsDisappearring, 300, setIsShowModal, setSelectedPosts);
        vi.advanceTimersByTime(300);

        expect(setSelectedPosts).toHaveBeenCalledWith([]);
    });

    it("До истечения transitionTime ничего не закрывает и не сбрасывает", () => {
        vi.useFakeTimers();
        const setIsDisappearring = vi.fn();
        const setIsShowModal = vi.fn();
        const setSelectedPosts = vi.fn();

        addAlbumsClickHandler(setIsDisappearring, 300, setIsShowModal, setSelectedPosts);
        vi.advanceTimersByTime(299);

        expect(setIsShowModal).not.toHaveBeenCalled();
        expect(setSelectedPosts).not.toHaveBeenCalled();
    });
});
