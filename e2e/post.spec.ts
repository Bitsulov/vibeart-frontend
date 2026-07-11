import { expect, test } from "@playwright/test";

const POST_URL = "/en/post/00000000-0000-4000-8000-000000000007";

test.describe("Post - страница поста", () => {
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
        await page.goto(POST_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(page).toHaveTitle("Post | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "View the artwork, read the author's description, and join the discussion. Discover creative works by authors from the VibeArt community."
        );
    });

    test("Отображается заголовок поста", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(
            page.getByRole("heading", { level: 1, name: "Post title" })
        ).toBeVisible();
    });

    test("Отображается изображение поста", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("img", { name: "Post title" })).toBeVisible();
    });

    test("Отображается описание поста", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(page.getByText("Description Description")).toBeVisible();
    });

    test("Отображается ссылка на профиль автора", async ({ page }) => {
        await page.goto(POST_URL);

        const authorLink = page
            .getByRole("article")
            .getByRole("link", { name: "Go to testUsergffdgfd's profile" });
        await expect(authorLink).toBeVisible();
        await expect(authorLink).toHaveAttribute(
            "href",
            "/profile/00000000-0000-4000-8000-00000000000b"
        );
    });

    test("Отображается ссылка на альбом поста", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(
            page.getByRole("link", { name: "Go to album page Album title" })
        ).toBeVisible();
    });

    test("Отображаются теги поста", async ({ page }) => {
        await page.goto(POST_URL);

        const tagsList = page.getByRole("article").getByRole("list");
        await expect(tagsList).toBeVisible();
        await expect(tagsList.getByText("beauty").first()).toBeVisible();
        await expect(tagsList.getByText("nature")).toBeVisible();
    });

    test("Кнопка лайка отображается", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("button", { name: "Like" })).toBeVisible();
    });

    test("Кнопка жалобы отображается", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("button", { name: "Submit a report" })).toBeVisible();
    });

    test("Клик по кнопке лайка переключает состояние", async ({ page }) => {
        await page.goto(POST_URL);
        await page.waitForLoadState("networkidle");

        await page.getByRole("button", { name: "Like" }).click();
        await expect(page.getByRole("button", { name: "Unlike" })).toBeVisible();
    });

    test("Секция комментариев отображается", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(
            page.getByRole("heading", { level: 2, name: "Comments (5)" })
        ).toBeVisible();
    });

    test("Форма добавления комментария отображается", async ({ page }) => {
        await page.goto(POST_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Комментарии из мока отображаются", async ({ page }) => {
        await page.goto(POST_URL);

        const comments = page.getByText(
            "Текст комментария Текст комментария Текст комментария"
        );
        await expect(comments.first()).toBeVisible();
        await expect(comments).toHaveCount(5);
    });

    test("Переход по хэшу #comments скроллит к секции комментариев", async ({ page }) => {
        await page.goto(`${POST_URL}#comments`);

        await page.locator("#comments").waitFor({ state: "visible" });
        await expect(page.locator("#comments")).toBeInViewport();
    });
});
