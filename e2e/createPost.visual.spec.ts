import { expect, test } from "@playwright/test";

const CREATE_POST_URL = "/en/post/add";

test.describe("CreatePost - визуальная проверка блоков", () => {
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
        await page.route(/\/api\/tag(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        { title: "beauty", createdAt: "" },
                        { title: "nature", createdAt: "" },
                        { title: "aaa", createdAt: "" },
                        { title: "beauty", createdAt: "" },
                        { title: "aaa", createdAt: "" }
                    ],
                    number: 0,
                    size: 10,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );

        await page.goto(CREATE_POST_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока CreatePost", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "create-post.png",
            {
                animations: "disabled",
                mask: [page.locator("article")]
            }
        );
    });
});
