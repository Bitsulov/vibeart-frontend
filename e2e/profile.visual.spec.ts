import { expect, test } from "@playwright/test";

const PROFILE_URL = "/en/profile/00000000-0000-4000-8000-00000000000b";

test.describe("Profile - визуальная проверка блоков", () => {
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
        await page.route("**/api/user/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    name: "testUsergffdgfd",
                    username: "testUser",
                    description:
                        "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
                    avatarUrl: "",
                    worksCount: 0,
                    subscribersCount: 0,
                    subscribesCount: 0,
                    createdAt: "2026-01-01T00:00:00.000Z",
                    trustStatus: "UNTRUST",
                    onlineStatus: "ONLINE",
                    enabled: true
                })
            })
        );
        await page.route(/\/api\/album(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-00000000000c",
                            title: "test album",
                            description: "",
                            worksCount: 1,
                            authorUser: null,
                            authorCommunity: null,
                            imageUrl: "/src/shared/icons/img-CTA.jpg",
                            createdAt: "2026-01-01T00:00:00.000Z"
                        },
                        {
                            uuid: "00000000-0000-4000-8000-00000000000d",
                            title: "test album 2",
                            description: "",
                            worksCount: 1,
                            authorUser: null,
                            authorCommunity: null,
                            imageUrl: "/src/shared/icons/img-template.jpg",
                            createdAt: "2026-01-01T00:00:00.000Z"
                        }
                    ],
                    number: 0,
                    size: 5,
                    totalElements: 2,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
        await page.route(/\/api\/post\/author(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-000000000007",
                            title: "post 1 name",
                            description: "post 1 name".repeat(7),
                            likesCount: 1,
                            commentsCount: 1,
                            reportsCount: 1,
                            aiStatus: "good",
                            imageUrl: "/src/shared/icons/img-CTA.jpg",
                            createdAt: "2026-03-24T18:48:16.175Z",
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
                    size: 6,
                    totalElements: 1,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );

        await page.goto(PROFILE_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока ProfileInfo", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot(
            "profile-info.png",
            {
                animations: "disabled",
                mask: [page.getByText("Created at:", { exact: true }).locator("..")]
            }
        );
    });

    test("снимок блока AlbumSlider", async ({ page }) => {
        await expect(page.locator("main section").nth(1)).toHaveScreenshot(
            "profile-album-slider.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока PostList", async ({ page }) => {
        await expect(page.locator("main section").nth(2)).toHaveScreenshot(
            "profile-post-list.png",
            {
                animations: "disabled"
            }
        );
    });
});
