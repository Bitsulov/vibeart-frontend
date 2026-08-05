import { expect, test } from "@playwright/test";

const PROFILE_URL = "/en/profile/00000000-0000-4000-8000-00000000000b";

test.describe("Profile - страница профиля", () => {
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
                    name: "testUsergffdgfd",
                    username: "testUser",
                    description:
                        "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
                    avatarUrl: "",
                    worksCount: 0,
                    subscribersCount: 0,
                    subscribesCount: 0,
                    createdAt: "2026-01-01T00:00:00.000Z",
                    trustStatus: "UNTRUST",
                    onlineStatus: "ONLINE",
                    enabled: true
                })
            })
        );
        await page.route(/\/api\/album(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [
                        {
                            uuid: "00000000-0000-4000-8000-00000000000c",
                            title: "test album",
                            description: "",
                            worksCount: 0,
                            authorUser: null,
                            authorCommunity: null,
                            imageUrl: "",
                            createdAt: "2026-01-01T00:00:00.000Z"
                        },
                        {
                            uuid: "00000000-0000-4000-8000-00000000000d",
                            title: "test album 2",
                            description: "",
                            worksCount: 0,
                            authorUser: null,
                            authorCommunity: null,
                            imageUrl: "",
                            createdAt: "2026-01-01T00:00:00.000Z"
                        }
                    ],
                    number: 0,
                    size: 5,
                    totalElements: 2,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            })
        );
        await page.route(/\/api\/post\/author(\?[^/]*)?$/, route =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    content: [],
                    number: 0,
                    size: 6,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            })
        );
    });

    test("Контент страницы загружается", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 1, name: "An error occurred" })
        ).not.toBeVisible();
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
        await expect(
            page.getByRole("heading", { level: 1, name: "testUsergffdgfd" })
        ).toBeVisible();
        await expect(page.getByText("@testUser")).toBeVisible();
    });

    test("Отображается слайдер альбомов с заголовком", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(
            page.getByRole("heading", { level: 2, name: "Albums" })
        ).toBeVisible();
        await expect(page.getByRole("button", { name: "View all works" })).toBeVisible();
    });

    test("Альбомы из мока отображаются в слайдере", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(
            page.getByRole("button", { name: "Select album test album", exact: true })
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Select album test album 2", exact: true })
        ).toBeVisible();
    });

    test("Описание и дата регистрации отображаются", async ({ page }) => {
        await page.goto(PROFILE_URL);

        await expect(page.getByText("Description", { exact: true })).toBeVisible();
        await expect(page.getByText("Created at:", { exact: true })).toBeVisible();
    });
});
