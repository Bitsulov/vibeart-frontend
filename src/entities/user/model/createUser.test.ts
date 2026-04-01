import {describe, expect, it} from "vitest";
import {createUser} from "./createUser";

describe("createTag - Возвращает объект типа TagType", () => {
    it("Создание экземпляра тега", () => {
        expect(createUser({
            id: 0,
            ULID: "gfgfgf",
            name: "",
            email: "a",
            username: "fgfgf",
            description: "",
            worksCount: 0,
            subscribersCount: 0,
            subscribesCount: 0,
            albumList: [],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "trust",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: "offline",
            role: "user",
            avatarUrl: ""
        })).toEqual({
            id: 0,
            ULID: "gfgfgf",
            name: "",
            email: "a",
            username: "@fgfgf",
            description: "",
            worksCount: 0,
            subscribersCount: 0,
            subscribesCount: 0,
            albumList: [],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "trust",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: "offline",
            role: "user",
            avatarUrl: ""
        });
    });
    it("Создание экземпляра тега с неполными данными", () => {
        // @ts-ignore
        expect(createUser({
            ULID: "gfgfgf",
            email: "a",
            username: "gfgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "trust",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: "offline",
        })).toEqual({
            id: 0,
            ULID: "gfgfgf",
            name: "",
            email: "a",
            username: "@gfgf",
            description: "",
            worksCount: 0,
            subscribersCount: 0,
            subscribesCount: 0,
            albumList: [],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "trust",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: "offline",
            role: "user",
            avatarUrl: ""
        });
    });
});
