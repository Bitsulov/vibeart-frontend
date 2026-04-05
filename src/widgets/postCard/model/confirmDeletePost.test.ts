import {describe, it, expect, vi} from "vitest";
import {confirmDeletePost} from "./confirmDeletePost";

describe("confirmDeletePost - переходит в профиль автора после удаления", () => {
    it("Вызывает navigate с путем к профилю автора", () => {
        const navigate = vi.fn();
        confirmDeletePost(navigate, "01ARZ3NDEKTSV4RRFFQ69G5FAV");
        expect(navigate).toHaveBeenCalledWith("/profile/01ARZ3NDEKTSV4RRFFQ69G5FAV");
    });
});
