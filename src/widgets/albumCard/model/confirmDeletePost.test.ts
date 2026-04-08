import {describe, it, expect, vi} from "vitest";
import {confirmDeletePost} from "./confirmDeletePost";

describe("confirmDeletePost - навигация к профилю автора после удаления альбома", () => {
    it("Вызывает navigate с правильным URL профиля", () => {
        const navigate = vi.fn();
        const ULID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";

        confirmDeletePost(navigate, ULID);

        expect(navigate).toHaveBeenCalledWith(`/profile/${ULID}`);
    });
});
