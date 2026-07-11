import { expect, test } from "@playwright/test";

const REGISTER_URL = "/en/register";

test.describe("Register - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );

        await page.goto(REGISTER_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока RegisterForm", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "register-form.png",
            {
                animations: "disabled"
            }
        );
    });
});
