import {describe, expect, it, vi} from "vitest";
import {postClickHandler} from "./postClickHandler";

describe("postClickHandler - переход на страницу поста", () => {
    it("Вызывает navigate с путём /post/:ULID", () => {
        const navigate = vi.fn();

        postClickHandler(navigate, "01ARZ3NDEKTSV4RRFFQ69G5FAV");

        expect(navigate).toHaveBeenCalledWith("/post/01ARZ3NDEKTSV4RRFFQ69G5FAV");
    });
});
