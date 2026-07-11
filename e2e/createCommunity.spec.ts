import { expect, test } from "@playwright/test";

const CREATE_COMMUNITY_URL = "/en/communities/add";

test.describe("CreateCommunity - страница создания сообщества", () => {
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
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(page).toHaveTitle("Create Community | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Create your own creative community on VibeArt. Add a photo, name, description, and unique identifier to bring like-minded people together around a shared idea."
        );
    });

    test("Отображается кнопка назад", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(
            page.getByRole("button", { name: "Return to the previous page" })
        ).toBeVisible();
    });

    test("Отображается секция аватара с кнопками загрузки и удаления", async ({
        page
    }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(page.getByText("Community photo")).toBeVisible();
        await expect(page.getByRole("button", { name: "Load" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
    });

    test("Отображаются поля ввода названия, описания и id", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(page.getByLabel("Name")).toBeVisible();
        await expect(page.getByLabel("Description", { exact: false })).toBeVisible();
        await expect(page.getByLabel("Enter ID")).toBeVisible();
    });

    test("Поле id содержит префикс @", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(page.locator("main").getByText("@", { exact: true })).toBeVisible();
    });

    test("Отображается секция добавления администраторов", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(
            page.getByRole("heading", { name: "Add administrators" })
        ).toBeVisible();
    });

    test("В секции администраторов отображаются пользователи из мок-данных", async ({
        page
    }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(page.getByText("Alice Wonder")).toBeVisible();
        await expect(page.getByText("Bob Rivers")).toBeVisible();
    });

    test("Отображается кнопка создания сообщества", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await expect(
            page.getByRole("button", { name: "Save entered data" })
        ).toBeVisible();
    });

    test("Пустая отправка помечает поле названия невалидным", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await page.getByRole("button", { name: "Save entered data" }).click();

        await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
    });

    test("Название короче 3 символов показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await page.getByLabel("Name").fill("AB");
        await page.getByRole("button", { name: "Save entered data" }).click();

        await expect(page.getByText("Name is too short")).toBeVisible();
    });

    test("Название длиннее 15 символов показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await page.getByLabel("Name").fill("A".repeat(16));
        await page.getByRole("button", { name: "Save entered data" }).click();

        await expect(page.getByText("Name is too long")).toBeVisible();
    });

    test("Описание длиннее 200 символов показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await page.getByLabel("Name").fill("Valid Name");
        await page.getByLabel("Description", { exact: false }).fill("A".repeat(201));
        await page.getByRole("button", { name: "Save entered data" }).click();

        await expect(page.getByText("Description is too long")).toBeVisible();
    });

    test("ID короче 2 символов показывает уведомление об ошибке", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await page.getByLabel("Name").fill("Valid Name");
        await page.getByLabel("Enter ID").fill("A");
        await page.getByRole("button", { name: "Save entered data" }).click();

        await expect(page.getByText("ID is too short")).toBeVisible();
    });

    test("ID длиннее 10 символов показывает уведомление об ошибке", async ({ page }) => {
        await page.goto(CREATE_COMMUNITY_URL);

        await page.getByLabel("Name").fill("Valid Name");
        await page.getByLabel("Enter ID").fill("A".repeat(11));
        await page.getByRole("button", { name: "Save entered data" }).click();

        await expect(page.getByText("ID is too long")).toBeVisible();
    });
});
