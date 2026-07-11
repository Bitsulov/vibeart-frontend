import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { SettingsForm } from "./settingsForm";
import { screen } from "@testing-library/react";
import type { UserResponse } from "entities/user";

const defaultProps = {
    userInfo: { name: "Test User", avatarUrl: "" },
    UUID: "",
    currentUserInfo: {
        name: "Test User",
        avatarUrl: "",
        description: "",
        username: "",
        worksCount: 0,
        subscribesCount: 0,
        subscribersCount: 0,
        createdAt: "",
        trustStatus: "TRUST",
        onlineStatus: "ONLINE",
        enabled: true
    } satisfies UserResponse,
    setUserInfo: () => {}
};

describe("SettingsForm - форма настроек профиля", () => {
    it("Отображает заголовок формы", () => {
        renderWithProviders(<SettingsForm {...defaultProps} />);

        expect(screen.getByText("settings.title")).toBeInTheDocument();
    });

    it("Отображает секции аватара, имени, id и описания", () => {
        renderWithProviders(<SettingsForm {...defaultProps} />);

        expect(screen.getByText("settings.avatarTitle")).toBeInTheDocument();
        expect(screen.getByText("settings.nameTitle")).toBeInTheDocument();
        expect(screen.getByText("settings.idTitle")).toBeInTheDocument();
        expect(screen.getByText("settings.descriptionTitle")).toBeInTheDocument();
    });

    it("Отображает кнопку сохранения", () => {
        renderWithProviders(<SettingsForm {...defaultProps} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.saveUser" })
        ).toBeInTheDocument();
    });

    it("Отображает поле ввода имени", () => {
        renderWithProviders(<SettingsForm {...defaultProps} />);

        expect(screen.getByLabelText("settings.namePlaceholder")).toBeInTheDocument();
    });

    it("Отображает поле ввода id с префиксом @", () => {
        renderWithProviders(<SettingsForm {...defaultProps} />);

        expect(screen.getByText("@")).toBeInTheDocument();
        expect(screen.getByLabelText("settings.idPlaceholder")).toBeInTheDocument();
    });
});
