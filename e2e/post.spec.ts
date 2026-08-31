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
        await page.route("**/api/post/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-000000000007",
                    title: "Post title",
                    description: "Description Description",
                    likesCount: 10,
                    commentsCount: 5,
                    reportsCount: 3,
                    aiStatus: "good",
                    imageUrl:
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
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
                    tags: ["beauty", "nature"],
                    liked: false,
                    reported: false
                })
            })
        );
        await page.route("**/api/post/*/like", route =>
            route.fulfill({ status: 200, contentType: "text/plain", body: "ok" })
        );
        await page.route(/\/api\/comment(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [1, 2, 3, 4, 5].map(i => ({
                        uuid: `00000000-0000-4000-8000-00000000010${i}`,
                        text: "Текст комментария Текст комментария Текст комментария",
                        createdAt: `2026-04-05T08:52:55.27${i}Z`,
                        author: {
                            uuid: "00000000-0000-4000-8000-000000000006",
                            name: "testUser",
                            username: "testUser",
                            description: "",
                            avatarUrl: "",
                            worksCount: 0,
                            subscribersCount: 0,
                            subscribesCount: 0,
                            createdAt: "2026-01-01T00:00:00.000Z",
                            trustStatus: "TRUST",
                            onlineStatus: "ONLINE",
                            enabled: true,
                            subscribed: false
                        }
                    })),
                    number: 0,
                    size: 20,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
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

    // Альбом пока не входит в PostResponse, вернуть после добавления поля
    // test("Отображается ссылка на альбом поста", async ({ page }) => {
    //     await page.goto(POST_URL);
    //
    //     await expect(
    //         page.getByRole("link", { name: "Go to album page Album title" })
    //     ).toBeVisible();
    // });

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

test.describe("Post - лайки и жалобы", () => {
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
        await page.route("**/api/post/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-000000000007",
                    title: "Post title",
                    description: "Description Description",
                    likesCount: 10,
                    commentsCount: 5,
                    reportsCount: 3,
                    aiStatus: "good",
                    imageUrl: "",
                    createdAt: "2026-01-01T00:00:00.000Z",
                    author: null,
                    community: null,
                    tags: ["beauty", "nature"],
                    liked: false,
                    reported: false
                })
            })
        );
        await page.route("**/api/post/*/like", route =>
            route.fulfill({ status: 200, contentType: "text/plain", body: "ok" })
        );
        await page.route("**/api/post/*/report", route =>
            route.fulfill({ status: 200, contentType: "text/plain", body: "ok" })
        );
        await page.route(/\/api\/comment(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [1, 2, 3, 4, 5].map(i => ({
                        uuid: `00000000-0000-4000-8000-00000000010${i}`,
                        text: "Текст комментария Текст комментария Текст комментария",
                        createdAt: `2026-04-05T08:52:55.27${i}Z`,
                        author: {
                            uuid: "00000000-0000-4000-8000-000000000006",
                            name: "testUser",
                            username: "testUser",
                            description: "",
                            avatarUrl: "",
                            worksCount: 0,
                            subscribersCount: 0,
                            subscribesCount: 0,
                            createdAt: "2026-01-01T00:00:00.000Z",
                            trustStatus: "TRUST",
                            onlineStatus: "ONLINE",
                            enabled: true,
                            subscribed: false
                        }
                    })),
                    number: 0,
                    size: 20,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
    });

    test("Счётчики лайков и жалоб берутся из ответа API", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await expect(page.getByRole("button", { name: "Like" })).toContainText("10");
        await expect(page.getByRole("button", { name: "Submit a report" })).toContainText(
            "3"
        );
    });

    test("Лайк и жалоба пользователя отмечаются по данным API", async ({ page }) => {
        await page.route("**/api/post/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-000000000007",
                    title: "Post title",
                    description: "Description Description",
                    likesCount: 10,
                    commentsCount: 5,
                    reportsCount: 3,
                    aiStatus: "good",
                    imageUrl: "",
                    createdAt: "2026-01-01T00:00:00.000Z",
                    author: null,
                    community: null,
                    tags: ["beauty", "nature"],
                    liked: true,
                    reported: true
                })
            })
        );
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await expect(page.getByRole("button", { name: "Unlike" })).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Report submitted" })
        ).toBeVisible();
    });

    test("Клик по лайку увеличивает счётчик", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await page.getByRole("button", { name: "Like" }).click();

        await expect(page.getByRole("button", { name: "Unlike" })).toContainText("11");
    });

    test("Жалоба отмечается и увеличивает счётчик", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await page.getByRole("button", { name: "Submit a report" }).click();

        await expect(
            page.getByRole("button", { name: "Report submitted" })
        ).toContainText("4");
    });
});

