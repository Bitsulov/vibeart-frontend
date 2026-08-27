import { expect, test } from "@playwright/test";

const COMMUNITY_URL = "/en/communities/00000000-0000-4000-8000-00000000001d";

test.describe("Community - визуальная проверка блоков", () => {
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
                        enabled: true
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
                    tags: []
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

        await page.goto(COMMUNITY_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока CommunityInfo", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot(
            "community-info.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока AlbumSlider", async ({ page }) => {
        await expect(page.locator("main section").nth(1)).toHaveScreenshot(
            "community-album-slider.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока PostList", async ({ page }) => {
        await expect(page.locator("main section").nth(2)).toHaveScreenshot(
            "community-post-list.png",
            {
                animations: "disabled"
            }
        );
    });
});
