import { describe, it, expect, vi } from "vitest";
import { postRequestSuccessHandler } from "./postRequestSuccessHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { PostResponse } from "entities/post";

function createResponse(uuid: string): AxiosResponse<PostResponse> {
    return { data: { uuid } } as AxiosResponse<PostResponse>;
}

describe("postRequestSuccessHandler - переход на страницу поста и уведомление об успехе", () => {
    it("Переходит на страницу созданного поста и показывает уведомление о создании", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();

        postRequestSuccessHandler(createResponse("test-uuid"), navigate, dispatch, true);

        expect(navigate).toHaveBeenCalledWith("/post/test-uuid", { replace: true });
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.postCreatedSuccess", type: "success" }
        });
    });

    it("Переходит на страницу обновлённого поста и показывает уведомление об обновлении", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();

        postRequestSuccessHandler(createResponse("test-uuid"), navigate, dispatch, false);

        expect(navigate).toHaveBeenCalledWith("/post/test-uuid", { replace: true });
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.postUpdatedSuccess", type: "success" }
        });
    });
});
