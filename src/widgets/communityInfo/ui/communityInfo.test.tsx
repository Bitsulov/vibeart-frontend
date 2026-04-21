import {describe, it, expect, beforeEach} from "vitest";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunityInfo} from "./communityInfo";
import {createCommunity} from "entities/community";
import type {UserType} from "entities/user";

const owner: UserType = {
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    email: "owner@test.com",
    name: "Owner Name",
    username: "owner",
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "online",
    role: "user",
    avatarUrl: "",
};

const otherUser: UserType = {
    ...owner,
    id: 99,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FBB",
};

const communityInfo = createCommunity({
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FC1",
    owner,
    username: "test-community",
    title: "Test Community",
    description: "Описание тестового сообщества",
    posts: 42,
    subscribers: 100,
    subscribes: 5,
    createdAt: "2026-01-10T10:00:00.000Z",
    imageUrl: "",
    albumsList: [],
    isSubscribed: false,
    isBlocked: false,
    trustStatus: "trust",
});

describe("CommunityInfo - блок информации о сообществе", () => {
    describe("Базовый рендер", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 1440});
        });

        it("Отображает название сообщества", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            expect(screen.getByText("Test Community")).toBeInTheDocument();
        });

        it("Отображает username сообщества", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            expect(screen.getByText("@test-community")).toBeInTheDocument();
        });

        it("Отображает счётчики статистики", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            expect(screen.getByText("42")).toBeInTheDocument();
            expect(screen.getByText("100")).toBeInTheDocument();
            expect(screen.getByText("5")).toBeInTheDocument();
        });

        it("Отображает аватар с корректным alt", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            expect(screen.getByAltText("profile.avatarAlt Test Community")).toBeInTheDocument();
        });
    });

    describe("Кнопки управления (isPrincipalUser)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 1440});
        });

        it("Показывает ссылку на настройки для владельца", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: owner},
            });

            expect(screen.getByRole("link", {name: "ariaLabel.goToSettings"})).toBeInTheDocument();
        });

        it("Не показывает ссылку на настройки для чужого пользователя", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            expect(screen.queryByRole("link", {name: "ariaLabel.goToSettings"})).not.toBeInTheDocument();
        });

        it("Ссылка настроек ведёт на страницу редактирования", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: owner},
            });

            const link = screen.getByRole("link", {name: "ariaLabel.goToSettings"});

            expect(link).toHaveAttribute("href", `/communities/${communityInfo.ULID}/edit`);
        });
    });

    describe("Кнопка описания", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 375});
        });

        it("Отображает кнопку открытия описания", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            expect(screen.getByRole("button", {name: "ariaLabel.openDescription"})).toBeInTheDocument();
        });

        it("Клик по кнопке открывает модальное окно", async () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: {user: otherUser},
            });

            await userEvent.click(screen.getByRole("button", {name: "ariaLabel.openDescription"}));

            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });
});
