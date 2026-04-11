import {expect, test} from "@playwright/test";

const CHATS_URL = "/chats";

test.describe("Chats - страница чатов", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(CHATS_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(CHATS_URL);

        await expect(page).toHaveTitle("Chats | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Your personal conversations. Chat with other users, share impressions, and discuss creative works."
        );
    });

    test("Отображается заголовок чатов", async ({page}) => {
        await page.goto(CHATS_URL);

        await expect(page.getByRole("heading", {level: 1, name: "Chats"})).toBeVisible();
    });

    test("Отображается поле поиска", async ({page}) => {
        await page.goto(CHATS_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Отображаются чаты из мока", async ({page}) => {
        await page.goto(CHATS_URL);

        const chats = page.getByRole("link", {name: /Go to chat/});
        await expect(chats.first()).toBeVisible();
    });
});
