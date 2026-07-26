import { describe, it, expect, vi } from "vitest";
import { reportClickHandler } from "./reportClickHandler";

describe("reportClickHandler - отправляет жалобу один раз", () => {
    it("Вызывает reportFn с UUID поста, если жалоба ещё не отправлена", async () => {
        const reportFn = vi.fn().mockResolvedValue({ data: "ok" });

        await reportClickHandler(false, "test-uuid", reportFn);

        expect(reportFn).toHaveBeenCalledWith("test-uuid");
    });

    it("Не вызывает reportFn, если жалоба уже отправлена", async () => {
        const reportFn = vi.fn().mockResolvedValue({ data: "ok" });

        await reportClickHandler(true, "test-uuid", reportFn);

        expect(reportFn).not.toHaveBeenCalled();
    });
});
