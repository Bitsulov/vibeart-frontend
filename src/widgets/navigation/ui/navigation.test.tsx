import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { Navigation } from "./navigation";
import { screen } from "@testing-library/react";

const ULID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";

describe("Navigation - боковая навигация", () => {
    it("Рендерит nav-элемент", () => {
        renderWithProviders(<Navigation ULID={ULID} role="user" />);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("Отображает 5 ссылок для обычного пользователя (без adminlink)", () => {
        renderWithProviders(<Navigation ULID={ULID} role="user" />);

        expect(screen.getAllByRole("link")).toHaveLength(5);
    });

    it("Не отображает ссылку администратора для обычного пользователя", () => {
        renderWithProviders(<Navigation ULID={ULID} role="user" />);

        expect(screen.queryByRole("link", { name: "ariaLabel.goToBan" })).not.toBeInTheDocument();
    });

    it("Отображает 6 ссылок для администратора (включая admin-ссылку)", () => {
        renderWithProviders(<Navigation ULID={ULID} role="admin" />);

        expect(screen.getAllByRole("link")).toHaveLength(6);
        expect(screen.getByRole("link", { name: "ariaLabel.goToBan" })).toBeInTheDocument();
    });

    it("Активная ссылка имеет aria-current='page'", () => {
        renderWithProviders(
            <Navigation ULID={ULID} role="user" />,
            { route: "/gallery" }
        );

        const activeLink = screen.getByRole("link", { name: "ariaLabel.goToGallery" });
        expect(activeLink).toHaveAttribute("aria-current", "page");
    });

    it("Неактивные ссылки не имеют aria-current", () => {
        renderWithProviders(
            <Navigation ULID={ULID} role="user" />,
            { route: "/gallery" }
        );

        const profileLink = screen.getByRole("link", { name: "ariaLabel.goToProfile" });
        expect(profileLink).not.toHaveAttribute("aria-current");
    });

    it("Отображает счётчик непрочитанных чатов", () => {
        renderWithProviders(
            <Navigation ULID={ULID} role="user" />,
            { preloadedState: { app: { unreadChatsCount: 3, unreadNotificationsCount: 0, currentLanguage: "ru", serverStatus: "good" } } }
        );

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("Не отображает счётчик чатов, если нет непрочитанных", () => {
        renderWithProviders(
            <Navigation ULID={ULID} role="user" />,
            { preloadedState: { app: { unreadChatsCount: 0, unreadNotificationsCount: 0, currentLanguage: "ru", serverStatus: "good" } } }
        );

        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });
});
