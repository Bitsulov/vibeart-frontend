import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { createServerInstance } from "shared/api/serverInstance";
import {
    getCommunity,
    getOwnedCommunities,
    getCommunitiesBySearch,
    toggleCommunitySubscription
} from "./communityApi";

describe("communityApi - запросы к API сообществ", () => {
    it("getCommunity по умолчанию отправляет запрос без заголовка Authorization", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/community/:UUID", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({ uuid: "test-uuid" });
            })
        );

        await getCommunity("test-uuid");

        expect(receivedAuth).toBeNull();
    });

    it("getCommunity использует переданный объект axios вместо общего api", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/community/:UUID", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({ uuid: "test-uuid" });
            })
        );

        const client = createServerInstance("server-token");
        const response = await getCommunity("test-uuid", client);

        expect(receivedAuth).toBe("Bearer server-token");
        expect(response.data).toEqual({ uuid: "test-uuid" });
    });

    it("getOwnedCommunities отправляет параметры пагинации на /community/owned", async () => {
        let receivedPage: string | null = null;
        let receivedSize: string | null = null;
        server.use(
            http.get("*/community/owned", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedPage = params.get("page");
                receivedSize = params.get("size");
                return HttpResponse.json({ content: [] });
            })
        );

        await getOwnedCommunities({ page: 1, size: 4 });

        expect(receivedPage).toBe("1");
        expect(receivedSize).toBe("4");
    });

    it("getCommunitiesBySearch отправляет query и userId на /community/search", async () => {
        let receivedQuery: string | null = null;
        let receivedUserId: string | null = null;
        server.use(
            http.get("*/community/search", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedQuery = params.get("query");
                receivedUserId = params.get("userId");
                return HttpResponse.json({ content: [] });
            })
        );

        await getCommunitiesBySearch("арт", "user-uuid");

        expect(receivedQuery).toBe("арт");
        expect(receivedUserId).toBe("user-uuid");
    });

    it("toggleCommunitySubscription отправляет запрос на /community/:UUID/subscribe", async () => {
        let receivedMethod: string | null = null;
        server.use(
            http.post("*/community/:UUID/subscribe", ({ request }) => {
                receivedMethod = request.method;
                return HttpResponse.text("ok");
            })
        );

        const response = await toggleCommunitySubscription("test-uuid");

        expect(receivedMethod).toBe("POST");
        expect(response.data).toBe("ok");
    });
});
