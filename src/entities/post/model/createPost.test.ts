import {describe, expect, it} from "vitest";
import {createPost} from "./createPost";
import {createUser} from "entities/user";

describe("createPost - Возвращает объект типа PostType", () => {
    it("Создание экземпляра поста", () => {
        expect(createPost({
            id: 0,
            ULID: "hghghhg",
            name: "",
            description: "",
            // @ts-expect-error неполная информация
            author: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            likes: 0,
            comments: 0,
            reports: 0,
            tagsList: [],
            commentList: [],
            checkStatus: "unchecked",
            AIStatus: "good",
            imageUrl: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 0,
            ULID: "hghghhg",
            name: "",
            description: "",
            // @ts-expect-error неполная информация
            author: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            likes: 0,
            comments: 0,
            reports: 0,
            tagsList: [],
            commentList: [],
            checkStatus: "unchecked",
            AIStatus: "good",
            imageUrl: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
    it("Создание экземпляра поста с неполными данными", () => {
        // @ts-expect-error неполная информация
        expect(createPost({
            ULID: "hghghhg",
            // @ts-expect-error неполная информация
            author: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            imageUrl: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 0,
            ULID: "hghghhg",
            name: "",
            description: "",
            // @ts-expect-error неполная информация
            author: createUser({id: 1, ULID: "321312312", email: "@", createdAt: ""}),
            likes: 0,
            comments: 0,
            reports: 0,
            tagsList: [],
            commentList: [],
            checkStatus: "unchecked",
            AIStatus: "good",
            imageUrl: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
});
