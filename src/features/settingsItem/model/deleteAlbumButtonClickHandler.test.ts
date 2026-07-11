import { describe, it, expect, vi } from "vitest";
import { deleteAlbumButtonClickHandler } from "./deleteAlbumButtonClickHandler";

describe("deleteAlbumButtonClickHandler - обработчик удаления аватара", () => {
    it("Очищает input, сбрасывает avatarUrl и вызывает setLoadedFile", () => {
        const input = document.createElement("input");
        input.value = "avatar.png";
        const ref = { current: input };
        const setEntityInfo = vi.fn();
        const setLoadedFile = vi.fn();
        const onAvatarDelete = vi.fn();

        deleteAlbumButtonClickHandler(
            ref,
            setEntityInfo,
            setLoadedFile,
            "avatarUrl",
            onAvatarDelete
        );

        expect(input.value).toBe("");
        expect(setLoadedFile).toHaveBeenCalledWith(undefined);
        expect(onAvatarDelete).toHaveBeenCalled();

        const updater = setEntityInfo.mock.calls[0][0];
        expect(updater({ avatarUrl: "blob:url", name: "test" })).toEqual({
            avatarUrl: "",
            name: "test"
        });
    });

    it("Работает без setLoadedFile", () => {
        const input = document.createElement("input");
        input.value = "file.png";
        const ref = { current: input };
        const setEntityInfo = vi.fn();

        expect(() => deleteAlbumButtonClickHandler(ref, setEntityInfo)).not.toThrow();
        expect(input.value).toBe("");
    });

    it("Не делает ничего если ref.current равен null", () => {
        const ref = { current: null };
        const setEntityInfo = vi.fn();
        const setLoadedFile = vi.fn();

        deleteAlbumButtonClickHandler(ref, setEntityInfo, setLoadedFile);

        expect(setEntityInfo).not.toHaveBeenCalled();
        expect(setLoadedFile).not.toHaveBeenCalled();
    });
});
