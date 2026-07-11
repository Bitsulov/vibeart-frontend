import { expect, test } from "@playwright/test";

const CONTACTS_URL = "/en/contacts";

test.describe("Contacts - страница связи с администрацией", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/api/auth/user", route =>
            route.fulfill({ status: 401, body: "" })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(page).toHaveTitle("Contact Us | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Use this form to send requests, report bugs, or submit suggestions. You can also write to us directly via email."
        );
    });

    test("Отображается заголовок формы", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(
            page.getByRole("heading", { level: 1, name: "Contact us" })
        ).toBeVisible();
    });

    test("Отображается описание с email", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(
            page.getByRole("main").getByText(/vibeartfake@mail\.ru/)
        ).toBeVisible();
    });

    test("Отображается текстовое поле ввода", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(page.getByLabel("Enter your message")).toBeVisible();
    });

    test("Отображается кнопка отправки", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(
            page.getByRole("button", { name: "Send a report to the administration" })
        ).toBeVisible();
    });

    test("Отображается счётчик символов", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await expect(page.getByText("0/1000")).toBeVisible();
    });

    test("Счётчик обновляется при вводе текста", async ({ page }) => {
        await page.goto(CONTACTS_URL, { waitUntil: "networkidle" });

        await page.getByLabel("Enter your message").fill("Hello");

        await expect(page.getByText("5/1000")).toBeVisible();
    });

    test("Пустая отправка показывает уведомление об ошибке", async ({ page }) => {
        await page.goto(CONTACTS_URL);

        await page
            .getByRole("button", { name: "Send a report to the administration" })
            .click();

        await expect(page.getByText("Enter message text")).toBeVisible();
    });

    test("Сообщение длиннее 1000 символов показывает уведомление об ошибке", async ({
        page
    }) => {
        await page.goto(CONTACTS_URL);

        await page.getByLabel("Enter your message").fill("A".repeat(1001));
        await page
            .getByRole("button", { name: "Send a report to the administration" })
            .click();

        await expect(page.getByText("Message is too long")).toBeVisible();
    });

    test("Успешная отправка показывает уведомление и сбрасывает поле", async ({
        page
    }) => {
        await page.goto(CONTACTS_URL);

        await page.getByLabel("Enter your message").fill("Test message");
        await page
            .getByRole("button", { name: "Send a report to the administration" })
            .click();

        await expect(page.getByText("Message sent successfully")).toBeVisible();
        await expect(page.getByLabel("Enter your message")).toHaveValue("");
    });
});
