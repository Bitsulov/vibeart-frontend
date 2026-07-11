import { describe, it, expect, vi } from "vitest";
import { logoutClickHandler } from "./logoutClickHandler";
import { setUserInfo } from "entities/user";
import type { QueryClient } from "@tanstack/react-query";

vi.mock("shared/lib/clearCookiesTokens", () => ({
    clearCookiesTokens: vi.fn()
}));

import { clearCookiesTokens } from "shared/lib/clearCookiesTokens";

const mockQueryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

describe("logoutClickHandler - обрабатывает нажатие кнопки выхода в бургер-меню", () => {
    it("Очищает куки-файлы с токенами", () => {
        logoutClickHandler(vi.fn(), vi.fn(), mockQueryClient);

        expect(clearCookiesTokens).toHaveBeenCalledOnce();
    });

    it("Сбрасывает состояние пользователя в Redux", () => {
        const dispatch = vi.fn();

        logoutClickHandler(vi.fn(), dispatch, mockQueryClient);

        expect(dispatch).toHaveBeenCalledWith(
            setUserInfo({
                UUID: "",
                email: "",
                name: "",
                username: "",
                trustStatus: "TRUST",
                isAuthenticated: false,
                isBlocked: false,
                role: "USER",
                avatarUrl: "",
                accessToken: "",
                refreshToken: "",
                accessTokenExpiresIn: 0,
                refreshTokenExpiresIn: 0
            })
        );
    });

    it("Сбрасывает кеш пользователя в TanStack Query", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        logoutClickHandler(vi.fn(), vi.fn(), queryClient);

        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
            queryKey: ["user"]
        });
    });

    it("Перенаправляет на страницу авторизации", () => {
        const navigate = vi.fn();

        logoutClickHandler(navigate, vi.fn(), mockQueryClient);

        expect(navigate).toHaveBeenCalledWith("/auth");
    });
});
