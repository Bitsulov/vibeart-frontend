import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";
import { createUser, principalUserSessionMock, profileUserMock } from "entities/user";
import type { CommentType } from "entities/comment";

const expectedAuthor = createUser({
    UUID: principalUserSessionMock.UUID,
    name: principalUserSessionMock.name,
    username: principalUserSessionMock.username,
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: "",
    trustStatus: principalUserSessionMock.trustStatus,
    isAuthenticated: true,
    isBlocked: principalUserSessionMock.isBlocked,
    onlineStatus: "ONLINE",
    role: principalUserSessionMock.role,
    avatarUrl: ""
});

describe("submitValidHandler - добавляет комментарий и сбрасывает поле ввода", () => {
    it("Вызывает setComments с новым комментарием в начале массива", () => {
        const setComments = vi.fn();
        const setValue = vi.fn();

        submitValidHandler(
            { sendComment: "Новый комментарий" },
            setComments,
            principalUserSessionMock,
            setValue
        );

        const updater = setComments.mock.calls[0][0] as (
            prev: CommentType[]
        ) => CommentType[];
        const result = updater([]);
        expect(result).toHaveLength(1);
        expect(result[0].text).toBe("Новый комментарий");
        expect(result[0].author).toEqual(expectedAuthor);
    });

    it("Добавляет комментарий в начало существующего массива", () => {
        const existing: CommentType = {
            text: "Старый",
            createdAt: "2026-04-05T12:00:00.000Z",
            author: profileUserMock
        };
        const setComments = vi.fn();
        const setValue = vi.fn();

        submitValidHandler(
            { sendComment: "Новый" },
            setComments,
            principalUserSessionMock,
            setValue
        );

        const updater = setComments.mock.calls[0][0] as (
            prev: CommentType[]
        ) => CommentType[];
        const result = updater([existing]);
        expect(result[0].text).toBe("Новый");
        expect(result[1]).toEqual(existing);
    });

    it("Сбрасывает поле sendComment после отправки", () => {
        const setValue = vi.fn();
        submitValidHandler(
            { sendComment: "Текст" },
            vi.fn(),
            principalUserSessionMock,
            setValue
        );
        expect(setValue).toHaveBeenCalledWith("sendComment", "");
    });
});
