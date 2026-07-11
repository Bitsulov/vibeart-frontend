import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { EmailChangeForm } from "./emailChangeForm";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const emailChangeFormProps = {
    UUID: "UUID",
    email: "email"
};

describe("EmailChangeForm - форма изменения email", () => {
    describe("Рендер", () => {
        it("Отображает заголовок", () => {
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            expect(screen.getByText("emailChange.title")).toBeInTheDocument();
        });

        it("Отображает поля старого и нового email", () => {
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            expect(
                screen.getByLabelText("emailChange.oldEmailPlaceholder")
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText("emailChange.newEmailPlaceholder")
            ).toBeInTheDocument();
        });

        it("Отображает кнопку продолжения", () => {
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            expect(
                screen.getByRole("button", { name: "ariaLabel.continue" })
            ).toBeInTheDocument();
        });
    });

    describe("Валидация", () => {
        it("Показывает ошибку при отправке с невалидным email в поле старого адреса", async () => {
            const user = userEvent.setup();
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            await user.type(
                screen.getByLabelText("emailChange.oldEmailPlaceholder"),
                "notanemail"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByLabelText("emailChange.oldEmailPlaceholder")
            ).toBeInvalid();
        });

        it("Показывает ошибку при отправке с невалидным email в поле нового адреса", async () => {
            const user = userEvent.setup();
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            await user.type(
                screen.getByLabelText("emailChange.oldEmailPlaceholder"),
                "old@example.com"
            );
            await user.type(
                screen.getByLabelText("emailChange.newEmailPlaceholder"),
                "notanemail"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByLabelText("emailChange.newEmailPlaceholder")
            ).toBeInvalid();
        });
    });

    describe("Двухшаговый процесс", () => {
        it("Переходит к шагу ввода кода при успешной отправке формы", async () => {
            const user = userEvent.setup();
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            await user.type(
                screen.getByLabelText("emailChange.oldEmailPlaceholder"),
                "old@example.com"
            );
            await user.type(
                screen.getByLabelText("emailChange.newEmailPlaceholder"),
                "new@example.com"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(
                screen.getByRole("button", { name: "ariaLabel.backToChangeEmail" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "ariaLabel.changeEmail" })
            ).toBeInTheDocument();
        });

        it("Показывает 6 ячеек кода на шаге подтверждения", async () => {
            const user = userEvent.setup();
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            await user.type(
                screen.getByLabelText("emailChange.oldEmailPlaceholder"),
                "old@example.com"
            );
            await user.type(
                screen.getByLabelText("emailChange.newEmailPlaceholder"),
                "new@example.com"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));

            expect(screen.getAllByRole("textbox")).toHaveLength(6);
        });

        it("Возвращается к форме email при клике на кнопку назад", async () => {
            const user = userEvent.setup();
            renderWithProviders(<EmailChangeForm {...emailChangeFormProps} />);

            await user.type(
                screen.getByLabelText("emailChange.oldEmailPlaceholder"),
                "old@example.com"
            );
            await user.type(
                screen.getByLabelText("emailChange.newEmailPlaceholder"),
                "new@example.com"
            );
            await user.click(screen.getByRole("button", { name: "ariaLabel.continue" }));
            await user.click(
                screen.getByRole("button", { name: "ariaLabel.backToChangeEmail" })
            );

            expect(
                screen.getByLabelText("emailChange.oldEmailPlaceholder")
            ).toBeInTheDocument();
        });
    });
});
