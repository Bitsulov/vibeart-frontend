/**
 * @file Фикстуры сущности `comment` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import type { CommentType, CommentResponse } from "../lib/types";
import { createComment } from "../model/createComment";
import { profileUserMock, userResponseMock } from "entities/user";
import type { Page } from "shared/lib/types";

export const commentsMock: CommentType[] = [
    createComment({
        UUID: "00000000-0000-4000-8000-000000000101",
        author: profileUserMock,
        text: "Текст комментария Текст комментария Текст комментария",
        createdAt: "2026-04-05T08:52:55.271Z"
    }),
    createComment({
        UUID: "00000000-0000-4000-8000-000000000102",
        author: profileUserMock,
        text: "Текст комментария Текст комментария Текст комментария",
        createdAt: "2026-04-05T08:52:55.272Z"
    }),
    createComment({
        UUID: "00000000-0000-4000-8000-000000000103",
        author: profileUserMock,
        text: "Текст комментария Текст комментария Текст комментария",
        createdAt: "2026-04-05T08:52:55.273Z"
    }),
    createComment({
        UUID: "00000000-0000-4000-8000-000000000104",
        author: profileUserMock,
        text: "Текст комментария Текст комментария Текст комментария",
        createdAt: "2026-04-05T08:52:55.274Z"
    }),
    createComment({
        UUID: "00000000-0000-4000-8000-000000000105",
        author: profileUserMock,
        text: "Текст комментария Текст комментария Текст комментария",
        createdAt: "2026-04-05T08:52:55.275Z"
    })
];

export const commentResponseMock: CommentResponse = {
    uuid: "00000000-0000-4000-8000-000000000101",
    text: "Текст комментария",
    createdAt: "2026-04-05T08:52:55.271Z",
    author: userResponseMock
};

export const commentsPageResponseMock: Page<CommentResponse> = {
    content: commentsMock.map(comment => ({
        ...commentResponseMock,
        uuid: comment.UUID,
        text: comment.text,
        createdAt: comment.createdAt,
        author: { ...userResponseMock, uuid: comment.author.UUID }
    })),
    number: 0,
    size: 20,
    totalElements: commentsMock.length,
    totalPages: 1,
    first: true,
    last: true,
    empty: false
};
