import { expect, test } from "@playwright/test";

const CHATS_URL = "/en/chats";

test.describe("Chats - страница чатов", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-00000000000a",
                    name: "testUser",
                    username: "testUser",
                    avatarUrl: "",
                    email: "testEmail@test.com",
                    role: "USER",
                    enabled: true
                })
            })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(CHATS_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(CHATS_URL);

        await expect(page).toHaveTitle("Chats | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Your personal conversations. Chat with other users, share impressions, and discuss creative works."
        );
    });

    test("Отображается заголовок чатов", async ({ page }) => {
        await page.goto(CHATS_URL);

        await expect(
            page.getByRole("heading", { level: 1, name: "Chats" })
        ).toBeVisible();
    });

    test("Отображается поле поиска", async ({ page }) => {
        await page.goto(CHATS_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Отображаются чаты из мока", async ({ page }) => {
        await page.goto(CHATS_URL);

        const chats = page.getByRole("link", { name: /Go to chat/ });
        await expect(chats.first()).toBeVisible();
    });

    test("Отображается точное количество чатов", async ({ page }) => {
        await page.goto(CHATS_URL);

        await expect(page.getByRole("link", { name: /^Go to chat \S/ })).toHaveCount(5);
    });

    test("Клик на чат открывает страницу чата", async ({ page }) => {
        await page.goto(CHATS_URL);

        await page
            .getByRole("link", { name: /^Go to chat \S/ })
            .first()
            .click();
        await page.waitForURL(/\/chats\/.+/);

        expect(new URL(page.url()).pathname).toMatch(/^\/chats\/.+/);
    });

    test("Поле поиска принимает введённый текст", async ({ page }) => {
        await page.goto(CHATS_URL);

        await expect(async () => {
            await page.getByRole("textbox").fill("testUser");
            await expect(page.getByRole("textbox")).toHaveValue("testUser");
        }).toPass();
    });
});
