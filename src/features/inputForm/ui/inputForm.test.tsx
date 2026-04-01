import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {screen} from "@testing-library/react";
import {InputForm} from "./inputForm";
import c from "./inputForm.module.scss";
import {userEvent} from "@testing-library/user-event";

describe("inputForm - поле для ввода текста в форме", () => {
    it("Нет ошибки, форма не отправлена", async () => {
        const onChange = vi.fn();

        renderWithProviders(
            <InputForm placeholder="p" onChange={onChange} type="text" isError={false} isSubmitted={false} id="id" />
        );

        const user = userEvent.setup();

        const input = screen.getByRole("textbox", { name: "p" });
        const placeholder = screen.getByText("p");
        const showPassword = screen.queryByRole("button", { name: "ariaLabel.showPassword" });
        const hidePassword = screen.queryByRole("button", { name: "ariaLabel.hidePassword" });
        const errorIcon = input.querySelector(c.error_icon);
        const correctIcon = input.querySelector(c.correct_icon);

        await user.type(input, "a");

        expect(placeholder).toBeInTheDocument();
        expect(input).toHaveValue("a");
        expect(input).not.toBeInvalid();
        expect(showPassword).not.toBeInTheDocument();
        expect(hidePassword).not.toBeInTheDocument();
        expect(errorIcon).not.toBeInTheDocument();
        expect(correctIcon).not.toBeInTheDocument();
    });
    it("Есть ошибка, форма не отправлена", async () => {
        const onChange = vi.fn();

        renderWithProviders(
            <InputForm placeholder="p" onChange={onChange} type="text" isError={true} isSubmitted={false} id="id" />
        );

        const user = userEvent.setup();

        const input = screen.getByRole("textbox", { name: "p" });
        const placeholder = screen.getByText("p");
        const showPassword = screen.queryByRole("button", { name: "ariaLabel.showPassword" });
        const hidePassword = screen.queryByRole("button", { name: "ariaLabel.hidePassword" });
        const errorIcon = input.querySelector(c.error_icon);
        const correctIcon = input.querySelector(c.correct_icon);

        await user.type(input, "a");

        expect(placeholder).toBeInTheDocument();
        expect(input).toHaveValue("a");
        expect(input).toBeInvalid();
        expect(showPassword).not.toBeInTheDocument();
        expect(hidePassword).not.toBeInTheDocument();
        expect(errorIcon).not.toBeInTheDocument();
        expect(correctIcon).not.toBeInTheDocument();
    });
    it("Тип password", async () => {
        const onChange = vi.fn();

        renderWithProviders(
            <InputForm placeholder="p" onChange={onChange} type="password" isError={false} isSubmitted={false} id="id" />
        );

        const user = userEvent.setup();

        const input = screen.getByLabelText("p");
        const placeholder = screen.getByText("p");
        const showPassword = screen.queryByRole("button", { name: "ariaLabel.showPassword" });
        const hidePassword = screen.queryByRole("button", { name: "ariaLabel.hidePassword" });
        const errorIcon = input.querySelector(c.error_icon);
        const correctIcon = input.querySelector(c.correct_icon);

        await user.type(input, "a");

        expect(placeholder).toBeInTheDocument();
        expect(input).toHaveValue("a");
        expect(input).not.toBeInvalid();
        expect(showPassword).toBeInTheDocument();
        expect(hidePassword).not.toBeInTheDocument();
        expect(errorIcon).not.toBeInTheDocument();
        expect(correctIcon).not.toBeInTheDocument();
    });
    it("Показать пароль", async () => {
        const onChange = vi.fn();

        renderWithProviders(
            <InputForm placeholder="p" onChange={onChange} type="password" isError={false} isSubmitted={false} id="id" />
        );

        const user = userEvent.setup();

        const input = screen.getByLabelText("p");
        const placeholder = screen.getByText("p");
        const showPassword = screen.queryByRole("button", { name: "ariaLabel.showPassword" });
        const errorIcon = input.querySelector(c.error_icon);
        const correctIcon = input.querySelector(c.correct_icon);
        let hidePassword: unknown = "";

        await user.type(input, "a");
        if(showPassword) {
            await user.click(showPassword);
            hidePassword = screen.queryByRole("button", { name: "ariaLabel.hidePassword" });
        }

        expect(placeholder).toBeInTheDocument();
        expect(input).toHaveValue("a");
        expect(input).not.toBeInvalid();
        expect(hidePassword).toBeInTheDocument();
        expect(errorIcon).not.toBeInTheDocument();
        expect(correctIcon).not.toBeInTheDocument();
    });
});
