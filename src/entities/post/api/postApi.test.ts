import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { createServerInstance } from "shared/api/serverInstance";
import { getPost, searchPosts } from "./postApi";

describe("postApi - запросы к API публикаций", () => {
    it("getPost по умолчанию отправляет запрос без заголовка Authorization", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/post/:UUID", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({ uuid: "test-uuid" });
            })
        );

        await getPost("test-uuid");

        expect(receivedAuth).toBeNull();
    });

    it("getPost использует переданный объект axios вместо общего api", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/post/:UUID", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({ uuid: "test-uuid" });
            })
        );

        const client = createServerInstance("server-token");
        const response = await getPost("test-uuid", client);

        expect(receivedAuth).toBe("Bearer server-token");
        expect(response.data).toEqual({ uuid: "test-uuid" });
    });

    it("searchPosts отправляет query и параметры пагинации", async () => {
        let receivedQuery: string | null = null;
        let receivedPage: string | null = null;
        let receivedSize: string | null = null;
        server.use(
            http.get("*/post/search", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedQuery = params.get("query");
                receivedPage = params.get("page");
                receivedSize = params.get("size");
                return HttpResponse.json({ content: [] });
            })
        );

        await searchPosts("кот", undefined, undefined, { page: 1, size: 10 });

        expect(receivedQuery).toBe("кот");
        expect(receivedPage).toBe("1");
        expect(receivedSize).toBe("10");
    });

    it("searchPosts отправляет authorUuid и albumUuid для поиска в альбоме", async () => {
        let receivedAuthorUuid: string | null = null;
        let receivedAlbumUuid: string | null = null;
        server.use(
            http.get("*/post/search", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedAuthorUuid = params.get("authorUuid");
                receivedAlbumUuid = params.get("albumUuid");
                return HttpResponse.json({ content: [] });
            })
        );

        await searchPosts("кот", "author-uuid", "album-uuid");

        expect(receivedAuthorUuid).toBe("author-uuid");
        expect(receivedAlbumUuid).toBe("album-uuid");
    });
});
