import { expect, test } from "@playwright/test";

const AUTH_URL = "/en/auth";

test.describe("Auth - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );

        await page.goto(AUTH_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока AuthForm", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "auth-form.png",
            {
                animations: "disabled"
            }
        );
    });
});
