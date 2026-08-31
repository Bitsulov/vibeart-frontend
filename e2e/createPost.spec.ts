import { expect, test } from "@playwright/test";

const CREATE_POST_URL = "/en/post/add";

test.describe("CreatePost - страница создания поста", () => {
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
        await page.route(/\/api\/tag(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        { title: "beauty", createdAt: "" },
                        { title: "nature", createdAt: "" },
                        { title: "aaa", createdAt: "" },
                        { title: "beauty", createdAt: "" },
                        { title: "aaa", createdAt: "" }
                    ],
                    number: 0,
                    size: 10,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });
    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(page).toHaveTitle("Create Post | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Create and publish your artwork on VibeArt. Upload an image, add a title, description, and tags to share your creative work with the community."
        );
    });
    test("Отображается заголовок формы", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(
            page.locator("h1").filter({ hasText: "Create post" })
        ).toBeAttached();
    });
    test("Отображаются кнопки загрузки и удаления изображения", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("button", { name: "Upload image" })).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Delete uploaded image" })
        ).toBeVisible();
    });
    test("Отображаются поля ввода названия и описания", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByLabel("title", { exact: false })).toBeVisible();
        await expect(page.getByLabel("description", { exact: false })).toBeVisible();
    });
    test("Отображается секция тегов", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(
            page.getByRole("heading", { level: 2, name: "Add tags" })
        ).toBeVisible();
    });
    test("Отображается кнопка создания поста", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(page.getByRole("button", { name: /create/i })).toBeVisible();
    });
    test("Отображается кнопка назад", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await expect(
            page.getByRole("button", { name: "Return to the previous page" })
        ).toBeVisible();
    });
    test("Ввод названия обновляет превью поста", async ({ page }) => {
        await page.goto(CREATE_POST_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Мой пост");
        await expect(page.getByText("Мой пост")).toBeVisible({ timeout: 10000 });
    });
    test("Отправка без названия показывает ошибку на поле", async ({ page }) => {
        await page.goto(CREATE_POST_URL);

        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByLabel("title", { exact: false })).toHaveAttribute(
            "aria-invalid",
            "true"
        );
    });
    test("Отправка с названием но без изображения показывает уведомление", async ({
        page
    }) => {
        await page.goto(CREATE_POST_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Название");
        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByText("Please upload an image")).toBeVisible({
            timeout: 10000
        });
    });
    test("Слишком длинное название показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_POST_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("A".repeat(16));
        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByText("Title is too long")).toBeVisible({ timeout: 10000 });
    });
    test("Слишком длинное описание показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CREATE_POST_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Название");
        await page.getByLabel("description", { exact: false }).fill("A".repeat(201));
        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByText("Description is too long")).toBeVisible({
            timeout: 10000
        });
    });
});

test.describe("CreatePost - режим редактирования поста", () => {
    const EDIT_POST_URL = "/en/post/add?post=00000000-0000-4000-8000-000000000007";

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
        await page.route(/\/api\/tag(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        { title: "beauty", createdAt: "" },
                        { title: "nature", createdAt: "" },
                        { title: "aaa", createdAt: "" },
                        { title: "beauty", createdAt: "" },
                        { title: "aaa", createdAt: "" }
                    ],
                    number: 0,
                    size: 10,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
        await page.route("**/api/post/*", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-000000000007",
                    title: "Post title",
                    description: "Description Description",
                    likesCount: 10,
                    commentsCount: 5,
                    reportsCount: 0,
                    aiStatus: "good",
                    imageUrl:
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                    createdAt: "2026-01-01T00:00:00.000Z",
                    author: null,
                    community: null,
                    tags: ["beauty", "nature"],
                    liked: false,
                    reported: false
                })
            })
        );
    });

    test("Отображается заголовок редактирования публикации", async ({ page }) => {
        await page.goto(EDIT_POST_URL, { waitUntil: "networkidle" });

        await expect(page.locator("h1").filter({ hasText: "Edit post" })).toBeAttached();
    });

    test("Поля названия и описания предзаполняются данными публикации", async ({
        page
    }) => {
        await page.goto(EDIT_POST_URL, { waitUntil: "networkidle" });

        await expect(page.getByRole("textbox", { name: /title/i })).toHaveValue(
            "Post title"
        );
        await expect(page.getByRole("textbox", { name: /description/i })).toHaveValue(
            "Description Description"
        );
    });

    test("Изменение названия сохраняет публикацию и открывает её страницу", async ({
        page
    }) => {
        await page.goto(EDIT_POST_URL, { waitUntil: "networkidle" });

        await page.getByRole("textbox", { name: /title/i }).fill("New title");
        await page.getByRole("button", { name: /edit/i }).click();

        await expect(page.getByText("Post successfully updated.")).toBeVisible({
            timeout: 10000
        });
        await expect(page).toHaveURL(/\/post\/00000000-0000-4000-8000-000000000007/);
    });

    test("Отправка без изменений показывает уведомление об успехе", async ({ page }) => {
        await page.goto(EDIT_POST_URL, { waitUntil: "networkidle" });

        await page.getByRole("button", { name: /edit/i }).click();

        await expect(page.getByText("Post successfully updated.")).toBeVisible({
            timeout: 10000
        });
        await expect(page).toHaveURL(EDIT_POST_URL);
    });
});

test.describe("CreatePost - отправка формы создания", () => {
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
        await page.route(/\/api\/tag(\?.*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        { title: "beauty", createdAt: "" },
                        { title: "nature", createdAt: "" },
                        { title: "aaa", createdAt: "" },
                        { title: "beauty", createdAt: "" },
                        { title: "aaa", createdAt: "" }
                    ],
                    number: 0,
                    size: 10,
                    totalElements: 5,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
    });

    test("Создание публикации открывает её страницу", async ({ page }) => {
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    uuid: "00000000-0000-4000-8000-000000000007",
                    title: "Новый пост",
                    description: "",
                    likesCount: 0,
                    commentsCount: 0,
                    reportsCount: 0,
                    aiStatus: "good",
                    imageUrl: "",
                    createdAt: "2026-01-01T00:00:00.000Z",
                    author: null,
                    community: null,
                    tags: [],
                    liked: false,
                    reported: false
                })
            })
        );
        await page.goto(CREATE_POST_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Новый пост");
        await page
            .locator("input[type=file]")
            .first()
            .setInputFiles({
                name: "post.png",
                mimeType: "image/png",
                buffer: Buffer.from("post image")
            });
        await page.getByRole("button", { name: /create/i }).click();

        await expect(page.getByText("Post successfully created.")).toBeVisible({
            timeout: 10000
        });
        await expect(page).toHaveURL(/\/post\/00000000-0000-4000-8000-000000000007/);
    });

    test("Ошибка создания публикации показывает уведомление", async ({ page }) => {
        await page.route("**/api/post", route =>
            route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({ statusCode: 500, message: "error" })
            })
        );
        await page.goto(CREATE_POST_URL, { waitUntil: "networkidle" });

        await page.getByLabel("title", { exact: false }).fill("Новый пост");
        await page
            .locator("input[type=file]")
            .first()
            .setInputFiles({
                name: "post.png",
                mimeType: "image/png",
                buffer: Buffer.from("post image")
            });
        await page.getByRole("button", { name: /create/i }).click();

        await expect(
            page.getByText("A server error occurred. Please try again later")
        ).toBeVisible({ timeout: 10000 });
        await expect(page).toHaveURL(CREATE_POST_URL);
    });
});
