import {describe, expect, it} from "vitest";
import {createTag} from "./createTag";

describe("createTag - Возвращает объект типа TagType", () => {
    it("Создание экземпляра тега", () => {
        expect(createTag({
            id: 1,
            title: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 1,
            title: '',
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
    it("Создание экземпляра тега с неполными данными", () => {
        // @ts-expect-error неполная информация
        expect(createTag({
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 0,
            title: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
});
