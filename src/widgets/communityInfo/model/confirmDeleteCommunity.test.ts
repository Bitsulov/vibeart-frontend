import { describe, it, expect, vi } from "vitest";
import { confirmDeleteCommunity } from "./confirmDeleteCommunity";

describe("confirmDeleteCommunity - удаление сообщества после подтверждения", () => {
    it("Вызывает deleteFn с UUID сообщества", async () => {
        const deleteFn = vi.fn().mockResolvedValue({ data: "ok" });
        const UUID = "00000000-0000-4000-8000-00000000001d";

        await confirmDeleteCommunity(UUID, deleteFn);

        expect(deleteFn).toHaveBeenCalledWith(UUID);
    });
});
