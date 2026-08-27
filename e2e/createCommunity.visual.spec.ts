import { expect, test } from "@playwright/test";

const CREATE_COMMUNITY_URL = "/en/communities/add";

test.describe("CreateCommunity - визуальная проверка блоков", () => {
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
        await page.route(/\/api\/user\/friends(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000014",
                            name: "Alice Wonder",
                            username: "alice.wonder",
                            description: "",
                            avatarUrl: "",
                            worksCount: 12,
                            subscribersCount: 450,
                            subscribesCount: 30,
                            createdAt: "2025-12-01T10:00:00.000Z",
                            trustStatus: "TRUST",
                            onlineStatus: "ONLINE",
                            enabled: true
                        },
                        {
                            uuid: "00000000-0000-4000-8000-00000000001b",
                            name: "Bob Rivers",
                            username: "bob.rivers",
                            description: "",
                            avatarUrl: "",
                            worksCount: 7,
                            subscribersCount: 210,
                            subscribesCount: 15,
                            createdAt: "2026-01-05T08:00:00.000Z",
                            trustStatus: "TRUST",
                            onlineStatus: "OFFLINE",
                            enabled: true
                        }
                    ],
                    number: 0,
                    size: 10,
                    totalElements: 2,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );

        await page.goto(CREATE_COMMUNITY_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока CreateCommunity", async ({ page }) => {
        await expect(page.locator("main form").first()).toHaveScreenshot(
            "create-community.png",
            {
                animations: "disabled"
            }
        );
    });
});
