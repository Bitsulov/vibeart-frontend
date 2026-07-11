import { expect, test } from "@playwright/test";

test.describe("Register - страница регистрации", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto("/en/register");

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto("/en/register");

        await expect(page).toHaveTitle("Sign Up | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Sign up to create your own portfolio, organize your works into albums, and find like-minded creators. Chat with others and build your creative communities."
        );
    });

    test("Отображаются поля email, пароля и подтверждения пароля", async ({ page }) => {
        await page.goto("/en/register");

        await expect(page.getByLabel("Enter email")).toBeVisible();
        await expect(page.getByLabel("Enter password")).toBeVisible();
        await expect(page.getByLabel("Confirm password")).toBeVisible();
    });

    test("Отображаются чекбоксы соглашений со ссылками", async ({ page }) => {
        await page.goto("/en/register");

        await expect(
            page.getByRole("checkbox", { name: "Agree to the User Agreement" })
        ).toBeVisible();
        await expect(
            page.getByRole("checkbox", { name: "Agree to the Privacy Policy" })
        ).toBeVisible();
        await expect(
            page.getByRole("main").getByRole("link", { name: "Go to user agreement" })
        ).toBeVisible();
        await expect(
            page.getByRole("main").getByRole("link", { name: "Go to privacy policy" })
        ).toBeVisible();
    });

    test("Отображается ссылка на страницу входа", async ({ page }) => {
        await page.goto("/en/register");

        await expect(
            page.getByRole("main").getByRole("link", { name: "Go to authorization" })
        ).toBeVisible();
    });

    test("Пустая отправка формы показывает ошибку email", async ({ page }) => {
        await page.goto("/en/register");

        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Enter your email address")).toBeVisible();
    });

    test("Несовпадение паролей показывает ошибку", async ({ page }) => {
        await page.goto("/en/register");

        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("different123");
        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Passwords do not match")).toBeVisible();
    });

    test("Незаполненный чекбокс соглашения блокирует регистрацию", async ({ page }) => {
        await page.goto("/en/register");

        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("password123");
        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Please accept the User Agreement")).toBeVisible();
    });

    test("Незаполненный чекбокс политики блокирует регистрацию", async ({ page }) => {
        await page.goto("/en/register");

        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("password123");
        await page
            .getByRole("checkbox", { name: "Agree to the User Agreement" })
            .click({ force: true });
        await page.getByRole("button", { name: "Register" }).click();

        await expect(page.getByText("Please accept the Privacy Policy")).toBeVisible();
    });
});

test.describe("Register - подтверждение кода (шаг 2)", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );
        await page.route("**/api/auth/register", route =>
            route.fulfill({ status: 200, body: "ok" })
        );

        await page.goto("/en/register");
        await page.getByLabel("Enter email").fill("test@example.com");
        await page.getByLabel("Enter password").fill("password123");
        await page.getByLabel("Confirm password").fill("password123");
        await page
            .getByRole("checkbox", { name: "Agree to the User Agreement" })
            .click({ force: true });
        await page
            .getByRole("checkbox", { name: "Agree to the Privacy Policy" })
            .click({ force: true });

        await Promise.all([
            page.waitForResponse("**/api/auth/register"),
            page.getByRole("button", { name: "Register" }).click()
        ]);

        await expect(
            page.getByRole("heading", { name: "Email address verification" })
        ).toBeVisible();
    });

    test("Отображается форма ввода кода с 6 ячейками", async ({ page }) => {
        await expect(page.getByRole("textbox")).toHaveCount(6);
        await expect(
            page.getByRole("button", { name: "Send code and confirm registration" })
        ).toBeVisible();
    });

    test("Кнопка повторной отправки кода изначально отключена с таймером", async ({
        page
    }) => {
        const resendButton = page.getByRole("button", {
            name: "Resend verification code"
        });

        await expect(resendButton).toBeDisabled();
        await expect(resendButton).toContainText("120");
    });

    test("Кнопка 'Вернуться к регистрации' возвращает на форму регистрации", async ({
        page
    }) => {
        await page.getByRole("button", { name: "Return to registration" }).click();

        await expect(page.getByRole("heading", { name: "Registration" })).toBeVisible();
    });

    test("Неполный код показывает уведомление об ошибке", async ({ page }) => {
        await page.getByRole("textbox").first().fill("1");
        await page
            .getByRole("button", { name: "Send code and confirm registration" })
            .click();

        await expect(page.getByText("Code must be 6 digits")).toBeVisible();
    });
});
