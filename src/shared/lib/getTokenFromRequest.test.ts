import { describe, it, expect } from "vitest";
import { getTokenFromRequest } from "./getTokenFromRequest";
import { encryptToString } from "./crypto";

const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY;

const requestWithCookie = (cookie?: string) =>
    new Request("http://localhost/post/uuid", {
        headers: cookie ? { Cookie: cookie } : {}
    });

describe("getTokenFromRequest - извлечение accessToken из заголовка Cookie запроса", () => {
    it("Возвращает null, если заголовок Cookie отсутствует", async () => {
        const token = await getTokenFromRequest(requestWithCookie());

        expect(token).toBeNull();
    });

    it("Возвращает null, если в куки нет accessToken", async () => {
        const token = await getTokenFromRequest(requestWithCookie("theme=dark"));

        expect(token).toBeNull();
    });

    it("Возвращает расшифрованный accessToken из куки", async () => {
        const encrypted = await encryptToString("access-token", CRYPTO_KEY);
        const token = await getTokenFromRequest(
            requestWithCookie(`theme=dark; accessToken=${encrypted}; refreshToken=xyz`)
        );

        expect(token).toBe("access-token");
    });

    it("Возвращает null, если значение accessToken повреждено и не расшифровывается", async () => {
        const token = await getTokenFromRequest(
            requestWithCookie("accessToken=not-a-valid-token")
        );

        expect(token).toBeNull();
    });
});
