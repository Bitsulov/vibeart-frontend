import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";
import { commentResponseMock } from "entities/comment";
import type { AxiosResponse } from "axios";

describe("submitValidHandler - отправляет комментарий на сервер", () => {
    it("Вызывает addComment с UUID публикации и текстом комментария", async () => {
        const addComment = vi.fn(
            async () => ({ data: commentResponseMock }) as AxiosResponse
        );

        await submitValidHandler(
            { sendComment: "Новый комментарий" },
            "post-uuid",
            addComment
        );

        expect(addComment).toHaveBeenCalledWith({
            postUuid: "post-uuid",
            text: "Новый комментарий"
        });
    });
});
