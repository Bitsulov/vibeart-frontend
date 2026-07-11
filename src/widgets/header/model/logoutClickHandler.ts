import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import { setUserInfo } from "entities/user";
import { clearCookiesTokens } from "shared/lib/clearCookiesTokens";
import type { QueryClient } from "@tanstack/react-query";

/**
 * Обрабатывает нажатие кнопки выхода из аккаунта в шапке сайта: очищает
 * куки-файлы с токенами, сбрасывает состояние пользователя в хранилище,
 * сбрасывает кеш и перенаправляет на страницу входа.
 *
 * @param navigate - Функция навигации React Router.
 * @param dispatch - Функция записи данных в Redux.
 * @param queryClient - Клиент TanStack Query для сброса кеша.
 */
export function logoutClickHandler(
    navigate: NavigateFunction,
    dispatch: Dispatch,
    queryClient: QueryClient
) {
    clearCookiesTokens();
    dispatch(
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
    queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/auth");
}
