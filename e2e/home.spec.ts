import {expect, test} from "@playwright/test";

test.describe("Home - главная страница", () => {
    test("Контент страницы загружается", async ({ page }) => {
        await page.goto("/");

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "An error occurred" })).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto("/");

        await expect(page).toHaveTitle("Home | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "A professional space for creators. Build your portfolio, join communities, and receive honest feedback. We care about content quality: strict 18+ moderation and protection against AI-generated art."
        );
    });
});
