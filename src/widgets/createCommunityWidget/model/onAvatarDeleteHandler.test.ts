import { describe, it, expect, vi } from "vitest";
import { onAvatarDeleteHandler } from "./onAvatarDeleteHandler";

describe("onAvatarDeleteHandler - обрабатывает нажатие кнопки удаления аватара сообщества", () => {
    it("Устанавливает признак удаления аватара в true", () => {
        const setIsDeleteAvatar = vi.fn();

        onAvatarDeleteHandler(setIsDeleteAvatar);

        expect(setIsDeleteAvatar).toHaveBeenCalledWith(true);
    });
});
