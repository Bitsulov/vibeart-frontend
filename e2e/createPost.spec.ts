import {expect, test} from "@playwright/test";

const CREATE_POST_URL = "/post/add";

test.describe("CreatePost - страница создания поста", () => {
    test("Контент страницы загружается", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", {level: 1, name: "An error occurred"})).not.toBeVisible();
    });
    test("Заголовок и описание страницы", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page).toHaveTitle("Create Post | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Create and publish your artwork on VibeArt. Upload an image, add a title, description, and tags to share your creative work with the community."
        );
    });
    test("Отображается заголовок формы", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.locator("h1").filter({hasText: "Create post"})).toBeAttached();
    });
    test("Отображаются кнопки загрузки и удаления изображения", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("button", {name: "Upload image"})).toBeVisible();
        await expect(page.getByRole("button", {name: "Delete uploaded image"})).toBeVisible();
    });
    test("Отображаются поля ввода названия и описания", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByLabel("title", {exact: false})).toBeVisible();
        await expect(page.getByLabel("description", {exact: false})).toBeVisible();
    });
    test("Отображается секция тегов", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("heading", {level: 2, name: "Add tags"})).toBeVisible();
    });
    test("Отображается кнопка создания поста", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("button", {name: /create/i})).toBeVisible();
    });
    test("Отображается кнопка назад", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("button", {name: "Return to the previous page"})).toBeVisible();
    });
    test("Ввод названия обновляет превью поста", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await page.getByLabel("title", {exact: false}).fill("Мой пост");
        await expect(page.getByText("Мой пост")).toBeVisible();
    });
    test("Отправка без названия показывает ошибку на поле", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await page.getByRole("button", {name: /create/i}).click();

        await expect(page.getByLabel("title", {exact: false})).toHaveAttribute("aria-invalid", "true");
    });
    test("Отправка с названием но без изображения показывает уведомление", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await page.getByLabel("title", {exact: false}).fill("Название");
        await page.getByRole("button", {name: /create/i}).click();

        await expect(page.getByText("Please upload an image")).toBeVisible();
    });
    test("Слишком длинное название показывает уведомление об ошибке", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await page.getByLabel("title", {exact: false}).fill("A".repeat(16));
        await page.getByRole("button", {name: /create/i}).click();

        await expect(page.getByText("Title is too long")).toBeVisible();
    });
    test("Слишком длинное описание показывает уведомление об ошибке", async ({page}) => {
        await page.goto(CREATE_POST_URL);

        await page.getByLabel("title", {exact: false}).fill("Название");
        await page.getByLabel("description", {exact: false}).fill("A".repeat(201));
        await page.getByRole("button", {name: /create/i}).click();

        await expect(page.getByText("Description is too long")).toBeVisible();
    });
});