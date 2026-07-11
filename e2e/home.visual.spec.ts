import { expect, test } from "@playwright/test";

const HOME_URL = "/en/";

test.describe("Home - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );

        await page.goto(HOME_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока HomeIntro", async ({ page }) => {
        await expect(page.locator("main > section").nth(0)).toHaveScreenshot(
            "home-intro.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока HomeSteps", async ({ page }) => {
        await expect(page.locator("main > section").nth(1)).toHaveScreenshot(
            "home-steps.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока HomeReviews", async ({ page }) => {
        await expect(page.locator("main > section").nth(2)).toHaveScreenshot(
            "home-reviews.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока HomeCTA", async ({ page }) => {
        await expect(page.locator("main > section").nth(3)).toHaveScreenshot(
            "home-cta.png",
            {
                animations: "disabled"
            }
        );
    });
});
