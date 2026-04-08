import {describe, it, expect, vi} from "vitest";
import {addPostsAlbumHandler} from "./addPostsAlbumHandler";

describe("addPostsAlbumHandler - открывает модальное окно добавления постов в альбом", () => {
    it("Устанавливает isShowAlbumModal в true", () => {
        const setIsShowAlbumModal = vi.fn();

        addPostsAlbumHandler(setIsShowAlbumModal);

        expect(setIsShowAlbumModal).toHaveBeenCalledWith(true);
    });
});
