import { expect, test } from "@playwright/test";

const PROFILE_URL = "/profile/01ARZ3NDEKTSV4RRFFQ69G5FAV";

test.describe("Profile - страница профиля", () => {
    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "An error occurred" })).not.toBeVisible();
    });

    test("Заголовок и описание страницы", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page).toHaveTitle("Profile | VibeArt");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "User profile: user data, album navigation, and list of posts. Information panel with all author's publications."
        );
    });

    test("Отображается информация о пользователе", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByRole("img", { name: /User avatar/ })).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: "testUsergffdgfd" })).toBeVisible();
        await expect(page.getByText("@testUser")).toBeVisible();
    });

    test("Отображается слайдер альбомов с заголовком", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByRole("heading", { level: 2, name: "Albums" })).toBeVisible();
        await expect(page.getByRole("button", { name: "View all works" })).toBeVisible();
    });

    test("Альбомы из мока отображаются в слайдере", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByRole("button", { name: "Select album test album", exact: true })).toBeVisible();
        await expect(page.getByRole("button", { name: "Select album test album 2", exact: true })).toBeVisible();
    });

    test("Описание и дата регистрации отображаются", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByText("Description", {exact: true})).toBeVisible();
        await expect(page.getByText("Created at:", {exact: true})).toBeVisible();
    });
});
