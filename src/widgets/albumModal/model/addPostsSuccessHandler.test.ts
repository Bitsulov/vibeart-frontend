import { describe, it, expect, vi } from "vitest";
import { addPostsSuccessHandler } from "./addPostsSuccessHandler";
import { showToast } from "features/toast";
import type { QueryClient } from "@tanstack/react-query";

describe("addPostsSuccessHandler - обрабатывает успешное добавление публикаций в альбом", () => {
    it("Сбрасывает кэш постов альбома", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;
        const dispatch = vi.fn();

        addPostsSuccessHandler(
            queryClient,
            "album-uuid",
            dispatch,
            vi.fn(),
            300,
            vi.fn(),
            vi.fn()
        );

        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
            queryKey: ["album posts album-uuid"]
        });
    });

    it("Показывает уведомление об успехе", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;
        const dispatch = vi.fn();

        addPostsSuccessHandler(
            queryClient,
            "album-uuid",
            dispatch,
            vi.fn(),
            300,
            vi.fn(),
            vi.fn()
        );

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.postsAddedToAlbumSuccess", type: "success" }
        });
    });

    it("Запускает закрытие модального окна", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;
        const setIsDisappearring = vi.fn();

        addPostsSuccessHandler(
            queryClient,
            "album-uuid",
            vi.fn(),
            setIsDisappearring,
            300,
            vi.fn(),
            vi.fn()
        );

        expect(setIsDisappearring).toHaveBeenCalledWith(true);
    });
});
