import { describe, expect, it } from "vitest";
import { setUserInfo, userReducer } from "./userSlice";
import type { PrincipalUserState } from "../lib/types";

const initialState: PrincipalUserState = {
    UUID: "",
    name: "",
    email: "a",
    username: "",
    avatarUrl: "",
    role: "USER",
    trustStatus: "UNTRUST",
    isAuthenticated: false,
    isBlocked: true,
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0
};

describe("userSlice - слайс с данными текущего пользователя", () => {
    it("Изменение данных пользователя", () => {
        const result = userReducer(
            initialState,
            setUserInfo({
                UUID: "00000000-0000-4000-8000-00000000000b",
                name: "testUser",
                email: "testUser@gmail.com",
                username: "test_user",
                trustStatus: "UNTRUST",
                isAuthenticated: true,
                isBlocked: false,
                role: "ADMIN",
                avatarUrl: "/img/avatar.png"
            })
        );

        expect(result).toEqual({
            ...initialState,
            UUID: "00000000-0000-4000-8000-00000000000b",
            name: "testUser",
            email: "testUser@gmail.com",
            username: "test_user",
            trustStatus: "UNTRUST",
            isAuthenticated: true,
            isBlocked: false,
            role: "ADMIN",
            avatarUrl: "/img/avatar.png"
        });
    });

    it("Частичное изменение данных пользователя", () => {
        const result = userReducer(
            initialState,
            setUserInfo({
                UUID: "00000000-0000-4000-8000-000000000007",
                name: "testUser2",
                avatarUrl: "/img/avatar2.png"
            })
        );

        expect(result).toEqual({
            ...initialState,
            UUID: "00000000-0000-4000-8000-000000000007",
            name: "testUser2",
            avatarUrl: "/img/avatar2.png"
        });
    });
});
