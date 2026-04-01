import { expect, test } from "@playwright/test";

test.describe("Register - страница регистрации", () => {
    test("Контент страницы загружается", async ({ page }) => {
        await page.goto("/register");

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "An error occurred" })).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto("/register");

        await expect(page).toHaveTitle("Sign Up | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Sign up to create your own portfolio, organize your works into albums, and find like-minded creators. Chat with others and build your creative communities."
        );
    });

    test("Отображаются поля email, пароля и подтверждения пароля", async ({ page }) => {
        await page.goto("/register");

        await expect(page.getByLabel("Enter email")).toBeVisible();
        await expect(page.getByLabel("Enter password")).toBeVisible();
        await expect(page.getByLabel("Confirm password")).toBeVisible();
    });

    test("Отображаются чекбоксы соглашений со ссылками", async ({ page }) => {
        await page.goto("/register");

        await expect(page.getByRole("checkbox", { name: "Agree to the User Agreement" })).toBeVisible();
        await expect(page.getByRole("checkbox", { name: "Agree to the Privacy Policy" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Go to user agreement" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Go to privacy policy" })).toBeVisible();
    });

    test("Отображается ссылка на страницу входа", async ({ page }) => {
        await page.goto("/register");

        await expect(page.getByRole("link", { name: "Go to authorization" })).toBeVisible();
    });

    test("Пустая отправка формы показывает ошибку email", async ({ page }) => {
        await page.goto("/register");

        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Enter your email address")).toBeVisible();
    });

    test("Несовпадение паролей показывает ошибку", async ({ page }) => {
        await page.goto("/register");

        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("different123");
        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Passwords do not match")).toBeVisible();
    });

    test("Незаполненный чекбокс соглашения блокирует регистрацию", async ({ page }) => {
        await page.goto("/register");

        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("password123");
        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Please accept the User Agreement")).toBeVisible();
    });

    test("Незаполненный чекбокс политики блокирует регистрацию", async ({ page }) => {
        await page.goto("/register");

        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("password123");
        await page.getByRole("checkbox", { name: "Agree to the User Agreement" }).click({force: true});
        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Please accept the Privacy Policy")).toBeVisible();
    });
});
