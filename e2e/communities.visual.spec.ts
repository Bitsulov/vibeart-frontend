import { expect, test } from "@playwright/test";

const COMMUNITIES_URL = "/en/communities";

test.describe("Communities - визуальная проверка блоков", () => {
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

        await page.goto(COMMUNITIES_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока CommunitiesLists", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "communities-lists.png",
            {
                animations: "disabled"
            }
        );
    });
});
