import { describe, it, expect, vi } from "vitest";
import { addSelectedPostsHandler } from "./addSelectedPostsHandler";

describe("addSelectedPostsHandler - отправляет выбранные посты на добавление в альбом", () => {
    it("Вызывает мутацию с UUID альбома и списком выбранных постов", () => {
        const addPostsFn = vi.fn();

        addSelectedPostsHandler(addPostsFn, "album-uuid", ["post-1", "post-2"]);

        expect(addPostsFn).toHaveBeenCalledWith({
            UUID: "album-uuid",
            data: ["post-1", "post-2"]
        });
    });
});
