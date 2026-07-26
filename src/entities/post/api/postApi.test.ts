import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { createServerInstance } from "shared/api/serverInstance";
import { getPost } from "./postApi";

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
});
