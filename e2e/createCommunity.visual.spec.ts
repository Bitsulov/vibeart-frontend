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
