import {expect, test} from "@playwright/test";

const POST_URL = "/post/01ARZ3NDEKTSV4RRFFQ69G5FAB";

test.describe("Post - страница поста", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page).toHaveTitle("Post | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "View the artwork, read the author's description, and join the discussion. Discover creative works by authors from the VibeArt community."
        );
    });

    test("Отображается заголовок поста", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("heading", {level: 1, name: "Post title"})).toBeVisible();
    });

    test("Отображается изображение поста", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("img", {name: "Post title"})).toBeVisible();
    });

    test("Отображается описание поста", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByText("Description Description")).toBeVisible();
    });

    test("Отображается ссылка на профиль автора", async ({page}) => {
        await page.goto(POST_URL);

        const authorLink = page.getByRole("article").getByRole("link", {name: "Go to testUser's profile"});
        await expect(authorLink).toBeVisible();
        await expect(authorLink).toHaveAttribute("href", "/profile/01ARZ3NDEKTSV4RRFFQ69G5FAV");
    });

    test("Отображается ссылка на альбом поста", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("link", {name: "Go to album page Album title"})).toBeVisible();
    });

    test("Отображаются теги поста", async ({page}) => {
        await page.goto(POST_URL);

        const tagsList = page.getByRole("article").getByRole("list");
        await expect(tagsList).toBeVisible();
        await expect(tagsList.getByText("beauty").first()).toBeVisible();
        await expect(tagsList.getByText("nature")).toBeVisible();
    });

    test("Кнопка лайка отображается", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("button", {name: "Like"})).toBeVisible();
    });

    test("Кнопка жалобы отображается", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("button", {name: "Submit a report"})).toBeVisible();
    });

    test("Клик по кнопке лайка переключает состояние", async ({page}) => {
        await page.goto(POST_URL);

        await page.getByRole("button", {name: "Like"}).click();
        await expect(page.getByRole("button", {name: "Unlike"})).toBeVisible();
    });

    test("Секция комментариев отображается", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("heading", {level: 2, name: "Comments (5)"})).toBeVisible();
    });

    test("Форма добавления комментария отображается", async ({page}) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Комментарии из мока отображаются", async ({page}) => {
        await page.goto(POST_URL);

        const comments = page.getByText("Текст комментария Текст комментария Текст комментария");
        await expect(comments.first()).toBeVisible();
        await expect(comments).toHaveCount(5);
    });
});
