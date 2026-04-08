import {expect, test} from "@playwright/test";

const ALBUM_URL = "/album/01ARZ3NDEKTSV4RRFFQ69G5FAV";

test.describe("Album - страница альбома", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(ALBUM_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(ALBUM_URL);

        await expect(page).toHaveTitle("Album | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Browse the author's album: a curated collection of works with descriptions and publication dates. Explore the creative portfolio of VibeArt community members."
        );
    });

    test("Отображается заголовок альбома", async ({page}) => {
        await page.goto(ALBUM_URL);

        await expect(page.getByRole("heading", {level: 1, name: "Album title"}).first()).toBeVisible();
    });

    test("Отображается описание альбома", async ({page}) => {
        await page.goto(ALBUM_URL);

        await expect(page.getByText("Description Description").first()).toBeVisible();
    });

    test("Отображается изображение альбома", async ({page}) => {
        await page.goto(ALBUM_URL);

        await expect(page.getByRole("img", {name: "Album title"})).toBeVisible();
    });

    test("Отображается кнопка назад", async ({page}) => {
        await page.goto(ALBUM_URL);

        await expect(page.getByRole("button", {name: "Return to the previous page"})).toBeVisible();
    });
});
