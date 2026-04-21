import {expect, test} from "@playwright/test";

const COMMUNITY_URL = "/communities/01ARZ3NDEKTSV4RRFFQ69G5FC1";

test.describe("Community - страница сообщества", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page).toHaveTitle("Community | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Creative community page: member posts, description, and group members. Join, share your works, and connect with creators who share your spirit."
        );
    });

    test("Отображается название сообщества", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("heading", {level: 1, name: "Digital Art Club"})).toBeVisible();
    });

    test("Отображается username сообщества", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByText("@digital-art-club")).toBeVisible();
    });

    test("Отображается аватар сообщества", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByAltText(/User avatar Digital Art Club/)).toBeVisible();
    });

    test("Отображается кнопка раскрытия описания", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("button", {name: "Expand description"})).toBeVisible();
    });

    test("Клик по кнопке открывает модальное окно с информацией", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await page.getByRole("button", {name: "Expand description"}).click();

        await expect(page.getByRole("dialog")).toBeVisible();
    });

    test("Модальное окно закрывается по кнопке закрытия", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await page.getByRole("button", {name: "Expand description"}).click();
        await page.getByRole("button", {name: "Close modal window"}).click();

        await expect(page.getByRole("dialog")).not.toBeVisible();
    });

    test("Отображается слайдер альбомов", async ({page}) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("heading", {name: "Albums"})).toBeVisible();
    });
});
