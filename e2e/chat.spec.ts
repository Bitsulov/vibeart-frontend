import { expect, test } from "@playwright/test";

const CHAT_URL = "/en/chats/00000000-0000-4000-8000-00000000000b";

test.describe("Chat - страница чата", () => {
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
        await page.goto(CHAT_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(CHAT_URL);

        await expect(page).toHaveTitle("Chat | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Private conversation with a user. Chat in real time, share your works, and discuss creativity together."
        );
    });

    test("Отображается имя собеседника", async ({ page }) => {
        await page.goto(CHAT_URL);

        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("Отображается ссылка назад к чатам", async ({ page }) => {
        await page.goto(CHAT_URL);

        await expect(
            page.locator("section").getByRole("link", { name: "Go to chats" })
        ).toBeVisible();
    });

    test("Отображаются сообщения из мока", async ({ page }) => {
        await page.goto(CHAT_URL);

        await expect(
            page.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
        ).toBeVisible();
    });

    test("Отображается поле ввода сообщения", async ({ page }) => {
        await page.goto(CHAT_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
        await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
    });

    test("Отправка сообщения добавляет его в список", async ({ page }) => {
        await page.goto(CHAT_URL);

        await page.getByRole("textbox").fill("Test message e2e");
        await page.getByRole("button", { name: "Send message" }).click();

        await expect(page.getByText("Test message e2e")).toBeVisible();
    });

    test("Открывается всплывающий список настроек чата", async ({ page }) => {
        await page.goto(CHAT_URL);

        await page.getByRole("button", { name: "Open chat settings" }).click();
        await expect(page.locator("#dropdown")).toBeVisible();
        await expect(page.getByRole("button", { name: "Delete chat" })).toBeVisible();
    });

    test("Клик на кнопку 'Удалить чат' открывает модальное окно", async ({ page }) => {
        await page.goto(CHAT_URL);

        await page.getByRole("button", { name: "Open chat settings" }).click();
        await page.getByRole("button", { name: "Delete chat" }).click();

        await expect(
            page.getByText(
                "Are you sure you want to delete all messages in this chat? (irreversible)"
            )
        ).toBeVisible();
    });

    test("В заголовке отображается имя собеседника", async ({ page }) => {
        await page.goto(CHAT_URL);

        await expect(
            page.getByRole("heading", { level: 1, name: "testUser" })
        ).toBeVisible();
    });

    test("Ссылка назад ведёт на список чатов", async ({ page }) => {
        await page.goto(CHAT_URL);

        const link = page.locator("section").getByRole("link", { name: "Go to chats" });

        await expect(link).toHaveAttribute("href", "/chats");
    });

    test("Настройки чата закрываются при повторном нажатии", async ({ page }) => {
        await page.goto(CHAT_URL);

        const settingsButton = page.getByRole("button", { name: "Open chat settings" });
        await settingsButton.click();
        await expect(
            page.getByRole("button", { name: "Close chat settings" })
        ).toBeVisible();

        await page.getByRole("button", { name: "Close chat settings" }).click();
        await expect(
            page.getByRole("button", { name: "Open chat settings" })
        ).toBeVisible();
    });

    test("Подтверждение удаления чата перенаправляет на /chats", async ({ page }) => {
        await page.goto(CHAT_URL);

        await page.getByRole("button", { name: "Open chat settings" }).click();
        await page.getByRole("button", { name: "Delete chat" }).click();
        await page.getByRole("button", { name: "Delete messages" }).click();

        await page.waitForURL(/\/en\/chats(\?|$)/, { waitUntil: "commit" });
        expect(new URL(page.url()).pathname).toBe("/en/chats");
    });

    test("Отмена удаления чата закрывает модальное окно", async ({ page }) => {
        await page.goto(CHAT_URL);

        await page.getByRole("button", { name: "Open chat settings" }).click();
        await page.getByRole("button", { name: "Delete chat" }).click();
        await expect(
            page.getByText(
                "Are you sure you want to delete all messages in this chat? (irreversible)"
            )
        ).toBeVisible();

        await page.getByRole("button", { name: "Close modal window" }).click();

        await expect(
            page.getByText(
                "Are you sure you want to delete all messages in this chat? (irreversible)"
            )
        ).not.toBeVisible();
    });
});
