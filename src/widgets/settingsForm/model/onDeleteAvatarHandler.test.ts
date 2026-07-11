import { describe, it, expect, vi } from "vitest";
import { onDeleteAvatarHandler } from "./onDeleteAvatarHandler";

describe("onDeleteAvatarHandler - обрабатывает нажатие кнопки удаления аватара", () => {
    it("Устанавливает признак удаления аватара в true", () => {
        const setIsDeleteAvatar = vi.fn();

        onDeleteAvatarHandler(setIsDeleteAvatar);

        expect(setIsDeleteAvatar).toHaveBeenCalledWith(true);
    });
});
