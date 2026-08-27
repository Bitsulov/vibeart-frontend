import { expect, test } from "@playwright/test";

const COMMUNITY_URL = "/en/communities/00000000-0000-4000-8000-00000000001d";

test.describe("Community - страница сообщества", () => {
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
        await page.route("**/api/community/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-00000000001d",
                    owner: {
                        uuid: "00000000-0000-4000-8000-000000000015",
                        name: "testOwner",
                        username: "testOwner",
                        description: "",
                        avatarUrl: "",
                        worksCount: 0,
                        subscribersCount: 0,
                        subscribesCount: 0,
                        createdAt: "2026-01-01T00:00:00.000Z",
                        trustStatus: "TRUST",
                        onlineStatus: "ONLINE",
                        enabled: true,
                        subscribed: null
                    },
                    name: "Digital Art Club",
                    username: "digital-art-club",
                    description:
                        "Community for digital artists sharing their works and techniques",
                    avatarUrl: "",
                    worksCount: 42,
                    subscribersCount: 1200,
                    subscribesCount: 5,
                    createdAt: "2026-01-10T10:00:00.000Z",
                    trustStatus: "TRUST",
                    admins: [],
                    tags: [],
                    subscribed: false
                })
            })
        );
        await page.route(/\/api\/community\/.+\/subscribe$/, route =>
            route.fulfill({
                status: 200,
                contentType: "text/plain",
                body: "Subscription toggled successfully"
            })
        );
        await page.route(/\/api\/album(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [],
                    number: 0,
                    size: 5,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            })
        );
        await page.route(/\/api\/post\/author(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [],
                    number: 0,
                    size: 6,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(page).toHaveTitle("Community | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Creative community page: member posts, description, and group members. Join, share your works, and connect with creators who share your spirit."
        );
    });

    test("Отображается название сообщества", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(
            page.getByRole("heading", { level: 1, name: "Digital Art Club" })
        ).toBeVisible();
    });

    test("Отображается username сообщества", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByText("@digital-art-club")).toBeVisible();
    });

    test("Отображается аватар сообщества", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByAltText(/User avatar Digital Art Club/)).toBeVisible();
    });

    test("Отображается кнопка раскрытия описания", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(
            page.getByRole("button", { name: "Expand description" })
        ).toBeVisible();
    });

    test("Клик по кнопке открывает модальное окно с информацией", async ({ page }) => {
        await page.goto(COMMUNITY_URL);
        await page.waitForLoadState("networkidle");

        await page.getByRole("button", { name: "Expand description" }).click();

        await expect(page.locator("dialog")).toBeVisible();
    });

    test("Модальное окно закрывается по кнопке закрытия", async ({ page }) => {
        await page.goto(COMMUNITY_URL);
        await page.waitForLoadState("networkidle");

        await page.getByRole("button", { name: "Expand description" }).click();
        await expect(page.locator("dialog")).toBeVisible();
        await page.getByRole("button", { name: "Close modal window" }).click();

        await expect(page.locator("dialog")).not.toBeVisible();
    });

    test("Отображается слайдер альбомов", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("heading", { name: "Albums" })).toBeVisible();
    });

    test("Кнопка подписки меняет состояние при клике", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        const subscribeButton = page.getByRole("button", { name: "Subscribe to" });
        await expect(subscribeButton).toBeVisible();
        await subscribeButton.click();
        await expect(
            page.getByRole("button", { name: "Unsubscribe from" })
        ).toBeVisible();
    });
});

test.describe("Community - владелец сообщества", () => {
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
        await page.route("**/api/community/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-00000000001d",
                    owner: {
                        uuid: "00000000-0000-4000-8000-00000000000a",
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
                        subscribed: null
                    },
                    name: "Digital Art Club",
                    username: "digital-art-club",
                    description: "Community for digital artists",
                    avatarUrl: "",
                    worksCount: 42,
                    subscribersCount: 1200,
                    subscribesCount: 5,
                    createdAt: "2026-01-10T10:00:00.000Z",
                    trustStatus: "TRUST",
                    admins: [],
                    tags: [],
                    subscribed: false
                })
            })
        );
        await page.route(/\/api\/album(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [],
                    number: 0,
                    size: 5,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            })
        );
        await page.route(/\/api\/post\/author(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [],
                    number: 0,
                    size: 6,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            })
        );
    });

    test("Не отображается кнопка подписки для своего сообщества", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Subscribe to" })
        ).not.toBeVisible();
    });

    test("Отображается кнопка добавления публикации", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(
            page.getByRole("link", { name: "Go to create post page" })
        ).toBeVisible();
    });

    test("Отображается слайд добавления альбома", async ({ page }) => {
        await page.goto(COMMUNITY_URL);

        await expect(
            page.getByRole("link", { name: "Go to create album page" })
        ).toBeVisible();
    });
});
