import {describe, expect, it} from "vitest";
import {createComment} from "./createComment";

describe("createComment - Возвращает объект типа CommentType", () => {
    it("Создание экземпляра комментария", () => {
        // @ts-expect-error неполная информация
        expect(createComment({
            id: 1,
            text: "Текст",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            id: 1,
            text: "Текст",
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
    it("Создание экземпляра комментария с неполными данными", () => {
        // @ts-expect-error неполная информация
        expect(createComment({createdAt: "2026-03-29T17:25:15.940Z"})).toEqual({
            id: 0,
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z",
        });
    });
});
