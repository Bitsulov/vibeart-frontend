import {describe, expect, it} from "vitest";
import {createMessage} from "./createMessage";

describe("createMessage - Возвращает объект типа MessageType", () => {
    it("Создание экземпляра сообщения", () => {
        expect(createMessage({
            id: 1,
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z",
            isYour: false,
            status: "sent"
        })).toEqual({
            id: 1,
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z",
            isYour: false,
            status: "sent"
        });
    });
    it("Создание экземпляра сообщения с неполными данными", () => {
        // @ts-expect-error неполная информация
        expect(createMessage({
            createdAt: "2026-03-29T17:25:15.940Z",
            isYour: false,
        })).toEqual({
            id: 0,
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z",
            isYour: false,
            status: "save"
        });
    });
});
