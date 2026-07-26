import { expect, test } from "@playwright/test";

const GALLERY_URL = "/en/gallery";

test.describe("Gallery - страница галереи", () => {
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
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000007",
                            title: "Post title",
                            description: "Description Description",
                            likesCount: 10,
                            commentsCount: 5,
                            reportsCount: 3,
                            aiStatus: "good",
                            imageUrl: "",
                            createdAt: "2026-01-01T00:00:00.000Z",
                            author: {
                                uuid: "00000000-0000-4000-8000-00000000000b",
                                name: "testUsergffdgfd",
                                username: "testUser",
                                description: "",
                                avatarUrl: "",
                                worksCount: 0,
                                subscribersCount: 0,
                                subscribesCount: 0,
                                createdAt: "2026-01-01T00:00:00.000Z",
                                trustStatus: "UNTRUST",
                                onlineStatus: "ONLINE",
                                enabled: true
                            },
                            community: null,
                            tags: [],
                            liked: false,
                            reported: false
                        }
                    ],
                    number: 0,
                    size: 20,
                    totalElements: 1,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(GALLERY_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(GALLERY_URL);

        await expect(page).toHaveTitle("Gallery | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Browse the works of VibeArt community members. Discover new creators, get inspired by creative works, and find those whose art resonates with you."
        );
    });

    test("Отображается заголовок галереи", async ({ page }) => {
        await page.goto(GALLERY_URL);

        await expect(
            page.getByRole("heading", { level: 1, name: "Gallery" })
        ).toBeVisible();
    });

    test("Отображается поле поиска", async ({ page }) => {
        await page.goto(GALLERY_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Отображается ссылка на создание поста", async ({ page }) => {
        await page.goto(GALLERY_URL);

        await expect(
            page.getByRole("link", { name: "Go to create post page" })
        ).toBeVisible();
    });

    test("Отображаются посты из мока", async ({ page }) => {
        await page.goto(GALLERY_URL);

        const posts = page.getByRole("link", { name: /Go to post/ });
        await expect(posts.first()).toBeVisible();
    });
});

test.describe("Gallery - список публикаций из API", () => {
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

    test("Публикации из ответа API отображаются в списке", async ({ page }) => {
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000007",
                            title: "First post",
                            description: "Description Description",
                            likesCount: 10,
                            commentsCount: 5,
                            reportsCount: 3,
                            aiStatus: "good",
                            imageUrl: "",
                            createdAt: "2026-01-01T00:00:00.000Z",
                            author: {
                                uuid: "00000000-0000-4000-8000-00000000000b",
                                name: "testAuthor",
                                username: "testAuthor",
                                description: "",
                                avatarUrl: "",
                                worksCount: 0,
                                subscribersCount: 0,
                                subscribesCount: 0,
                                createdAt: "2026-01-01T00:00:00.000Z",
                                trustStatus: "UNTRUST",
                                onlineStatus: "ONLINE",
                                enabled: true
                            },
                            community: null,
                            tags: [],
                            liked: false,
                            reported: false
                        }
                    ],
                    number: 0,
                    size: 20,
                    totalElements: 1,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
        await page.goto(GALLERY_URL, { waitUntil: "networkidle" });

        await expect(
            page.getByRole("link", { name: "Go to post First post" })
        ).toBeVisible();
    });

    test("Пустой ответ API не отображает публикации", async ({ page }) => {
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [],
                    number: 0,
                    size: 20,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            })
        );
        await page.goto(GALLERY_URL, { waitUntil: "networkidle" });

        await expect(page.getByRole("link", { name: /Go to post/ })).toHaveCount(0);
    });

    test("Ошибка загрузки публикаций не ломает страницу", async ({ page }) => {
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({ statusCode: 500, message: "error" })
            })
        );
        await page.goto(GALLERY_URL, { waitUntil: "networkidle" });

        await expect(
            page.getByRole("heading", { level: 1, name: "Gallery" })
        ).toBeVisible();
        await expect(page.getByRole("link", { name: /Go to post/ })).toHaveCount(0);
    });
});
