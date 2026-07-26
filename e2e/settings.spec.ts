import { expect, test } from "@playwright/test";

const SETTINGS_URL = "/en/settings";

test.describe("Settings - страница настроек профиля", () => {
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
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(SETTINGS_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(SETTINGS_URL);

        await expect(page).toHaveTitle("Profile Settings | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Manage your VibeArt profile: edit your name, avatar, and bio. Customize your page so the community sees you as you truly are."
        );
    });

    test.describe("SettingsForm - форма настроек", () => {
        test("Отображается заголовок формы", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(
                page.getByRole("heading", { level: 1, name: "Settings" })
            ).toBeVisible();
        });

        test("Отображаются секции аватара, имени, id и описания", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByText("Profile photo")).toBeVisible();
            await expect(page.getByText("Name", { exact: true })).toBeVisible();
            await expect(page.getByRole("heading", { name: "Unique ID" })).toBeVisible();
            await expect(
                page.getByRole("heading", { name: "Description" })
            ).toBeVisible();
        });

        test("Отображаются поля ввода имени и id", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByLabel("Enter name")).toBeVisible();
            await expect(page.getByLabel("Enter ID")).toBeVisible();
        });

        test("Отображается кнопка загрузки аватара", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByRole("button", { name: "Load" })).toBeVisible();
        });

        test("Отображается кнопка сохранения", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(
                page.getByRole("button", { name: "Save entered data" })
            ).toBeVisible();
        });

        test("Поле имени помечается невалидным при пустой отправке", async ({ page }) => {
            await page.goto(SETTINGS_URL);
            await page.waitForLoadState("networkidle");

            await page.getByLabel("Enter name").fill("");
            await page.getByRole("button", { name: "Save entered data" }).click();

            await expect(page.getByLabel("Enter name")).toHaveAttribute(
                "aria-invalid",
                "true"
            );
        });

        test("Имя короче 3 символов показывает уведомление об ошибке", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);
            await page.waitForLoadState("networkidle");

            await page.getByLabel("Enter name").fill("AB");
            await page.getByRole("button", { name: "Save entered data" }).click();

            await expect(page.getByText("Name is too short")).toBeVisible();
        });

        test("Имя длиннее 20 символов показывает уведомление об ошибке", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);
            await page.waitForLoadState("networkidle");

            await page.getByLabel("Enter name").fill("A".repeat(21));
            await page.getByRole("button", { name: "Save entered data" }).click();

            await expect(page.getByText("Name is too long")).toBeVisible();
        });

        test("Описание длиннее 200 символов показывает уведомление об ошибке", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Enter name").fill("Valid Name");
            await page.getByLabel("Description").fill("A".repeat(201));
            await page.getByRole("button", { name: "Save entered data" }).click();

            await expect(page.getByText("Description is too long")).toBeVisible();
        });

        test("Успешное сохранение показывает уведомление", async ({ page }) => {
            await page.goto(SETTINGS_URL);
            await page.waitForLoadState("networkidle");

            await page.getByLabel("Enter name").fill("New name");
            await page.getByRole("button", { name: "Save entered data" }).click();

            await expect(
                page.getByText("User information successfully updated.")
            ).toBeVisible();
        });

        test("Занятый id показывает уведомление об ошибке", async ({ page }) => {
            await page.route("**/api/user/*", route => {
                if (route.request().method() !== "PUT") return route.fallback();

                return route.fulfill({
                    status: 409,
                    contentType: "application/json",
                    body: JSON.stringify({ statusCode: 409, message: "error" })
                });
            });
            await page.goto(SETTINGS_URL);
            await page.waitForLoadState("networkidle");

            await page.getByLabel("Enter name").fill("New name");
            await page.getByLabel("Enter ID").fill("takenId");
            await page.getByRole("button", { name: "Save entered data" }).click();

            await expect(
                page.getByText("The entered username is already taken")
            ).toBeVisible();
        });
    });

    test.describe("EmailChangeForm - форма изменения email", () => {
        test.beforeEach(async ({ page }) => {
            await page.route("**/api/user/*/email", route =>
                route.fulfill({ status: 200, body: "ok" })
            );
        });

        test("Отображается заголовок формы", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByText("Change email")).toBeVisible();
        });

        test("Отображаются поля старого и нового email", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByLabel("Enter old email")).toBeVisible();
            await expect(page.getByLabel("Enter new email")).toBeVisible();
        });

        test("Невалидный email в поле старого адреса помечается ошибкой", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Enter old email").fill("notanemail");
            await page.getByRole("button", { name: "Continue" }).first().click();

            await expect(page.getByLabel("Enter old email")).toHaveAttribute(
                "aria-invalid",
                "true"
            );
        });

        test("Одинаковые адреса показывают уведомление об ошибке", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Enter old email").fill("same@example.com");
            await page.getByLabel("Enter new email").fill("same@example.com");
            await page.getByRole("button", { name: "Continue" }).first().click();

            await expect(page.getByText("Email addresses match")).toBeVisible();
        });

        test("Валидные адреса переключают форму на шаг ввода кода", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Enter old email").fill("old@example.com");
            await page.getByLabel("Enter new email").fill("new@example.com");
            await page.getByRole("button", { name: "Continue" }).first().click();

            await expect(
                page.getByRole("button", { name: "Return to email change form" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Change email" })
            ).toBeVisible();
        });

        test("На шаге кода отображается 6 ячеек ввода", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Enter old email").fill("old@example.com");
            await page.getByLabel("Enter new email").fill("new@example.com");
            await page.getByRole("button", { name: "Continue" }).first().click();

            const inputs = page.locator("input[inputmode='numeric']");
            await expect(inputs).toHaveCount(6);
        });

        test("Кнопка назад возвращает к форме ввода email", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Enter old email").fill("old@example.com");
            await page.getByLabel("Enter new email").fill("new@example.com");
            await page.getByRole("button", { name: "Continue" }).first().click();
            await page
                .getByRole("button", { name: "Return to email change form" })
                .click();

            await expect(page.getByLabel("Enter old email")).toBeVisible();
        });
    });

    test.describe("PasswordChangeForm - форма изменения пароля", () => {
        test.beforeEach(async ({ page }) => {
            await page.route("**/api/user/*/password", route =>
                route.fulfill({ status: 200, body: "ok" })
            );
        });

        test("Отображается заголовок формы", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByText("Change password")).toBeVisible();
        });

        test("Отображаются поля старого, нового и подтверждения пароля", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);

            await expect(page.getByLabel("Old password")).toBeVisible();
            await expect(page.getByLabel("New password")).toBeVisible();
            await expect(page.getByLabel("Confirm password")).toBeVisible();
        });

        test("Пустой старый пароль помечается невалидным при отправке", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);
            await page.waitForLoadState("networkidle");

            await page.getByRole("button", { name: "Continue" }).last().click();

            await expect(page.getByLabel("Old password")).toHaveAttribute(
                "aria-invalid",
                "true"
            );
        });

        test("Новый пароль, совпадающий со старым, показывает уведомление", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Old password").fill("same123");
            await page.getByLabel("New password").fill("same123");
            await page.getByLabel("Confirm password").fill("same123");
            await page.getByRole("button", { name: "Continue" }).last().click();

            await expect(page.getByText("Old and new passwords match")).toBeVisible();
        });

        test("Несовпадающее подтверждение пароля показывает уведомление", async ({
            page
        }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Old password").fill("oldpass1");
            await page.getByLabel("New password").fill("newpass1");
            await page.getByLabel("Confirm password").fill("different1");
            await page.getByRole("button", { name: "Continue" }).last().click();

            await expect(page.getByText("Passwords do not match")).toBeVisible();
        });

        test("Валидные данные переключают форму на шаг ввода кода", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Old password").fill("oldpass1");
            await page.getByLabel("New password").fill("newpass1");
            await page.getByLabel("Confirm password").fill("newpass1");
            await page.getByRole("button", { name: "Continue" }).last().click();

            await expect(
                page.getByRole("button", { name: "Return to password change form" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Change password" })
            ).toBeVisible();
        });

        test("Кнопка назад возвращает к форме ввода пароля", async ({ page }) => {
            await page.goto(SETTINGS_URL);

            await page.getByLabel("Old password").fill("oldpass1");
            await page.getByLabel("New password").fill("newpass1");
            await page.getByLabel("Confirm password").fill("newpass1");
            await page.getByRole("button", { name: "Continue" }).last().click();
            await page
                .getByRole("button", { name: "Return to password change form" })
                .click();

            await expect(page.getByLabel("Old password")).toBeVisible();
        });
    });
});
