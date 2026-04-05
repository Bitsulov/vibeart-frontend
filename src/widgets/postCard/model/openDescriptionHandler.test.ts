import {describe, it, expect, vi} from "vitest";
import {openDescriptionHandler} from "./openDescriptionHandler";

describe("openDescriptionHandler - раскрывает описание поста", () => {
    it("Устанавливает isOpened в true", () => {
        const setIsOpened = vi.fn();
        openDescriptionHandler(setIsOpened);
        expect(setIsOpened).toHaveBeenCalledWith(true);
    });
});
