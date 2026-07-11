import { expect, test } from "@playwright/test";

test.describe("Policy - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );

        await page.goto("/en/policy");
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока PolicyText", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "policy-text.png",
            {
                animations: "disabled",
                maxDiffPixelRatio: 0.02,
                mask: [
                    page
                        .locator("main section li, main section p")
                        .filter({ hasText: /https?:\/\// }),
                    page
                        .locator("main section li, main section p")
                        .filter({ hasText: /[\w.+-]+@[\w-]+\.\w+/ })
                ]
            }
        );
    });
});
