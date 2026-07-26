import { describe, it, expect, vi } from "vitest";
import { confirmDeletePost } from "./confirmDeletePost";

describe("confirmDeletePost - удаляет пост после подтверждения", () => {
    it("Вызывает deleteFn с UUID поста", async () => {
        const deleteFn = vi.fn().mockResolvedValue({ data: "ok" });

        await confirmDeletePost("00000000-0000-4000-8000-00000000000b", deleteFn);

        expect(deleteFn).toHaveBeenCalledWith("00000000-0000-4000-8000-00000000000b");
    });
});
