import {describe, expect, it} from "vitest";
import {createAlbum} from "./createAlbum";

describe("createAlbum - Возвращает объект типа AlbumType", () => {
    it("Создание экземпляра альбома", () => {
        expect(createAlbum({
            id: 1,
            name: "Альбом",
            ULID: "gfjhfhgfhgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            description: "",
            postCount: 0,
            postsList: [],
        })).toEqual({
            id: 1,
            name: "Альбом",
            ULID: "gfjhfhgfhgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            description: "",
            postCount: 0,
            postsList: [],
        });
    });
    it("Создание экземпляра альбома с неполными данными", () => {
        // @ts-expect-error неполная информация
        expect(createAlbum({
            ULID: "gfjhfhgfhgf",
            imageUrl: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 0,
            name: "",
            ULID: "gfjhfhgfhgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            description: "",
            postCount: 0,
            postsList: [],
        });
    });
});
