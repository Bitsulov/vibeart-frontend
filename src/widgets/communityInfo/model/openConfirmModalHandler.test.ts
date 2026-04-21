import {describe, it, expect, vi} from "vitest";
import {openConfirmModalHandler} from "./openConfirmModalHandler";

describe("openConfirmModalHandler - открытие модального окна подтверждения", () => {
    it("Вызывает setIsShow с true", () => {
        const setIsShow = vi.fn();

        openConfirmModalHandler(setIsShow);

        expect(setIsShow).toHaveBeenCalledWith(true);
    });
});
