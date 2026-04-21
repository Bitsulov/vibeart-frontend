import {describe, it, expect, vi} from "vitest";
import {deleteCommunityClickHandler} from "./deleteCommunityClickHandler";

describe("deleteCommunityClickHandler - перенаправление после удаления сообщества", () => {
    it("Вызывает navigate на /communities с replace", () => {
        const navigate = vi.fn();

        deleteCommunityClickHandler(navigate);

        expect(navigate).toHaveBeenCalledWith("/communities", {replace: true});
    });
});
