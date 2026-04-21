import {describe, it, expect, vi} from "vitest";
import {openDescriptionHandler} from "./openDescriptionHandler";

describe("openDescriptionHandler - открытие модального окна описания", () => {
    it("Вызывает setIsOpenedModal с true", () => {
        const setIsOpenedModal = vi.fn();

        openDescriptionHandler(setIsOpenedModal);

        expect(setIsOpenedModal).toHaveBeenCalledWith(true);
    });
});
