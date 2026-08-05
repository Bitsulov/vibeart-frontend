import { expect, test } from "@playwright/test";

const CREATE_ALBUM_URL = "/en/album/add";

test.describe("CreateAlbum - страница создания альбома", () => {
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
        await page.goto(CREATE_ALBUM_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });
    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await expect(page).toHaveTitle("Create Album | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Create and organize your artwork collection on VibeArt. Upload a cover image, add a title and description to share your creative album with the community."
        );
    });
    test("Отображается заголовок формы", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await expect(
            page.locator("h1").filter({ hasText: "Create album" })
        ).toBeAttached();
    });
    test("Отображаются кнопки загрузки и удаления изображения", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await expect(page.getByRole("button", { name: "Upload image" })).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Delete uploaded image" })
        ).toBeVisible();
    });
    test("Отображаются поля ввода названия и описания", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await expect(page.getByLabel("title", { exact: false })).toBeVisible();
        await expect(page.getByLabel("description", { exact: false })).toBeVisible();
    });
    test("Отображается кнопка создания альбома", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await expect(page.getByRole("button", { name: /create/i })).toBeVisible();
    });
    test("Отображается кнопка назад", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await expect(
            page.getByRole("button", { name: "Return to the previous page" })
        ).toBeVisible();
    });
    test("Ввод названия обновляет превью альбома", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Мой альбом");
        await expect(page.getByText("Мой альбом")).toBeVisible();
    });
    test("Отправка без названия показывает ошибку на поле", async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);

        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByLabel("title", { exact: false })).toHaveAttribute(
            "aria-invalid",
            "true"
        );
    });
    test("Слишком длинное название показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_ALBUM_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("A".repeat(16));
        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByText("Title is too long")).toBeVisible();
    });
    test("Слишком длинное описание показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_ALBUM_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Название");
        await page.getByLabel("description", { exact: false }).fill("A".repeat(201));
        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByText("Description is too long")).toBeVisible();
    });
});
