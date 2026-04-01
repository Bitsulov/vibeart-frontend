import { expect, test } from "@playwright/test";

test.describe("Auth - страница авторизации", () => {
    test("Контент страницы загружается", async ({ page }) => {
        await page.goto("/auth");

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "An error occurred" })).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto("/auth");

        await expect(page).toHaveTitle("Login | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Log in to publish your works, create albums, and connect with like-minded creators."
        );
    });

    test("Отображаются поля email и пароля", async ({ page }) => {
        await page.goto("/auth");

        await expect(page.getByLabel("Enter email")).toBeVisible();
        await expect(page.getByLabel("Enter password")).toBeVisible();
    });

    test("Отображаются ссылки на регистрацию и восстановление пароля", async ({ page }) => {
        await page.goto("/auth");

        await expect(page.getByRole("link", { name: "Go to registration" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Go to password recovery" })).toBeVisible();
    });

    test("Пустая отправка формы показывает ошибку", async ({ page }) => {
        await page.goto("/auth");

        await page.getByRole("button", { name: "Authorize" }).click();

        await expect(page.getByText("Enter your email address")).toBeVisible();
    });
});
