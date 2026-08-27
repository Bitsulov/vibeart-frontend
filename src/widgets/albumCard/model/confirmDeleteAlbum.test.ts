import { describe, it, expect, vi } from "vitest";
import { confirmDeleteAlbum } from "./confirmDeleteAlbum";

describe("confirmDeleteAlbum - удаление альбома после подтверждения", () => {
    it("Вызывает deleteFn с UUID альбома", async () => {
        const deleteFn = vi.fn().mockResolvedValue({ data: "ok" });
        const UUID = "00000000-0000-4000-8000-00000000000c";

        await confirmDeleteAlbum(UUID, deleteFn);

        expect(deleteFn).toHaveBeenCalledWith(UUID);
    });
});
