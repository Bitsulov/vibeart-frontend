import {describe, it, expect, vi} from "vitest";
import {deleteChatClickHandler} from "./deleteChatClickHandler";

describe("deleteChatClickHandler - открывает модальное окно удаления чата", () => {
    it("Вызывает setIsShowModal(true)", () => {
        const setIsShowModal = vi.fn();
        deleteChatClickHandler(setIsShowModal);
        expect(setIsShowModal).toHaveBeenCalledWith(true);
    });
});
