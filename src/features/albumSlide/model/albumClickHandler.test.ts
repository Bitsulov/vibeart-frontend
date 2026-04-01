import {describe, expect, it, vi} from "vitest";
import {albumClickHandler} from "./albumClickHandler";

describe("albumClickHandler - клик обработчик albumSlide", () => {
    it("Вызов функции", () => {
        const setSelectedAlbum = vi.fn();

        albumClickHandler(setSelectedAlbum, "ULID");

        expect(setSelectedAlbum).toHaveBeenCalledWith("ULID");
    })
});
