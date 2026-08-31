import { describe, it, expect, vi } from "vitest";
import { addCommentSuccessHandler } from "./addCommentSuccessHandler";
import { commentResponseMock } from "entities/comment";
import type { CommentResponse, CommentType } from "entities/comment";
import type { AxiosResponse } from "axios";

const response = { data: commentResponseMock } as AxiosResponse<CommentResponse>;

describe("addCommentSuccessHandler - фиксирует успешное создание комментария", () => {
    it("Добавляет комментарий из ответа сервера в начало списка", () => {
        const setComments = vi.fn();
        const setCommentsCount = vi.fn();
        const setValue = vi.fn();

        addCommentSuccessHandler(response, setComments, setCommentsCount, setValue);

        const updater = setComments.mock.calls[0][0] as (
            prev: CommentType[]
        ) => CommentType[];
        const result = updater([]);
        expect(result).toHaveLength(1);
        expect(result[0].UUID).toBe(commentResponseMock.uuid);
        expect(result[0].text).toBe(commentResponseMock.text);
        expect(result[0].author.title).toBe(commentResponseMock.author.name);
    });

    it("Увеличивает счётчик комментариев на 1", () => {
        const setCommentsCount = vi.fn();

        addCommentSuccessHandler(response, vi.fn(), setCommentsCount, vi.fn());

        const updater = setCommentsCount.mock.calls[0][0] as (n: number) => number;
        expect(updater(2)).toBe(3);
    });

    it("Сбрасывает поле sendComment", () => {
        const setValue = vi.fn();

        addCommentSuccessHandler(response, vi.fn(), vi.fn(), setValue);

        expect(setValue).toHaveBeenCalledWith("sendComment", "");
    });
});
