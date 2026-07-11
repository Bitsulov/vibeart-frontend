import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { ContactsForm } from "./contactsForm";
import { screen } from "@testing-library/react";
import type { PrincipalUserState } from "entities/user";

const defaultProps = {
    userInfo: { name: "Test User", avatarUrl: "" } as PrincipalUserState
};

describe("ContactsForm - форма связи с администрацией", () => {
    it("Отображает заголовок", () => {
        renderWithProviders(<ContactsForm {...defaultProps} />);

        expect(screen.getByText("contacts.title")).toBeInTheDocument();
    });

    it("Отображает описание", () => {
        renderWithProviders(<ContactsForm {...defaultProps} />);

        expect(screen.getByText(/contacts\.description/)).toBeInTheDocument();
    });

    it("Отображает текстовое поле ввода", () => {
        renderWithProviders(<ContactsForm {...defaultProps} />);

        expect(screen.getByLabelText("contacts.textPlaceholder")).toBeInTheDocument();
    });

    it("Отображает кнопку отправки", () => {
        renderWithProviders(<ContactsForm {...defaultProps} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.sendReport" })
        ).toBeInTheDocument();
    });

    it("Отображает счётчик символов", () => {
        renderWithProviders(<ContactsForm {...defaultProps} />);

        expect(screen.getByText("0/1000")).toBeInTheDocument();
    });
});
