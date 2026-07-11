import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PrincipalUserState } from "../lib/types";

const initialState: PrincipalUserState = {
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
};

/**
 * Redux-слайс для управления состоянием авторизованного пользователя.
 *
 * Начальное состояние описывает неавторизованного пользователя
 * с пустыми полями и флагом `isAuthenticated: false`.
 */
export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        /**
         * Обновляет только явно переданные поля профиля пользователя,
         * не затрагивая остальные.
         *
         * Поля проверяются на `undefined` поштучно вместо `Object.assign`,
         * чтобы намеренная передача `null` не была воспринята как отсутствие значения.
         *
         * @param action.payload - Частичный объект `UserType` с полями для обновления.
         *
         * @example
         * dispatch(setUserInfo({ isAuthenticated: true, UUID: "01ARZ..." }));
         */
        setUserInfo(state, action: PayloadAction<Partial<typeof initialState>>) {
            if (action.payload.UUID !== undefined) state.UUID = action.payload.UUID;
            if (action.payload.email !== undefined) state.email = action.payload.email;
            if (action.payload.name !== undefined) state.name = action.payload.name;
            if (action.payload.username !== undefined)
                state.username = action.payload.username;
            if (action.payload.trustStatus !== undefined)
                state.trustStatus = action.payload.trustStatus;
            if (action.payload.isAuthenticated !== undefined)
                state.isAuthenticated = action.payload.isAuthenticated;
            if (action.payload.isBlocked !== undefined)
                state.isBlocked = action.payload.isBlocked;
            if (action.payload.role !== undefined) state.role = action.payload.role;
            if (action.payload.avatarUrl !== undefined)
                state.avatarUrl = action.payload.avatarUrl;
            if (action.payload.accessToken !== undefined)
                state.accessToken = action.payload.accessToken;
            if (action.payload.refreshToken !== undefined)
                state.refreshToken = action.payload.refreshToken;
            if (action.payload.accessTokenExpiresIn !== undefined)
                state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn;
            if (action.payload.refreshTokenExpiresIn !== undefined)
                state.refreshTokenExpiresIn = action.payload.refreshTokenExpiresIn;
        }
    }
});

export const { setUserInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
