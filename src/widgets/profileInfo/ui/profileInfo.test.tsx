import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { ProfileInfo } from "./profileInfo";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { PrincipalUserState, UserType } from "entities/user";

const userInfo: UserType = {
    UUID: "00000000-0000-4000-8000-00000000000b",
    name: "Иван Иванов",
    username: "@ivan",
    description: "Мое описание профиля",
    worksCount: 5,
    subscribersCount: 10,
    subscribesCount: 3,
    albumList: [],
    createdAt: "2024-01-15T10:00:00.000Z",
    trustStatus: "TRUST",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "OFFLINE",
    role: "USER",
    avatarUrl: ""
};

const principalUser: PrincipalUserState = {
    UUID: "00000000-0000-4000-8000-00000000001e",
    email: "test@email.com",
    name: "Другой",
    username: "",
    trustStatus: "TRUST",
    isAuthenticated: true,
    isBlocked: false,
    role: "USER",
    avatarUrl: "",
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0
};

describe("ProfileInfo - блок информации о профиле", () => {
    describe("Базовый рендер", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
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

            expect(
                screen.getByAltText("profile.avatarAlt Иван Иванов")
            ).toBeInTheDocument();
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
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 375
            });
            Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
                configurable: true,
                get: () => 300
            });
        });

        afterEach(() => {
            Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
                configurable: true,
                get: () => 0
            });
        });

        it("Показывает кнопку раскрытия описания", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            ).toBeInTheDocument();
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

            await userEvent.click(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            );

            expect(screen.getByText("Мое описание профиля")).not.toHaveClass("hide");
        });

        it("После раскрытия кнопка исчезает", async () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            await userEvent.click(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            );

            expect(
                screen.queryByRole("button", { name: "ariaLabel.openDescription" })
            ).not.toBeInTheDocument();
        });
    });

    describe("Адаптация — десктопная версия (>= 1200px)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Не показывает кнопку раскрытия описания", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            expect(
                screen.queryByRole("button", { name: "ariaLabel.openDescription" })
            ).not.toBeInTheDocument();
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
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Показывает ссылку на настройки для своего профиля", () => {
            renderWithProviders(
                <ProfileInfo userInfo={{ ...userInfo, UUID: "same-uuid" }} />,
                { preloadedState: { user: { ...principalUser, UUID: "same-uuid" } } }
            );

            expect(
                screen.getByRole("link", { name: "ariaLabel.goToSettings" })
            ).toBeInTheDocument();
        });

        it("Показывает ссылку на чат для чужого профиля", () => {
            renderWithProviders(
                <ProfileInfo userInfo={{ ...userInfo, UUID: "uuid-a" }} />,
                { preloadedState: { user: { ...principalUser, UUID: "uuid-b" } } }
            );

            expect(
                screen.queryByRole("link", { name: "ariaLabel.goToSettings" })
            ).not.toBeInTheDocument();
        });
    });

    describe("Статус онлайн", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Обёртка аватара имеет класс online при onlineStatus='ONLINE'", () => {
            renderWithProviders(
                <ProfileInfo userInfo={{ ...userInfo, onlineStatus: "ONLINE" }} />,
                { preloadedState: { user: principalUser } }
            );

            const avatar = screen.getByAltText("profile.avatarAlt Иван Иванов");
            expect(avatar.parentElement).toHaveClass("online");
        });

        it("Обёртка аватара не имеет класс online при onlineStatus='OFFLINE'", () => {
            renderWithProviders(<ProfileInfo userInfo={userInfo} />, {
                preloadedState: { user: principalUser }
            });

            const avatar = screen.getByAltText("profile.avatarAlt Иван Иванов");
            expect(avatar.parentElement).not.toHaveClass("ONLINE");
        });
    });
});
