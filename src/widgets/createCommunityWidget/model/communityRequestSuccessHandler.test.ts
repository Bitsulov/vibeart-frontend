import { describe, it, expect, vi } from "vitest";
import { communityRequestSuccessHandler } from "./communityRequestSuccessHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { CommunityResponse } from "entities/community";

function createResponse(uuid: string): AxiosResponse<CommunityResponse> {
    return { data: { uuid } } as AxiosResponse<CommunityResponse>;
}

describe("communityRequestSuccessHandler - переход на страницу сообщества и уведомление об успехе", () => {
    it("Переходит на страницу созданного сообщества и показывает уведомление о создании", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();

        communityRequestSuccessHandler(
            createResponse("test-uuid"),
            navigate,
            dispatch,
            true
        );

        expect(navigate).toHaveBeenCalledWith("/communities/test-uuid", {
            replace: true
        });
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.communityCreatedSuccess", type: "success" }
        });
    });

    it("Переходит на страницу обновлённого сообщества и показывает уведомление об обновлении", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();

        communityRequestSuccessHandler(
            createResponse("test-uuid"),
            navigate,
            dispatch,
            false
        );

        expect(navigate).toHaveBeenCalledWith("/communities/test-uuid", {
            replace: true
        });
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.communityUpdatedSuccess", type: "success" }
        });
    });
});
