import { describe, it, expect, vi } from "vitest";
import { deletePostSuccessHandler } from "./deletePostSuccessHandler";

describe("deletePostSuccessHandler - переходит на страницу автора после удаления поста", () => {
    it("Вызывает navigate с адресом страницы автора", () => {
        const navigate = vi.fn();

        deletePostSuccessHandler(
            navigate,
            "/profile/00000000-0000-4000-8000-00000000000b"
        );

        expect(navigate).toHaveBeenCalledWith(
            "/profile/00000000-0000-4000-8000-00000000000b"
        );
    });
});
