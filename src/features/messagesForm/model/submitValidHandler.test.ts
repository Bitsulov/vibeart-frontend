import {describe, it, expect, vi} from "vitest";
import {submitValidHandler} from "./submitValidHandler";
import type {MessageType} from "entities/message";

describe("submitValidHandler - добавляет сообщение и сбрасывает поле ввода", () => {
    it("Добавляет новое сообщение в конец списка", () => {
        const setMessages = vi.fn();
        const setValue = vi.fn();

        submitValidHandler({ sendMessage: "Hello" }, setMessages, setValue);

        const updater = setMessages.mock.calls[0][0] as (prev: MessageType[]) => MessageType[];
        const result = updater([]);
        expect(result).toHaveLength(1);
        expect(result[0].text).toBe("Hello");
        expect(result[0].isYour).toBe(true);
        expect(result[0].status).toBe("save");
    });

    it("Добавляет сообщение к существующим", () => {
        const existing: MessageType = {
            id: 1,
            text: "Old",
            createdAt: "2026-04-15T10:00:00.000Z",
            isYour: false,
            status: "read",
        };
        const setMessages = vi.fn();

        submitValidHandler({ sendMessage: "New" }, setMessages, vi.fn());

        const updater = setMessages.mock.calls[0][0] as (prev: MessageType[]) => MessageType[];
        const result = updater([existing]);
        expect(result).toHaveLength(2);
        expect(result[1].text).toBe("New");
    });

    it("Сбрасывает поле sendMessage после отправки", () => {
        const setValue = vi.fn();
        submitValidHandler({ sendMessage: "Hello" }, vi.fn(), setValue);
        expect(setValue).toHaveBeenCalledWith("sendMessage", "");
    });
});
