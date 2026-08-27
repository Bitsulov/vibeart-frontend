import { describe, it, expect, vi } from "vitest";
import { deleteAlbumSuccessHandler } from "./deleteAlbumSuccessHandler";

describe("deleteAlbumSuccessHandler - навигация к автору после удаления альбома", () => {
    it("Переходит на страницу профиля пользователя", () => {
        const navigate = vi.fn();
        const UUID = "00000000-0000-4000-8000-00000000000b";

        deleteAlbumSuccessHandler(navigate, UUID, false);

        expect(navigate).toHaveBeenCalledWith(`/profile/${UUID}`);
    });

    it("Переходит на страницу сообщества, если автор альбома — сообщество", () => {
        const navigate = vi.fn();
        const UUID = "00000000-0000-4000-8000-00000000001d";

        deleteAlbumSuccessHandler(navigate, UUID, true);

        expect(navigate).toHaveBeenCalledWith(`/communities/${UUID}`);
    });
});
