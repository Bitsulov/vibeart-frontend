import { describe, it, expect } from "vitest";
import { createServerInstance } from "./serverInstance";

describe("createServerInstance - объект axios для серверного окружения", () => {
    it("Не добавляет заголовок Authorization, если токен не передан", () => {
        const client = createServerInstance();

        expect(client.defaults.headers.Authorization).toBeUndefined();
    });

    it("Не добавляет заголовок Authorization, если токен равен null", () => {
        const client = createServerInstance(null);

        expect(client.defaults.headers.Authorization).toBeUndefined();
    });

    it("Добавляет заголовок Authorization с переданным токеном", () => {
        const client = createServerInstance("access-token");

        expect(client.defaults.headers.Authorization).toBe("Bearer access-token");
    });

    it("Каждый вызов создаёт новый, независимый объект", () => {
        const first = createServerInstance("first-token");
        const second = createServerInstance("second-token");

        expect(first).not.toBe(second);
        expect(first.defaults.headers.Authorization).toBe("Bearer first-token");
        expect(second.defaults.headers.Authorization).toBe("Bearer second-token");
    });
});
