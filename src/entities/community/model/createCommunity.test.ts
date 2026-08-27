import { describe, expect, it } from "vitest";
import { createCommunity } from "./createCommunity";
import { createUser } from "entities/user";

describe("createCommunity - Возвращает объект типа CommunityType", () => {
    it("Создание экземпляра сообщества", () => {
        expect(
            createCommunity({
                UUID: "hgghghgh",
                // @ts-expect-error неполная информация
                owner: createUser({ UUID: "321312312", email: "@", createdAt: "" }),
                username: "",
                title: "",
                description: "",
                posts: 0,
                subscribers: 0,
                subscribes: 0,
                createdAt: "2026-03-29T17:25:15.940Z",
                imageUrl: "",
                albumsList: [],
                admins: [],
                isSubscribed: false,
                isBlocked: false,
                trustStatus: "TRUST"
            })
        ).toEqual({
            UUID: "hgghghgh",
            // @ts-expect-error неполная информация
            owner: createUser({ UUID: "321312312", email: "@", createdAt: "" }),
            username: "",
            title: "",
            description: "",
            posts: 0,
            subscribers: 0,
            subscribes: 0,
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            albumsList: [],
            admins: [],
            isSubscribed: false,
            isBlocked: false,
            trustStatus: "TRUST"
        });
    });
    it("Создание экземпляра сообщества с неполными данными", () => {
        expect(
            // @ts-expect-error неполная информация
            createCommunity({
                UUID: "gfgfgf",
                // @ts-expect-error неполная информация
                owner: createUser({ UUID: "321312312", email: "@", createdAt: "" }),
                username: "",
                createdAt: "2026-03-29T17:25:15.940Z"
            })
        ).toEqual({
            UUID: "gfgfgf",
            // @ts-expect-error неполная информация
            owner: createUser({ UUID: "321312312", email: "@", createdAt: "" }),
            username: "",
            title: "",
            description: "",
            posts: 0,
            subscribers: 0,
            subscribes: 0,
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            albumsList: [],
            admins: [],
            isSubscribed: false,
            isBlocked: false,
            trustStatus: "TRUST"
        });
    });
});
