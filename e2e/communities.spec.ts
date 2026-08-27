import { expect, test } from "@playwright/test";

const COMMUNITIES_URL = "/en/communities";

test.describe("Communities - страница сообществ", () => {
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
        await page.route(/\/api\/community\/.+\/subscribe$/, route =>
            route.fulfill({
                status: 200,
                contentType: "text/plain",
                body: "Subscription toggled successfully"
            })
        );
        await page.route(/\/api\/community\/user(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000015",
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
                                enabled: true
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
                            tags: []
                        }
                    ],
                    number: 0,
                    size: 4,
                    totalElements: 1,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
        await page.route(/\/api\/community\/owned(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000016",
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
                                enabled: true
                            },
                            name: "Sketch Daily",
                            username: "sketch-daily",
                            description: "Daily sketching challenges",
                            avatarUrl: "",
                            worksCount: 18,
                            subscribersCount: 340,
                            subscribesCount: 2,
                            createdAt: "2026-02-15T12:00:00.000Z",
                            trustStatus: "TRUST",
                            admins: [],
                            tags: []
                        }
                    ],
                    number: 0,
                    size: 4,
                    totalElements: 1,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
        await page.route(/\/api\/community(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000017",
                            owner: {
                                uuid: "00000000-0000-4000-8000-000000000006",
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
                                enabled: true
                            },
                            name: "Photo Masters",
                            username: "photo-masters",
                            description: "Professional and amateur photographers",
                            avatarUrl: "",
                            worksCount: 310,
                            subscribersCount: 8700,
                            subscribesCount: 12,
                            createdAt: "2025-11-20T09:00:00.000Z",
                            trustStatus: "TRUST",
                            admins: [],
                            tags: []
                        }
                    ],
                    number: 0,
                    size: 12,
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
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page).toHaveTitle("Communities | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Find communities by interest, join creative groups, and start your own. Share your works, discuss ideas, and grow together with creators who share your spirit."
        );
    });

    test("Отображается поле поиска", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("textbox")).toBeVisible();
    });

    test("Поле поиска принимает введённый текст", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        await expect(async () => {
            await page.getByRole("textbox").fill("art");
            await expect(page.getByRole("textbox")).toHaveValue("art");
        }).toPass();
    });

    test("Отображается ссылка создания сообщества", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        await expect(
            page.getByRole("link", { name: "Go to create community page" })
        ).toBeVisible();
    });

    test("Отображаются заголовки списков сообществ", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        await expect(page.getByRole("heading", { name: "My communities" })).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "My subscriptions" })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "All communities" })
        ).toBeVisible();
    });

    test("Отображаются карточки сообществ", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        const cards = page.getByRole("article");
        await expect(cards.first()).toBeVisible();
    });

    test("Кнопка подписки меняет состояние при клике", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        const subscribeButton = page
            .getByRole("button", { name: "Subscribe", exact: true })
            .first();
        await expect(subscribeButton).toBeVisible();
        await subscribeButton.click();
        await expect(
            page.getByRole("button", { name: "Unsubscribe", exact: true }).first()
        ).toBeVisible();
    });

    test("Ссылка 'Перейти' ведёт на страницу сообщества", async ({ page }) => {
        await page.goto(COMMUNITIES_URL);

        const goLink = page.getByRole("link", { name: "Go", exact: true }).first();
        await expect(goLink).toBeVisible();
        await expect(goLink).toHaveAttribute("href", /\/communities\/.+/);
    });
});
