import {describe, it, expect, vi} from "vitest";
import {deleteButtonClickHandler} from "./deleteButtonClickHandler";

describe("deleteButtonClickHandler - открывает модальное окно подтверждения", () => {
    it("Устанавливает isShowModal в true", () => {
        const setIsShowModal = vi.fn();
        deleteButtonClickHandler(setIsShowModal);
        expect(setIsShowModal).toHaveBeenCalledWith(true);
    });
});
