import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { getTags, getTagsBySearch } from "./tagApi";

describe("tagApi - запросы к API тегов", () => {
    it("getTags отправляет параметры пагинации на /tag", async () => {
        let receivedPage: string | null = null;
        let receivedSize: string | null = null;
        server.use(
            http.get("*/tag", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedPage = params.get("page");
                receivedSize = params.get("size");
                return HttpResponse.json({ content: [] });
            })
        );

        await getTags({ page: 1, size: 20 });

        expect(receivedPage).toBe("1");
        expect(receivedSize).toBe("20");
    });

    it("getTagsBySearch отправляет query и параметры пагинации на /tag/search", async () => {
        let receivedQuery: string | null = null;
        let receivedPage: string | null = null;
        server.use(
            http.get("*/tag/search", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedQuery = params.get("query");
                receivedPage = params.get("page");
                return HttpResponse.json({ content: [] });
            })
        );

        const response = await getTagsBySearch("beauty", { page: 0, size: 20 });

        expect(receivedQuery).toBe("beauty");
        expect(receivedPage).toBe("0");
        expect(response.data).toEqual({ content: [] });
    });
});
