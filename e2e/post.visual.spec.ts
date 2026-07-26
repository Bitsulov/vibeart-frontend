import { expect, test } from "@playwright/test";

const POST_URL = "/en/post/00000000-0000-4000-8000-000000000007";

test.describe("Post - визуальная проверка блоков", () => {
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
                    description:
                        "Description Description Description Description Description Description Description Description Description",
                    likesCount: 999000000,
                    commentsCount: 999000000,
                    reportsCount: 999000000,
                    aiStatus: "good",
                    imageUrl: "/src/shared/icons/img-CTA.jpg",
                    createdAt: "2025-09-01T00:00:00.000Z",
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
                    tags: ["beauty", "nature", "aaa", "beauty", "aaa"],
                    liked: false,
                    reported: false
                })
            })
        );

        await page.goto(POST_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока PostCard", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot(
            "post-card.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока PostComments", async ({ page }) => {
        await expect(page.locator("#comments")).toHaveScreenshot("post-comments.png", {
            animations: "disabled",
            mask: [page.locator("#comments a + div > p:last-child")]
        });
    });
});
