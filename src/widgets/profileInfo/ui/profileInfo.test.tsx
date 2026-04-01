import { describe, it, expect, beforeEach } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { ProfileInfo } from "./profileInfo";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { UserType } from "entities/user";

const userInfo: UserType = {
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    name: "Иван Иванов",
    email: "test@test.com",
    username: "@ivan",
    description: "Мое описание профиля",
    worksCount: 5,
    subscribersCount: 10,
    subscribesCount: 3,
    albumList: [],
    createdAt: "2024-01-15T10:00:00.000Z",
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "offline",
    role: "user",
    avatarUrl: ""
};

const principalUser: UserType = {
    id: 99,
    ULID: "02ARZ3NDEKTSV4RRFFQ69G5FAZ",
    email: "",
    name: "Другой",
    username: "",
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: new Date().toISOString(),
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "offline",
    role: "user",
    avatarUrl: ""
};

describe("ProfileInfo - блок информации о профиле", () => {
    describe("Базовый рендер", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
        });

        it("Отображает имя пользователя", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByText("Иван Иванов")).toBeInTheDocument();
        });

        it("Отображает username", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByText("@ivan")).toBeInTheDocument();
        });

        it("Отображает описание", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByText("Мое описание профиля")).toBeInTheDocument();
        });

        it("Отображает аватар с корректным alt", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByAltText("profile.avatarAlt Иван Иванов")).toBeInTheDocument();
        });

        it("Отображает счётчики статистики", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByText("5")).toBeInTheDocument();
            expect(screen.getByText("10")).toBeInTheDocument();
            expect(screen.getByText("3")).toBeInTheDocument();
        });
    });

    describe("Адаптация — мобильная версия (< 1200px)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
        });

        it("Показывает кнопку раскрытия описания", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByRole("button", { name: "ariaLabel.openDescription" })).toBeInTheDocument();
        });

        it("Описание скрыто по умолчанию (имеет класс hide)", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByText("Мое описание профиля")).toHaveClass("hide");
        });

        it("Клик по кнопке открывает описание", async () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            await userEvent.click(screen.getByRole("button", { name: "ariaLabel.openDescription" }));

            expect(screen.getByText("Мое описание профиля")).not.toHaveClass("hide");
        });

        it("После раскрытия кнопка исчезает", async () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            await userEvent.click(screen.getByRole("button", { name: "ariaLabel.openDescription" }));

            expect(screen.queryByRole("button", { name: "ariaLabel.openDescription" })).not.toBeInTheDocument();
        });
    });

    describe("Адаптация — десктопная версия (>= 1200px)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
        });

        it("Не показывает кнопку раскрытия описания", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.queryByRole("button", { name: "ariaLabel.openDescription" })).not.toBeInTheDocument();
        });

        it("Описание видно без класса hide", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(screen.getByText("Мое описание профиля")).not.toHaveClass("hide");
        });
    });

    describe("Ссылки профиля (isPrincipalUser)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
        });

        it("Показывает ссылку на настройки для своего профиля", () => {
            renderWithProviders(
                <ProfileInfo userInfo={{ ...userInfo, id: 1 }} />,
                { preloadedState: { user: { ...principalUser, id: 1 } } }
            );

            expect(screen.getByRole("link", { name: "ariaLabel.goToSettings" })).toBeInTheDocument();
        });

        it("Показывает ссылку на чат для чужого профиля", () => {
            renderWithProviders(
                <ProfileInfo userInfo={{ ...userInfo, id: 1 }} />,
                { preloadedState: { user: { ...principalUser, id: 99 } } }
            );

            expect(screen.queryByRole("link", { name: "ariaLabel.goToSettings" })).not.toBeInTheDocument();
        });
    });

    describe("Статус онлайн", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
        });

        it("Обёртка аватара имеет класс online при onlineStatus='online'", () => {
            renderWithProviders(
                <ProfileInfo userInfo={{ ...userInfo, onlineStatus: "online" }} />,
                { preloadedState: { user: principalUser } }
            );

            const avatar = screen.getByAltText("profile.avatarAlt Иван Иванов");
            expect(avatar.parentElement).toHaveClass("online");
        });

        it("Обёртка аватара не имеет класс online при onlineStatus='offline'", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            const avatar = screen.getByAltText("profile.avatarAlt Иван Иванов");
            expect(avatar.parentElement).not.toHaveClass("online");
        });
    });
});
