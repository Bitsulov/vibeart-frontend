import { expect, test } from "@playwright/test";

const SETTINGS_URL = "/en/settings";

test.describe("Settings - визуальная проверка блоков", () => {
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
        await page.route("**/api/user/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    name: "testUser",
                    username: "testUser",
                    description: "",
                    avatarUrl: "",
                    worksCount: 0,
                    subscribersCount: 0,
                    subscribesCount: 0,
                    createdAt: "2026-01-01T00:00:00.000Z",
                    trustStatus: "TRUST",
                    onlineStatus: "ONLINE",
                    enabled: true
                })
            })
        );

        await page.goto(SETTINGS_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() =>
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        );
    });

    test("снимок блока SettingsForm", async ({ page }) => {
        await expect(page.locator("main form").nth(0)).toHaveScreenshot(
            "settings-form.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока EmailChangeForm", async ({ page }) => {
        await expect(page.locator("main form").nth(1)).toHaveScreenshot(
            "settings-email-form.png",
            {
                animations: "disabled"
            }
        );
    });

    test("снимок блока PasswordChangeForm", async ({ page }) => {
        await expect(page.locator("main form").nth(2)).toHaveScreenshot(
            "settings-password-form.png",
            {
                animations: "disabled"
            }
        );
    });
});
