import {expect, test} from "@playwright/test";

test.describe('Error - страница ошибки', () => {
    test('Контент страницы загружается', async ({ page }) => {
        await page.goto('/invalidUrl');

        await expect(page.getByRole('main')).toBeVisible();
        await expect(page.getByRole('heading', { level: 1, name: 'An error occurred' })).toBeVisible();
    });

    test('Заголовок и описание страницы', async ({ page }) => {
        await page.goto('/invalidUrl');

        await expect(page).toHaveTitle('Error | VibeArt');
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
            'content',
            'Access error. The requested page does not exist, has been removed, or is temporarily unavailable. Please check the URL or return to the homepage.'
        );
    });
});
