import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { RegisterForm } from "./registerForm";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

vi.mock("shared/lib/crypto", () => ({
    encryptToString: vi.fn(async (text: string) => `encrypted-${text}`)
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual =
        await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

const fillAndSubmitStep1 = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(
        screen.getByLabelText("register.emailPlaceholder"),
        "test@example.com"
    );
    await user.type(screen.getByLabelText("register.passwordPlaceholder"), "password123");
    await user.type(
        screen.getByLabelText("register.confirmPasswordPlaceholder"),
        "password123"
    );
    await user.click(screen.getByRole("checkbox", { name: "ariaLabel.agreeAgreement" }));
    await user.click(screen.getByRole("checkbox", { name: "ariaLabel.agreePolicy" }));
    await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));
};

describe("RegisterForm - форма регистрации", () => {
    describe("Рендер", () => {
        it("Отображает заголовок", () => {
            renderWithProviders(<RegisterForm />);

            expect(screen.getByText("register.registerAccount")).toBeInTheDocument();
        });

        it("Отображает поля email, пароль и подтверждение пароля", () => {
            renderWithProviders(<RegisterForm />);

            expect(
                screen.getByLabelText("register.emailPlaceholder")
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText("register.passwordPlaceholder")
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText("register.confirmPasswordPlaceholder")
            ).toBeInTheDocument();
        });

        it("Отображает чекбоксы соглашений", () => {
            renderWithProviders(<RegisterForm />);

            expect(
                screen.getByRole("checkbox", { name: "ariaLabel.agreeAgreement" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", { name: "ariaLabel.agreePolicy" })
            ).toBeInTheDocument();
        });

        it("Отображает кнопку регистрации и ссылку на вход", () => {
            renderWithProviders(<RegisterForm />);

            expect(
                screen.getByRole("button", { name: "ariaLabel.register" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("link", { name: "ariaLabel.goToAuth" })
            ).toBeInTheDocument();
        });
    });

    describe("Валидация", () => {
        it("Показывает ошибку пустого email при отправке пустой формы", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.requiredEmail")).toBeInTheDocument();
        });

        it("Показывает ошибку невалидного email", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await user.type(
                screen.getByLabelText("register.emailPlaceholder"),
                "test@example.toolongextension"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.invalidEmail")).toBeInTheDocument();
        });

        it("Показывает ошибку при несовпадении паролей", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await user.type(
                screen.getByLabelText("register.emailPlaceholder"),
                "test@example.com"
            );
            await user.type(
                screen.getByLabelText("register.passwordPlaceholder"),
                "password123"
            );
            await user.type(
                screen.getByLabelText("register.confirmPasswordPlaceholder"),
                "different123"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.dontMatch")).toBeInTheDocument();
        });

        it("Показывает ошибку, если чекбокс соглашения не отмечен", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await user.type(
                screen.getByLabelText("register.emailPlaceholder"),
                "test@example.com"
            );
            await user.type(
                screen.getByLabelText("register.passwordPlaceholder"),
                "password123"
            );
            await user.type(
                screen.getByLabelText("register.confirmPasswordPlaceholder"),
                "password123"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByText("errors.acceptAgreement")).toBeInTheDocument();
        });

        it("Email помечается как невалидный после отправки с ошибкой", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await user.click(screen.getByRole("button", { name: "ariaLabel.register" }));

            expect(screen.getByLabelText("register.emailPlaceholder")).toBeInvalid();
        });
    });

    describe("Шаг 2 - подтверждение кода", () => {
        it("После успешной регистрации показывается форма ввода кода", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await fillAndSubmitStep1(user);

            expect(await screen.findByText("register.codeFormTitle")).toBeInTheDocument();
            expect(screen.getAllByRole("textbox")).toHaveLength(6);
            expect(
                screen.getByRole("button", { name: "ariaLabel.confirmRegister" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "ariaLabel.sendCodeAgain" })
            ).toBeDisabled();
        });

        it("Кнопка 'назад' возвращает к форме регистрации", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await fillAndSubmitStep1(user);
            await screen.findByText("register.codeFormTitle");

            await user.click(
                screen.getByRole("button", { name: "ariaLabel.backToRegister" })
            );

            expect(screen.getByText("register.registerAccount")).toBeInTheDocument();
        });

        it("Показывает ошибку в ячейках при отправке неполного кода", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await fillAndSubmitStep1(user);
            await screen.findByText("register.codeFormTitle");

            const inputs = screen.getAllByRole("textbox");
            await user.type(inputs[0], "1");
            await user.click(
                screen.getByRole("button", { name: "ariaLabel.confirmRegister" })
            );

            expect(inputs[1].className).toContain("error");
        });

        it("При вводе валидного кода переходит на страницу профиля", async () => {
            const user = userEvent.setup({ delay: null });
            renderWithProviders(<RegisterForm />);

            await fillAndSubmitStep1(user);
            await screen.findByText("register.codeFormTitle");

            const inputs = screen.getAllByRole("textbox");
            for (let i = 0; i < inputs.length; i++) {
                await user.type(inputs[i], String((i + 1) % 10));
            }
            await user.click(
                screen.getByRole("button", { name: "ariaLabel.confirmRegister" })
            );

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith(
                    "/profile/00000000-0000-4000-8000-00000000000a"
                );
            });
        });
    });
});
