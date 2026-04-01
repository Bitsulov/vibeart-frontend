import { test, expect } from "@playwright/test";

test.describe('Agreement - страница пользовательского соглашения', () => {
    test('Контент страницы загружается', async ({ page }) => {
        await page.goto('/agreement');

        await expect(page.getByRole('main')).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "An error occurred" })).not.toBeVisible();
    });

    test('Заголовок и описание страницы', async ({ page }) => {
        await page.goto('/agreement');

        await expect(page).toHaveTitle('User Agreement | VibeArt');
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
            'content',
            'Review the terms of use, user rights and responsibilities, and the rules for providing services.'
        );
    });
});
