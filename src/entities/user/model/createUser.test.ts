import { describe, expect, it } from "vitest";
import { createUser } from "./createUser";

describe("createUser - Возвращает объект типа UserType", () => {
    it("Создание экземпляра пользователя", () => {
        expect(
            createUser({
                UUID: "gfgfgf",
                name: "",
                username: "fgfgf",
                description: "",
                worksCount: 0,
                subscribersCount: 0,
                subscribesCount: 0,
                albumList: [],
                createdAt: "2026-03-29T17:25:15.940Z",
                trustStatus: "TRUST",
                isAuthenticated: false,
                isBlocked: false,
                onlineStatus: "OFFLINE",
                role: "USER",
                avatarUrl: ""
            })
        ).toEqual({
            UUID: "gfgfgf",
            name: "",
            username: "@fgfgf",
            description: "",
            worksCount: 0,
            subscribersCount: 0,
            subscribesCount: 0,
            albumList: [],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "TRUST",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: "OFFLINE",
            role: "USER",
            avatarUrl: ""
        });
    });
    it("Создание экземпляра пользователя с неполными данными", () => {
        expect(
            // @ts-expect-error неполная информация
            createUser({
                UUID: "gfgfgf",
                username: "gfgf",
                createdAt: "2026-03-29T17:25:15.940Z",
                trustStatus: "TRUST",
                isAuthenticated: false,
                isBlocked: false,
                onlineStatus: "OFFLINE"
            })
        ).toEqual({
            UUID: "gfgfgf",
            name: "",
            username: "@gfgf",
            description: "",
            worksCount: 0,
            subscribersCount: 0,
            subscribesCount: 0,
            albumList: [],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "TRUST",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: "OFFLINE",
            role: "USER",
            avatarUrl: ""
        });
    });
});
