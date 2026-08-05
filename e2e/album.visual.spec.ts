import { expect, test } from "@playwright/test";

const ALBUM_URL = "/en/album/00000000-0000-4000-8000-00000000000b";

test.describe("Album - визуальная проверка блоков", () => {
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
        const authorResponse = {
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
            enabled: true
        };

        await page.route("**/api/album/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-00000000000b",
                    title: "Album title",
                    description: "Description Description",
                    worksCount: 4,
                    authorUser: authorResponse,
                    authorCommunity: null,
                    imageUrl: "/src/shared/icons/img-CTA.jpg",
                    createdAt: "2026-03-24T18:48:16.175Z"
                })
            })
        );
        await page.route(/\/api\/post(\/author)?(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        "00000000-0000-4000-8000-000000000007",
                        "00000000-0000-4000-8000-00000000000b",
                        "00000000-0000-4000-8000-00000000000a",
                        "00000000-0000-4000-8000-000000000006"
                    ].map(uuid => ({
                        uuid,
                        title: "post 1 name",
                        description:
                            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
                        likesCount: 1,
                        commentsCount: 1,
                        reportsCount: 1,
                        aiStatus: "good",
                        imageUrl: "/src/shared/icons/img-CTA.jpg",
                        createdAt: "2026-03-24T18:48:16.175Z",
                        author: authorResponse,
                        community: null,
                        tags: [],
                        liked: false,
                        reported: false
                    })),
                    number: 0,
                    size: 20,
                    totalElements: 4,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );

        await page.goto(ALBUM_URL, { waitUntil: "networkidle" });
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока AlbumCard", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot(
            "album-card.png",
            {
                animations: "disabled"
            }
        );
    });
});
