import { expect, test } from "@playwright/test";

test.describe("Error - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );

        await page.goto("/en/invalidUrl");
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока ErrorInfo", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "error-info.png",
            {
                animations: "disabled"
            }
        );
    });
});
