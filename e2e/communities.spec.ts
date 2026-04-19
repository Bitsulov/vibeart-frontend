import {expect, test} from "@playwright/test";

const COMMUNITIES_URL = "/communities";

test.describe("Communities - страница сообществ", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page).toHaveTitle("Communities | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Find communities by interest, join creative groups, and start your own. Share your works, discuss ideas, and grow together with creators who share your spirit."
        );
    });

    test("Отображается поле поиска", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Отображается ссылка создания сообщества", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("link", {name: "Go to create community page"})).toBeVisible();
    });

    test("Отображаются заголовки списков сообществ", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("heading", {name: "My communities"})).toBeVisible();
        await expect(page.getByRole("heading", {name: "All communities"})).toBeVisible();
    });

    test("Отображаются карточки сообществ", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        const cards = page.getByRole("article");
        await expect(cards.first()).toBeVisible();
    });

    test("Кнопка подписки меняет состояние при клике", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        const subscribeButton = page.getByRole("button", {name: "Subscribe"}).first();
        await expect(subscribeButton).toBeVisible();
        await subscribeButton.click();
        await expect(page.getByRole("button", {name: "Unsubscribe"}).first()).toBeVisible();
    });

    test("Ссылка 'Перейти' ведёт на страницу сообщества", async ({page}) => {
        await page.goto(COMMUNITIES_URL);

        const goLink = page.getByRole("link", {name: "Go", exact: true}).first();
        await expect(goLink).toBeVisible();
        await expect(goLink).toHaveAttribute("href", /\/communities\/.+/);
    });
});
