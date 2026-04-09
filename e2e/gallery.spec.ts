import {expect, test} from "@playwright/test";

const GALLERY_URL = "/gallery";

test.describe("Gallery - страница галереи", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(GALLERY_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(GALLERY_URL);

        await expect(page).toHaveTitle("Gallery | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Browse the works of VibeArt community members. Discover new creators, get inspired by creative works, and find those whose art resonates with you."
        );
    });

    test("Отображается заголовок галереи", async ({page}) => {
        await page.goto(GALLERY_URL);

        await expect(page.getByRole("heading", {level: 1, name: "Gallery"})).toBeVisible();
    });

    test("Отображается поле поиска", async ({page}) => {
        await page.goto(GALLERY_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Отображается ссылка на создание поста", async ({page}) => {
        await page.goto(GALLERY_URL);

        await expect(page.getByRole("link", {name: "Go to create post page"})).toBeVisible();
    });

    test("Отображаются посты из мока", async ({page}) => {
        await page.goto(GALLERY_URL);

        const posts = page.getByRole("link", {name: /Go to post/});
        await expect(posts.first()).toBeVisible();
    });
});