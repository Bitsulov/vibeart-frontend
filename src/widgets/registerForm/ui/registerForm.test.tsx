import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { RegisterForm } from "./registerForm";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("RegisterForm - форма регистрации", () => {
    describe("Рендер", () => {
        it("Отображает заголовок", () => {
            renderWithProviders(<RegisterForm />);

            expect(screen.getByText("register.registerAccount")).toBeInTheDocument();
        });

        it("Отображает поля email, пароль и подтверждение пароля", () => {
            renderWithProviders(<RegisterForm />);

            expect(screen.getByLabelText("register.emailPlaceholder")).toBeInTheDocument();
            expect(screen.getByLabelText("register.passwordPlaceholder")).toBeInTheDocument();
            expect(screen.getByLabelText("register.confirmPasswordPlaceholder")).toBeInTheDocument();
        });

        it("Отображает чекбоксы соглашений", () => {
            renderWithProviders(<RegisterForm />);

            expect(screen.getByRole("checkbox", { name: "ariaLabel.agreeAgreement" })).toBeInTheDocument();
            expect(screen.getByRole("checkbox", { name: "ariaLabel.agreePolicy" })).toBeInTheDocument();
        });

        it("Отображает кнопку регистрации и ссылку на вход", () => {
            renderWithProviders(<RegisterForm />);

            expect(screen.getByRole("button", { name: "ariaLabel.register" })).toBeInTheDocument();
            expect(screen.getByRole("link", { name: "ariaLabel.goToAuth" })).toBeInTheDocument();
        });
    });

    describe("Валидация", () => {
        it("Показывает ошибку пустого email при отправке пустой формы", async () => {
            const user = userEvent.setup();
            renderWithProviders(<RegisterForm />);

            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.requiredEmail")).toBeInTheDocument();
        });

        it("Показывает ошибку невалидного email", async () => {
            const user = userEvent.setup();
            renderWithProviders(<RegisterForm />);

            await user.type(screen.getByLabelText("register.emailPlaceholder"), "test@example.toolongextension");
            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.invalidEmail")).toBeInTheDocument();
        });

        it("Показывает ошибку при несовпадении паролей", async () => {
            const user = userEvent.setup();
            renderWithProviders(<RegisterForm />);

            await user.type(screen.getByLabelText("register.emailPlaceholder"), "test@example.com");
            await user.type(screen.getByLabelText("register.passwordPlaceholder"), "password123");
            await user.type(screen.getByLabelText("register.confirmPasswordPlaceholder"), "different123");
            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.dontMatch")).toBeInTheDocument();
        });

        it("Показывает ошибку, если чекбокс соглашения не отмечен", async () => {
            const user = userEvent.setup();
            renderWithProviders(<RegisterForm />);

            await user.type(screen.getByLabelText("register.emailPlaceholder"), "test@example.com");
            await user.type(screen.getByLabelText("register.passwordPlaceholder"), "password123");
            await user.type(screen.getByLabelText("register.confirmPasswordPlaceholder"), "password123");
            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.acceptAgreement")).toBeInTheDocument();
        });

        it("Email помечается как невалидный после отправки с ошибкой", async () => {
            const user = userEvent.setup();
            renderWithProviders(<RegisterForm />);

            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByLabelText("register.emailPlaceholder")).toBeInvalid();
        });
    });
});
