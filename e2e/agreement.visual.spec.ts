import { expect, test } from "@playwright/test";

test.describe("Agreement - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );

        await page.goto("/en/agreement");
        await expect(
            page.getByRole("heading", { level: 1, name: "USER AGREEMENT (PUBLIC OFFER)" })
        ).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока AgreementText", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "agreement-text.png",
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
