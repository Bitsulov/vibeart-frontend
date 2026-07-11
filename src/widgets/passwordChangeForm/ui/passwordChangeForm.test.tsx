import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { PasswordChangeForm } from "./passwordChangeForm";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("PasswordChangeForm - форма изменения пароля", () => {
    describe("Рендер", () => {
        it("Отображает заголовок", () => {
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            expect(screen.getByText("passwordChange.title")).toBeInTheDocument();
        });

        it("Отображает поля старого, нового и подтверждения пароля", () => {
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            expect(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder")
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder")
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder")
            ).toBeInTheDocument();
        });

        it("Отображает кнопку продолжения", () => {
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            expect(
                screen.getByRole("button", { name: "ariaLabel.continue" })
            ).toBeInTheDocument();
        });
    });

    describe("Валидация", () => {
        it("Помечает поле старого пароля как невалидное при пустой отправке", async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder")
            ).toBeInvalid();
        });

        it("Помечает поле нового пароля как невалидное если он совпадает со старым", async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            await user.type(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder"),
                "same123"
            );
            await user.type(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder"),
                "same123"
            );
            await user.type(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder"),
                "same123"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder")
            ).toBeInvalid();
        });

        it("Помечает поле подтверждения как невалидное при несовпадении паролей", async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            await user.type(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder"),
                "oldpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder"),
                "newpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder"),
                "different1"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder")
            ).toBeInvalid();
        });
    });

    describe("Двухшаговый процесс", () => {
        it("Переходит к шагу ввода кода при успешной отправке формы", async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            await user.type(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder"),
                "oldpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder"),
                "newpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder"),
                "newpass1"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByRole("button", { name: "ariaLabel.backToChangePassword" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "ariaLabel.changePassword" })
            ).toBeInTheDocument();
        });

        it("Показывает email пользователя в тексте подтверждения", async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            await user.type(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder"),
                "oldpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder"),
                "newpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder"),
                "newpass1"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(screen.getByText("passwordChange.sentCodeText")).toBeInTheDocument();
        });

        it("Возвращается к форме пароля при клике на кнопку назад", async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <PasswordChangeForm email="user@example.com" UUID="UUID" />
            );

            await user.type(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder"),
                "oldpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.newPasswordPlaceholder"),
                "newpass1"
            );
            await user.type(
                screen.getByLabelText("passwordChange.confirmNewPasswordPlaceholder"),
                "newpass1"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));
            await user.click(
                screen.getByRole("button", { name: "ariaLabel.backToChangePassword" })
            );

            expect(
                screen.getByLabelText("passwordChange.oldPasswordPlaceholder")
            ).toBeInTheDocument();
        });
    });
});
