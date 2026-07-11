import { describe, it, expect, vi } from "vitest";
import { deleteUserButtonClickHandler } from "./deleteUserButtonClickHandler";

describe("deleteUserButtonClickHandler - обрабатывает нажатие кнопки удаления аккаунта", () => {
    it("Открывает окно подтверждения удаления", () => {
        const setIsShowModel = vi.fn();

        deleteUserButtonClickHandler(setIsShowModel);

        expect(setIsShowModel).toHaveBeenCalledWith(true);
    });
});
