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

        await page.route(/\/api\/comment(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: ["271", "272", "273", "274", "275"].map((suffix, i) => ({
                        uuid: `00000000-0000-4000-8000-00000000010${i + 1}`,
                        text: "Текст комментария Текст комментария Текст комментария",
                        createdAt: `2026-04-05T08:52:55.${suffix}Z`,
                        author: {
                            uuid: "00000000-0000-4000-8000-000000000006",
                            name: "testUser",
                            username: "testUser",
                            description:
                                "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
                            avatarUrl: "/src/shared/icons/img-CTA.jpg",
                            worksCount: 0,
                            subscribersCount: 999100,
                            subscribesCount: 0,
                            createdAt: "2026-03-22T18:50:29.921Z",
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
