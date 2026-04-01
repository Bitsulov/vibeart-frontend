import {describe, expect, it} from "vitest";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {ProfileLink} from "./profileLink";

const initialProps = {
    name: "",
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
};

describe("ProfileLink - ссылка на настройки или чат пользователя", () => {
    describe("Текущий пользователь (isPrincipalUser: true)", () => {
        it("Отображает ссылку на настройки", () => {
            renderWithProviders(<ProfileLink {...initialProps} isPrincipalUser={true} />);

            const link = screen.getByRole("link", {name: "ariaLabel.goToSettings"});

            expect(link).toBeInTheDocument();
        });

        it("Ссылка ведёт на /settings", () => {
            renderWithProviders(<ProfileLink {...initialProps} isPrincipalUser={true} />);

            const link = screen.getByRole("link", {name: "ariaLabel.goToSettings"});

            expect(link).toHaveAttribute("href", "/settings");
        });

        it("Не отображает ссылку на чат", () => {
            renderWithProviders(<ProfileLink {...initialProps} isPrincipalUser={true} />);

            expect(screen.queryByRole("link", {name: "ariaLabel.writeUser"})).not.toBeInTheDocument();
        });
    });

    describe("Чужой пользователь (isPrincipalUser: false)", () => {
        it("Отображает ссылку на чат", () => {
            renderWithProviders(<ProfileLink {...initialProps} isPrincipalUser={false} />);

            const link = screen.getByRole("link", {name: "ariaLabel.writeUser"});

            expect(link).toBeInTheDocument();
        });

        it("Ссылка ведёт на /chats/:ULID", () => {
            renderWithProviders(<ProfileLink {...initialProps} isPrincipalUser={false} />);

            const link = screen.getByRole("link", {name: "ariaLabel.writeUser"});

            expect(link).toHaveAttribute("href", `/chats/${initialProps.ULID}`);
        });

        it("Не отображает ссылку на настройки", () => {
            renderWithProviders(<ProfileLink {...initialProps} isPrincipalUser={false} />);

            expect(screen.queryByRole("link", {name: "ariaLabel.goToSettings"})).not.toBeInTheDocument();
        });
    });
});