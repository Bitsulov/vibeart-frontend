import {describe, expect, it} from "vitest";
import {createCommunity} from "./createCommunity";
import {createUser} from "entities/user";

describe("createCommunity - Возвращает объект типа CommunityType", () => {
    it("Создание экземпляра сообщества", () => {
        expect(createCommunity({
            id: 1,
            ULID: "hgghghgh",
            // @ts-ignore
            owner: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            username: "",
            title: "",
            description: "",
            posts: 0,
            subscribers: 0,
            subscribes: 0,
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            albumsList: []
        })).toEqual({
            id: 1,
            ULID: "hgghghgh",
            // @ts-ignore
            owner: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            username: "",
            title: "",
            description: "",
            posts: 0,
            subscribers: 0,
            subscribes: 0,
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            albumsList: []
        });
    });
    it("Создание экземпляра сообщества с неполными данными", () => {
        // @ts-ignore
        expect(createCommunity({
            ULID: "gfgfgf",
            // @ts-ignore
            owner: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            username: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 0,
            ULID: "gfgfgf",
            // @ts-ignore
            owner: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            username: "",
            title: "",
            description: "",
            posts: 0,
            subscribers: 0,
            subscribes: 0,
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            albumsList: []
        });
    });
});
