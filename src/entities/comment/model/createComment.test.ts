import { describe, expect, it } from "vitest";
import { createComment } from "./createComment";

describe("createComment - Возвращает объект типа CommentType", () => {
    it("Создание экземпляра комментария", () => {
        expect(
            // @ts-expect-error неполная информация
            createComment({
                UUID: "00000000-0000-4000-8000-000000000101",
                text: "Текст",
                createdAt: "2026-03-29T17:25:15.940Z"
            })
        ).toEqual({
            UUID: "00000000-0000-4000-8000-000000000101",
            text: "Текст",
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
    it("Создание экземпляра комментария с неполными данными", () => {
        expect(
            // @ts-expect-error неполная информация
            createComment({
                UUID: "00000000-0000-4000-8000-000000000101",
                createdAt: "2026-03-29T17:25:15.940Z"
            })
        ).toEqual({
            UUID: "00000000-0000-4000-8000-000000000101",
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        });
    });
});
