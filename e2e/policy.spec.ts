import { expect, test } from "@playwright/test";

test.describe("Policy - страница политики конфиденциальности", () => {
    test("Контент страницы загружается", async ({ page }) => {
        await page.goto("/policy");

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "An error occurred" })).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto("/policy");

        await expect(page).toHaveTitle("Privacy Policy | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Learn what personal data is collected on the site, how it is used, and how it is protected."
        );
    });
});
