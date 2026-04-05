import {describe, it, expect, vi} from "vitest";
import {returnBackHandler} from "./returnBackHandler";

describe("returnBackHandler - навигация назад", () => {
    it("Вызывает navigate(-1)", () => {
        const navigate = vi.fn();
        returnBackHandler(navigate);
        expect(navigate).toHaveBeenCalledWith(-1);
    });
});
