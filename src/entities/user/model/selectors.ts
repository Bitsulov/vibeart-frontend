import type {UserType} from "../lib/types";
import type {RootState} from "app/store";
import {createSelector} from "@reduxjs/toolkit";

/** Возвращает полный объект пользователя из Redux-стора. */
export const selectUser = (state: RootState): UserType => state.user;

/** Возвращает флаг авторизации пользователя. */
export const selectIsAuthenticated = (state: RootState): boolean => state.user.isAuthenticated;

/** Возвращает мемоизированный объект с данными профиля пользователя. */
export const selectUserInfo = createSelector([selectUser], user => {
    return {
        id: user.id,
        ULID: user.ULID,
        email: user.email,
        name: user.name,
        username: user.username,
        description: user.description,
        worksCount: user.worksCount,
        subscribersCount: user.subscribersCount,
        subscribesCount: user.subscribesCount,
        albumList: user.albumList,
        createdAt: user.createdAt,
        trustStatus: user.trustStatus,
        isAuthenticated: user.isAuthenticated,
        isBlocked: user.isBlocked,
        onlineStatus: user.onlineStatus,
        role: user.role,
        avatarUrl: user.avatarUrl
    };
});
