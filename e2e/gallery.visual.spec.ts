import { expect, test } from "@playwright/test";

const GALLERY_URL = "/en/gallery";

const firstImage = "/src/shared/icons/img-CTA.jpg";
const secondImage = "/src/shared/icons/img-template.jpg";

const postsPageResponse = {
    content: [
        ["00000000-0000-4000-8000-00000000000d", firstImage],
        ["00000000-0000-4000-8000-000000000012", secondImage],
        ["00000000-0000-4000-8000-000000000013", secondImage],
        ["00000000-0000-4000-8000-00000000000e", secondImage],
        ["00000000-0000-4000-8000-000000000011", firstImage],
        ["00000000-0000-4000-8000-00000000000f", secondImage],
        ["00000000-0000-4000-8000-000000000010", firstImage]
    ].map(([uuid, imageUrl]) => ({
        uuid,
        title: "post 1 name",
        description: "post 1 name".repeat(7),
        likesCount: 1,
        commentsCount: 1,
        reportsCount: 1,
        aiStatus: "good",
        imageUrl,
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
    })),
    number: 0,
    size: 20,
    totalElements: 7,
    totalPages: 1,
    first: true,
    last: true,
    empty: false
};

test.describe("Gallery - визуальная проверка блоков", () => {
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
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(postsPageResponse)
            })
        );

        await page.goto(GALLERY_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока GalleryPostList", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "gallery-post-list.png",
            {
                animations: "disabled"
            }
        );
    });
});