test.describe("Post - публикация текущего пользователя", () => {
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
        await page.route("**/api/post/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
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
                        uuid: "00000000-0000-4000-8000-00000000000a",
                        name: "testUser",
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
                    tags: ["beauty", "nature"],
                    liked: false,
                    reported: false
                })
            })
        );
        await page.route(/\/api\/comment(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [1, 2, 3, 4, 5].map(i => ({
                        uuid: `00000000-0000-4000-8000-00000000010${i}`,
                        text: "Текст комментария Текст комментария Текст комментария",
                        createdAt: `2026-04-05T08:52:55.27${i}Z`,
                        author: {
                            uuid: "00000000-0000-4000-8000-000000000006",
                            name: "testUser",
                            username: "testUser",
                            description: "",
                            avatarUrl: "",
                            worksCount: 0,
                            subscribersCount: 0,
                            subscribesCount: 0,
                            createdAt: "2026-01-01T00:00:00.000Z",
                            trustStatus: "TRUST",
                            onlineStatus: "ONLINE",
                            enabled: true,
                            subscribed: false
                        }
                    })),
                    number: 0,
                    size: 20,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
    });

    test("Отображаются кнопки редактирования и удаления", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await expect(page.getByRole("button", { name: "Delete post" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Edit post" })).toBeVisible();
    });

    test("Ссылка редактирования ведёт на страницу редактирования", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await expect(page.getByRole("link", { name: "Edit post" })).toHaveAttribute(
            "href",
            "/post/add?post=00000000-0000-4000-8000-000000000007"
        );
    });

    test("Подтверждение удаления открывает профиль автора", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        await page.getByRole("button", { name: "Delete post" }).click();
        await page.getByRole("button", { name: "Delete post Post title" }).click();

        await expect(page).toHaveURL(/\/profile\/00000000-0000-4000-8000-00000000000a/);
    });
});

test.describe("Post - публикация сообщества", () => {
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
        await page.route("**/api/post/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-000000000007",
                    title: "Post title",
                    description: "Description Description",
                    likesCount: 10,
                    commentsCount: 5,
                    reportsCount: 3,
                    aiStatus: "good",
                    imageUrl: "",
                    createdAt: "2026-01-01T00:00:00.000Z",
                    author: null,
                    community: {
                        owner: {
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
                        name: "Test community",
                        username: "testCommunity",
                        description: "",
                        avatarUrl: "",
                        worksCount: 0,
                        subscribersCount: 0,
                        subscribesCount: 0,
                        createdAt: "2026-01-01T00:00:00.000Z",
                        trustStatus: "UNTRUST",
                        admins: []
                    },
                    tags: [],
                    liked: false,
                    reported: false
                })
            })
        );
        await page.route(/\/api\/comment(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [1, 2, 3, 4, 5].map(i => ({
                        uuid: `00000000-0000-4000-8000-00000000010${i}`,
                        text: "Текст комментария Текст комментария Текст комментария",
                        createdAt: `2026-04-05T08:52:55.27${i}Z`,
                        author: {
                            uuid: "00000000-0000-4000-8000-000000000006",
                            name: "testUser",
                            username: "testUser",
                            description: "",
                            avatarUrl: "",
                            worksCount: 0,
                            subscribersCount: 0,
                            subscribesCount: 0,
                            createdAt: "2026-01-01T00:00:00.000Z",
                            trustStatus: "TRUST",
                            onlineStatus: "ONLINE",
                            enabled: true,
                            subscribed: false
                        }
                    })),
                    number: 0,
                    size: 20,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
    });

    test("Ссылка автора ведёт на страницу сообщества", async ({ page }) => {
        await page.goto(POST_URL, { waitUntil: "networkidle" });

        const communityLink = page
            .getByRole("article")
            .getByRole("link", { name: "Go to Test community's community page" });
        await expect(communityLink).toBeVisible();
        await expect(communityLink).toHaveAttribute("href", "/communities/testCommunity");
    });
});
