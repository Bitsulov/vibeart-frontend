import {describe, it, expect, vi} from "vitest";
import {submitValidHandler} from "./submitValidHandler";
import {profileUserMock} from "entities/user";
import type {CommentType} from "entities/comment";

describe("submitValidHandler - добавляет комментарий и сбрасывает поле ввода", () => {
    it("Вызывает setComments с новым комментарием в начале массива", () => {
        const setComments = vi.fn();
        const setValue = vi.fn();

        submitValidHandler({ sendComment: "Новый комментарий" }, setComments, profileUserMock, setValue);

        const updater = setComments.mock.calls[0][0] as (prev: CommentType[]) => CommentType[];
        const result = updater([]);
        expect(result).toHaveLength(1);
        expect(result[0].text).toBe("Новый комментарий");
        expect(result[0].author).toEqual(profileUserMock);
    });

    it("Добавляет комментарий в начало существующего массива", () => {
        const existing: CommentType = { id: 1, text: "Старый", createdAt: "2026-04-05T12:00:00.000Z", author: profileUserMock };
        const setComments = vi.fn();
        const setValue = vi.fn();

        submitValidHandler({ sendComment: "Новый" }, setComments, profileUserMock, setValue);

        const updater = setComments.mock.calls[0][0] as (prev: CommentType[]) => CommentType[];
        const result = updater([existing]);
        expect(result[0].text).toBe("Новый");
        expect(result[1]).toEqual(existing);
    });

    it("Сбрасывает поле sendComment после отправки", () => {
        const setValue = vi.fn();
        submitValidHandler({ sendComment: "Текст" }, vi.fn(), profileUserMock, setValue);
        expect(setValue).toHaveBeenCalledWith("sendComment", "");
    });
});
