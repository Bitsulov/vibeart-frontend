import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import {
    getCommentsByPost,
    addComment,
    updateCommentById,
    deleteCommentById
} from "./commentApi";

describe("commentApi - запросы к API комментариев", () => {
    it("getCommentsByPost отправляет postUuid и параметры пагинации на /comment", async () => {
        let receivedPostUuid: string | null = null;
        let receivedPage: string | null = null;
        server.use(
            http.get("*/comment", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedPostUuid = params.get("postUuid");
                receivedPage = params.get("page");
                return HttpResponse.json({ content: [] });
            })
        );

        await getCommentsByPost("post-uuid", { page: 1, size: 20 });

        expect(receivedPostUuid).toBe("post-uuid");
        expect(receivedPage).toBe("1");
    });

    it("addComment отправляет postUuid и текст комментария на /comment", async () => {
        let receivedBody: unknown = null;
        server.use(
            http.post("*/comment", async ({ request }) => {
                receivedBody = await request.json();
                return HttpResponse.json({});
            })
        );

        await addComment({ postUuid: "post-uuid", text: "Текст комментария" });

        expect(receivedBody).toEqual({
            postUuid: "post-uuid",
            text: "Текст комментария"
        });
    });

    it("updateCommentById отправляет новый текст на /comment/:id", async () => {
        let receivedBody: unknown = null;
        server.use(
            http.put("*/comment/comment-uuid", async ({ request }) => {
                receivedBody = await request.json();
                return HttpResponse.json({});
            })
        );

        await updateCommentById({
            id: "comment-uuid",
            data: { text: "Изменённый текст" }
        });

        expect(receivedBody).toEqual({ text: "Изменённый текст" });
    });

    it("deleteCommentById отправляет DELETE на /comment/:id", async () => {
        let wasCalled = false;
        server.use(
            http.delete("*/comment/comment-uuid", () => {
                wasCalled = true;
                return HttpResponse.text("ok");
            })
        );

        await deleteCommentById("comment-uuid");

        expect(wasCalled).toBe(true);
    });
});
