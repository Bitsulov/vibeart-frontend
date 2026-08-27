import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunityInfo } from "./communityInfo";
import { createCommunity } from "entities/community";
import type { PrincipalUserState } from "entities/user";

const owner: PrincipalUserState = {
    UUID: "00000000-0000-4000-8000-00000000000b",
    email: "owner@test.com",
    name: "Owner Name",
    username: "owner",
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

const otherUser: PrincipalUserState = {
    ...owner,
    UUID: "00000000-0000-4000-8000-00000000001c"
};

const communityInfo = createCommunity({
    UUID: "00000000-0000-4000-8000-00000000001d",
    owner: {
        UUID: owner.UUID,
        title: "",
        username: "",
        description: "",
        worksCount: 0,
        subscribersCount: 0,
        subscribesCount: 0,
        albumList: [],
        createdAt: "",
        trustStatus: "TRUST",
        isAuthenticated: false,
        isBlocked: false,
        onlineStatus: "OFFLINE",
        role: "USER",
        avatarUrl: ""
    },
    username: "test-community",
    title: "Test Community",
    description: "Описание тестового сообщества",
    posts: 42,
    subscribers: 100,
    subscribes: 5,
    createdAt: "2026-01-10T10:00:00.000Z",
    imageUrl: "",
    albumsList: [],
    admins: [],
    isSubscribed: false,
    isBlocked: false,
    trustStatus: "TRUST"
});

describe("CommunityInfo - блок информации о сообществе", () => {
    describe("Базовый рендер", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Отображает название сообщества", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(screen.getByText("Test Community")).toBeInTheDocument();
        });

        it("Отображает username сообщества", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(screen.getByText("@test-community")).toBeInTheDocument();
        });

        it("Отображает счётчики статистики", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(screen.getByText("42")).toBeInTheDocument();
            expect(screen.getByText("100")).toBeInTheDocument();
            expect(screen.getByText("5")).toBeInTheDocument();
        });

        it("Отображает аватар с корректным alt", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(
                screen.getByAltText("profile.avatarAlt Test Community")
            ).toBeInTheDocument();
        });
    });

    describe("Кнопки управления (isPrincipalUser)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Показывает ссылку на настройки для владельца", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: owner }
            });

            expect(
                screen.getByRole("link", { name: "ariaLabel.goToSettings" })
            ).toBeInTheDocument();
        });

        it("Не показывает ссылку на настройки для чужого пользователя", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(
                screen.queryByRole("link", { name: "ariaLabel.goToSettings" })
            ).not.toBeInTheDocument();
        });

        it("Ссылка настроек ведёт на страницу редактирования", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: owner }
            });

            const link = screen.getByRole("link", { name: "ariaLabel.goToSettings" });

            expect(link).toHaveAttribute(
                "href",
                `/communities/add?community=${communityInfo.UUID}`
            );
        });

        it("Показывает кнопку подписки для чужого пользователя", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(
                screen.getByRole("button", { name: "ariaLabel.subscribeCommunity" })
            ).toBeInTheDocument();
        });

        it("Не показывает кнопку подписки для владельца", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: owner }
            });

            expect(
                screen.queryByRole("button", { name: "ariaLabel.subscribeCommunity" })
            ).not.toBeInTheDocument();
        });
    });

    describe("Подсказки при наведении на статистику", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Наведение на счётчик публикаций показывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: otherUser }
                }
            );

            fireEvent.mouseEnter(screen.getByText("42").parentElement!);

            expect(store.getState().hint.text).toBe("hint.works");
        });

        it("Уход курсора с счётчика публикаций скрывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: otherUser }
                }
            );

            fireEvent.mouseLeave(screen.getByText("42").parentElement!);

            expect(store.getState().hint.text).toBe("");
        });

        it("Наведение на счётчик подписчиков показывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: otherUser }
                }
            );

            fireEvent.mouseEnter(screen.getByText("100").parentElement!);

            expect(store.getState().hint.text).toBe("hint.subscribers");
        });

        it("Наведение на счётчик подписок показывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: otherUser }
                }
            );

            fireEvent.mouseEnter(screen.getByText("5").parentElement!);

            expect(store.getState().hint.text).toBe("hint.subscribes");
        });
    });

    describe("Подсказки при наведении на кнопки управления (владелец)", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 1440
            });
        });

        it("Наведение на ссылку настроек показывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: owner }
                }
            );

            fireEvent.mouseEnter(
                screen.getByRole("link", { name: "ariaLabel.goToSettings" })
            );

            expect(store.getState().hint.text).toBe("hint.settings");
        });

        it("Уход курсора с ссылки настроек скрывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: owner }
                }
            );

            fireEvent.mouseLeave(
                screen.getByRole("link", { name: "ariaLabel.goToSettings" })
            );

            expect(store.getState().hint.text).toBe("");
        });

        it("Клик по ссылке настроек скрывает подсказку", () => {
            const { store } = renderWithProviders(
                <CommunityInfo communityInfo={communityInfo} />,
                {
                    preloadedState: { user: owner }
                }
            );

            fireEvent.click(screen.getByRole("link", { name: "ariaLabel.goToSettings" }));

            expect(store.getState().hint.text).toBe("");
        });

        it("Клик по кнопке удаления открывает окно подтверждения", async () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: owner }
            });

            const buttons = screen.getAllByRole("button");
            const deleteButton = buttons.find(b => b.getAttribute("aria-label") === "");

            await userEvent.click(deleteButton!);

            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });

    describe("Кнопка описания", () => {
        beforeEach(() => {
            Object.defineProperty(window, "innerWidth", {
                writable: true,
                configurable: true,
                value: 375
            });
        });

        it("Отображает кнопку открытия описания", () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            expect(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            ).toBeInTheDocument();
        });

        it("Клик по кнопке открывает модальное окно", async () => {
            renderWithProviders(<CommunityInfo communityInfo={communityInfo} />, {
                preloadedState: { user: otherUser }
            });

            await userEvent.click(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            );

            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });
});
