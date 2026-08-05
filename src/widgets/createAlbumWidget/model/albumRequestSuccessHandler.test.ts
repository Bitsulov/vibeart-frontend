import { describe, it, expect, vi } from "vitest";
import { albumRequestSuccessHandler } from "./albumRequestSuccessHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { AlbumResponse } from "entities/album";

function createResponse(uuid: string): AxiosResponse<AlbumResponse> {
    return { data: { uuid } } as AxiosResponse<AlbumResponse>;
}

describe("albumRequestSuccessHandler - переход на страницу альбома и уведомление об успехе", () => {
    it("Переходит на страницу созданного альбома и показывает уведомление о создании", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();

        albumRequestSuccessHandler(createResponse("test-uuid"), navigate, dispatch, true);

        expect(navigate).toHaveBeenCalledWith("/album/test-uuid", { replace: true });
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.albumCreatedSuccess", type: "success" }
        });
    });

    it("Переходит на страницу обновлённого альбома и показывает уведомление об обновлении", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();

        albumRequestSuccessHandler(
            createResponse("test-uuid"),
            navigate,
            dispatch,
            false
        );

        expect(navigate).toHaveBeenCalledWith("/album/test-uuid", { replace: true });
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.albumUpdatedSuccess", type: "success" }
        });
    });
});
