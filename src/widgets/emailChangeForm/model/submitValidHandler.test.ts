import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";

describe("submitValidHandler - успешная отправка формы изменения email", () => {
    it("Вызывает submitFn", () => {
        const submitFn = vi.fn();

        submitValidHandler("new@example.com", "UUID test", submitFn);

        expect(submitFn).toHaveBeenCalledWith({
            UUID: "UUID test",
            data: { email: "new@example.com" }
        });
    });
});
