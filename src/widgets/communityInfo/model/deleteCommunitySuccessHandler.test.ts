import { describe, it, expect, vi } from "vitest";
import { deleteCommunitySuccessHandler } from "./deleteCommunitySuccessHandler";

describe("deleteCommunitySuccessHandler - перенаправление после удаления сообщества", () => {
    it("Вызывает navigate на /communities с replace", () => {
        const navigate = vi.fn();

        deleteCommunitySuccessHandler(navigate);

        expect(navigate).toHaveBeenCalledWith("/communities", { replace: true });
    });
});
